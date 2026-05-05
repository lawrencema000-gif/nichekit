import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createAdminClient } from "@/lib/supabase-admin";
import { getPost } from "@/lib/blog";
import { logActivity } from "@/lib/agent-log";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nichekit.vercel.app").trim();

interface PendingJob {
  id: string;
  blog_slug: string;
  platform: string;
}

// ─── Generate platform-specific copy with Claude ─────────────────────
async function generateCopy(platform: string, postTitle: string, postDescription: string, postUrl: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const platformInstructions: Record<string, string> = {
    twitter: `Write a Twitter/X post (under 250 chars to leave room for the URL). Australian conversational tone. Include 1-2 relevant hashtags. End with the URL on a new line.`,
    linkedin: `Write a LinkedIn post (200-400 words). Professional but human. Lead with a hook (a question or surprising stat). 2-3 short paragraphs. End with a call to read the full post.`,
    facebook: `Write a Facebook post (100-300 words). Conversational. Lead with a question or relatable observation. End with the URL.`,
    reddit: `Write a Reddit post title (under 100 chars) and body (200-400 words). Authentic, value-first, no overt selling. Mention the source URL naturally at the end.`,
  };

  const instruction = platformInstructions[platform] || platformInstructions.twitter;

  const anthropic = new Anthropic({ apiKey });
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: `${instruction}

Blog post title: ${postTitle}
Blog post description: ${postDescription}
URL: ${postUrl}

Output ONLY the post text. No preamble, no quotation marks, no "Here's your post:". Just the raw post text ready to publish.`,
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  return textBlock && textBlock.type === "text" ? textBlock.text.trim() : "";
}

// ─── Twitter/X via API v2 ────────────────────────────────────────────
async function postToTwitter(text: string): Promise<{ id: string }> {
  const bearer = process.env.TWITTER_BEARER_TOKEN;
  if (!bearer) throw new Error("TWITTER_BEARER_TOKEN not set");

  const res = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearer}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Twitter API ${res.status}: ${errBody}`);
  }

  const data = await res.json();
  return { id: data.data?.id || "unknown" };
}

// ─── LinkedIn via API ────────────────────────────────────────────────
async function postToLinkedIn(text: string): Promise<{ id: string }> {
  const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
  const personUrn = process.env.LINKEDIN_PERSON_URN;
  if (!accessToken || !personUrn) throw new Error("LINKEDIN_ACCESS_TOKEN or LINKEDIN_PERSON_URN not set");

  const res = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: personUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text },
          shareMediaCategory: "NONE",
        },
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`LinkedIn API ${res.status}: ${errBody}`);
  }

  const data = await res.json();
  return { id: data.id || "unknown" };
}

// ─── Main handler ────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return NextResponse.json({ error: "Cron not configured" }, { status: 500 });
  if (authHeader !== `Bearer ${cronSecret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();

  // Fetch up to 5 pending publish jobs (limit to avoid timeouts)
  const { data: pending, error } = await supabase
    .from("social_publishing")
    .select("id, blog_slug, platform")
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(5);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!pending || pending.length === 0) {
    return NextResponse.json({ message: "No pending jobs", processed: 0 });
  }

  const results: Array<{ platform: string; slug: string; status: string; details?: string }> = [];

  for (const job of pending as PendingJob[]) {
    const start = Date.now();
    const post = getPost(job.blog_slug);

    if (!post) {
      await supabase.from("social_publishing").update({
        status: "failed",
        error_message: "Blog post not found",
      }).eq("id", job.id);
      results.push({ platform: job.platform, slug: job.blog_slug, status: "skipped", details: "post not found" });
      continue;
    }

    try {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const text = await generateCopy(job.platform, post.title, post.description, url);

      let externalId = "";
      if (job.platform === "twitter") {
        const r = await postToTwitter(text);
        externalId = r.id;
      } else if (job.platform === "linkedin") {
        const r = await postToLinkedIn(text);
        externalId = r.id;
      } else {
        throw new Error(`Unsupported platform: ${job.platform}`);
      }

      await supabase.from("social_publishing").update({
        status: "posted",
        external_post_id: externalId,
        posted_at: new Date().toISOString(),
      }).eq("id", job.id);

      await logActivity({
        agent: "publish-social",
        action: `post-to-${job.platform}`,
        status: "success",
        details: { slug: post.slug, externalId, charCount: text.length },
        durationMs: Date.now() - start,
      });

      results.push({ platform: job.platform, slug: job.blog_slug, status: "posted" });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "unknown";

      await supabase.from("social_publishing").update({
        status: "failed",
        error_message: errMsg,
      }).eq("id", job.id);

      await logActivity({
        agent: "publish-social",
        action: `post-to-${job.platform}`,
        status: "failed",
        errorMessage: errMsg,
        details: { slug: post.slug },
        durationMs: Date.now() - start,
      });

      results.push({ platform: job.platform, slug: job.blog_slug, status: "failed", details: errMsg });
    }
  }

  return NextResponse.json({
    processed: pending.length,
    results,
    ran_at: new Date().toISOString(),
  });
}
