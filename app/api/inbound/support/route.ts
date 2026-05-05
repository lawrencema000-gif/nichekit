import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { logActivity } from "@/lib/agent-log";

export const dynamic = "force-dynamic";

/**
 * Inbound email webhook for support@nichekit.co
 * Resend, Postmark, SendGrid, and CloudMailin all support this format
 * with minor variations. Configure your inbound parser to POST here.
 *
 * Expected JSON body (Resend Inbound format):
 * { from: "user@example.com", subject: "...", text: "..." }
 *
 * Or generic mail webhook fields. We try several common shapes.
 */
export async function POST(req: NextRequest) {
  // Optional shared secret (most inbound providers can send a header)
  const sharedSecret = process.env.INBOUND_EMAIL_SECRET;
  if (sharedSecret) {
    const incoming = req.headers.get("x-inbound-secret");
    if (incoming !== sharedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Normalise across providers
  const from =
    (body.from as string) ||
    (body.From as string) ||
    ((body.envelope as Record<string, unknown>)?.from as string) ||
    "";
  const subject = (body.subject as string) || (body.Subject as string) || "";
  const text =
    (body.text as string) ||
    (body.body as string) ||
    (body["text-plain"] as string) ||
    (body.html as string) ||
    "";

  if (!from || !text) {
    return NextResponse.json({ error: "Missing from or body" }, { status: 400 });
  }

  // Basic length limit to avoid abuse
  const safeBody = text.slice(0, 5000);
  const safeSubject = subject.slice(0, 200);
  const cleanFrom = (from.match(/<([^>]+)>/) ? from.match(/<([^>]+)>/)![1] : from).toLowerCase().trim();

  const supabase = createAdminClient();
  const { error } = await supabase.from("support_messages").insert({
    from_email: cleanFrom,
    subject: safeSubject,
    body: safeBody,
    status: "pending",
  });

  if (error) {
    await logActivity({
      agent: "support-inbound",
      action: "receive",
      status: "failed",
      errorMessage: error.message,
    });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logActivity({
    agent: "support-inbound",
    action: "receive",
    status: "success",
    details: { from: cleanFrom, subjectLength: safeSubject.length, bodyLength: safeBody.length },
  });

  // Trigger support-bot cron (fire and forget)
  const cronSecret = process.env.CRON_SECRET;
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://nichekit.vercel.app").trim();
  if (cronSecret) {
    fetch(`${siteUrl}/api/cron/support-bot`, {
      headers: { Authorization: `Bearer ${cronSecret}` },
    }).catch(() => {});
  }

  return NextResponse.json({ success: true });
}
