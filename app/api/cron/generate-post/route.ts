import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getAllPosts } from "@/lib/blog";
import { getNextTopic } from "@/lib/topic-queue";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // 5 min — Anthropic generation can take a while

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nichekit.vercel.app").trim();

export async function GET(req: NextRequest) {
  // Auth check
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json({ error: "Cron not configured" }, { status: 500 });
  }
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Required env vars
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const ghToken = process.env.GITHUB_TOKEN;
  const ghOwner = process.env.GITHUB_OWNER || "lawrencema000-gif";
  const ghRepo = process.env.GITHUB_REPO || "nichekit";

  if (!anthropicKey || !ghToken) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY or GITHUB_TOKEN not configured" },
      { status: 500 }
    );
  }

  // Find next topic to publish
  const publishedSlugs = getAllPosts().map((p) => p.slug);
  const topic = getNextTopic(publishedSlugs);

  if (!topic) {
    return NextResponse.json({
      success: false,
      message: "No topics remaining in queue. Add more to lib/topic-queue.ts.",
    });
  }

  // Generate post via Claude
  const today = new Date().toISOString().split("T")[0];
  const prompt = `Write a blog post for NicheKit (Australian e-commerce education platform) titled: "${topic.title}"

Target keyword: ${topic.keyword}
Context to cover: ${topic.context}

Requirements:
- 1500-2500 words
- Australian focus (AUD pricing, Australian regulations, local context)
- Conversational Australian tone — like explaining to a mate
- Include 2+ comparison tables (markdown format)
- Include a clear TL;DR or summary section
- 4-6 H2 sections (## Heading)
- At least one numbered list and one bullet list
- Real prices in AUD where relevant
- Soft CTA at the end linking to /signup or /pricing
- Use proper markdown: # H1, ## H2, ### H3, **bold**, *italic*, \`code\`, [text](url)
- NO generic AI phrases like "In today's digital landscape", "It's worth noting", "navigating the world of"
- NO em-dashes used as filler — use them sparingly and meaningfully
- Be direct, specific, helpful

Output the COMPLETE markdown file with this exact frontmatter at the top:

---
title: ${topic.title}
description: [WRITE A 150-160 char meta description with the target keyword]
date: ${today}
readTime: [X min based on word count, e.g., "6 min"]
tag: ${topic.tag}
keywords: [${topic.keyword}, related-keyword-1, related-keyword-2]
---

[Then the full markdown content starting with # ${topic.title}]

Output ONLY the markdown file content. No preamble, no explanation, no code fence wrapping.`;

  const anthropic = new Anthropic({ apiKey: anthropicKey });

  let markdown: string;
  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 8000,
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    markdown = textBlock && textBlock.type === "text" ? textBlock.text : "";

    if (!markdown || !markdown.includes("---")) {
      throw new Error("Generated content missing frontmatter");
    }
  } catch (err) {
    console.error("[Generate Post] Anthropic API error:", err);
    return NextResponse.json(
      { error: `Generation failed: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 500 }
    );
  }

  // Commit to GitHub via API
  const filePath = `content/blog/${topic.slug}.md`;
  const commitMessage = `Auto-publish: ${topic.title}`;
  const contentBase64 = Buffer.from(markdown, "utf-8").toString("base64");

  try {
    const ghRes = await fetch(
      `https://api.github.com/repos/${ghOwner}/${ghRepo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${ghToken}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          message: commitMessage,
          content: contentBase64,
          branch: "master",
        }),
      }
    );

    if (!ghRes.ok) {
      const errBody = await ghRes.text();
      throw new Error(`GitHub commit failed: ${ghRes.status} ${errBody}`);
    }
  } catch (err) {
    console.error("[Generate Post] GitHub commit error:", err);
    return NextResponse.json(
      { error: `Commit failed: ${err instanceof Error ? err.message : "unknown"}` },
      { status: 500 }
    );
  }

  // Trigger SEO ping (fire and forget — Vercel will rebuild from the commit)
  fetch(`${SITE_URL}/api/seo-ping`, {
    headers: { Authorization: `Bearer ${cronSecret}` },
  }).catch(() => {});

  console.log(`[Generate Post] Published: ${topic.slug}`);

  return NextResponse.json({
    success: true,
    published: topic.slug,
    title: topic.title,
    word_count: markdown.split(/\s+/).length,
    ran_at: new Date().toISOString(),
  });
}
