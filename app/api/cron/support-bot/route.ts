import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendEmail } from "@/lib/email";
import { logActivity } from "@/lib/agent-log";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nichekit.vercel.app").trim();

const SUPPORT_KNOWLEDGE = `You are NicheKit's support bot. NicheKit is an Australian e-commerce education platform.

Plans:
- Free: Module 1 + 3 sample templates
- Starter ($29 AUD/mo): All courses + 30+ templates + community
- Pro ($79 AUD/mo): Everything in Starter + monthly 30-min consultation
- Lifetime ($297 AUD one-time): All courses + templates forever, no consultation

Common questions:
- Refunds: 30-day money-back guarantee, contact support@nichekit.co
- Cancellations: From dashboard /dashboard/billing, takes effect end of period
- Login issues: Use /forgot-password for password reset
- Course access: All paid plans get all courses
- Australian focus: GST, ABN, AUD pricing covered in courses
- Templates: ZIP downloads, work in Excel/Google Sheets, no special software

Tone: Friendly, Australian, helpful. Use first names. Sign off as "The NicheKit team".

If the question is too specific (refund, billing problem, technical issue requiring login), say a human team member will follow up shortly. DO NOT make up answers about specific account details.

If you cannot answer confidently, ESCALATE.`;

interface PendingMessage {
  id: string;
  from_email: string;
  subject: string | null;
  body: string;
}

async function generateReply(message: PendingMessage): Promise<{ reply: string; escalate: boolean }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const anthropic = new Anthropic({ apiKey });
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system: SUPPORT_KNOWLEDGE,
    messages: [
      {
        role: "user",
        content: `Customer email:
From: ${message.from_email}
Subject: ${message.subject || "(no subject)"}
Body:
${message.body}

---

Write a reply email. If you can answer confidently from the support knowledge, write a complete helpful response. If the question requires a human (specific account info, billing investigation, refund processing, complex technical issue), respond with the literal word "ESCALATE" and nothing else.`,
      },
    ],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  const text = textBlock && textBlock.type === "text" ? textBlock.text.trim() : "";

  if (text === "ESCALATE" || text.startsWith("ESCALATE")) {
    return { reply: "", escalate: true };
  }

  return { reply: text, escalate: false };
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return NextResponse.json({ error: "Cron not configured" }, { status: 500 });
  if (authHeader !== `Bearer ${cronSecret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createAdminClient();

  const { data: pending } = await supabase
    .from("support_messages")
    .select("id, from_email, subject, body")
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(5);

  if (!pending || pending.length === 0) {
    return NextResponse.json({ message: "No pending messages", processed: 0 });
  }

  const results: Array<{ id: string; status: string; details?: string }> = [];

  for (const msg of pending as PendingMessage[]) {
    const start = Date.now();
    try {
      const { reply, escalate } = await generateReply(msg);

      if (escalate) {
        await supabase.from("support_messages").update({
          status: "escalated",
        }).eq("id", msg.id);

        // Notify admin
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail) {
          await sendEmail({
            to: adminEmail,
            subject: `Support escalation from ${msg.from_email}: ${msg.subject || "(no subject)"}`,
            html: `<h3>Support escalation — needs human reply</h3>
<p><strong>From:</strong> ${msg.from_email}</p>
<p><strong>Subject:</strong> ${msg.subject || "(none)"}</p>
<pre style="background:#f5f0eb;padding:16px;border-radius:8px;white-space:pre-wrap;">${msg.body}</pre>
<p><a href="${SITE_URL}/admin">View in admin dashboard</a></p>`,
          });
        }

        await logActivity({
          agent: "support-bot",
          action: "escalate",
          status: "success",
          details: { from: msg.from_email },
          durationMs: Date.now() - start,
        });

        results.push({ id: msg.id, status: "escalated" });
        continue;
      }

      // Send the AI reply
      await sendEmail({
        to: msg.from_email,
        subject: `Re: ${msg.subject || "Your question"}`,
        html: reply.replace(/\n/g, "<br>"),
      });

      await supabase.from("support_messages").update({
        status: "replied",
        ai_reply: reply,
        reply_sent_at: new Date().toISOString(),
      }).eq("id", msg.id);

      await logActivity({
        agent: "support-bot",
        action: "reply",
        status: "success",
        details: { from: msg.from_email, replyLength: reply.length },
        durationMs: Date.now() - start,
      });

      results.push({ id: msg.id, status: "replied" });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "unknown";

      await supabase.from("support_messages").update({
        status: "failed",
      }).eq("id", msg.id);

      await logActivity({
        agent: "support-bot",
        action: "reply",
        status: "failed",
        errorMessage: errMsg,
        durationMs: Date.now() - start,
      });

      results.push({ id: msg.id, status: "failed", details: errMsg });
    }
  }

  return NextResponse.json({
    processed: pending.length,
    results,
    ran_at: new Date().toISOString(),
  });
}
