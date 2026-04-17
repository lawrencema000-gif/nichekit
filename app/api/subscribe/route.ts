import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: NextRequest) {
  // Rate limit: 5 requests per minute per IP
  const rl = rateLimit(req, { limit: 5, windowMs: 60_000 });
  if (!rl.success) return rateLimitResponse();

  try {
    const contentLength = parseInt(req.headers.get("content-length") || "0");
    if (contentLength > 1024) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }

    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Store subscriber in database
    await supabase.from("subscribers").upsert(
      { email, source: "website", subscribed: true },
      { onConflict: "email" }
    );

    console.log(`[Subscribe] New subscriber: ${email}`);

    // Also add to Resend audience if configured
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const apiKey = process.env.RESEND_API_KEY;

    if (audienceId && apiKey) {
      await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      }).catch(() => {}); // Non-critical, don't fail the request
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
