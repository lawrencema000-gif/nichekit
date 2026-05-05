import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { logActivity, getRecentFailures } from "@/lib/agent-log";
import { sendEmail } from "@/lib/email";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nichekit.vercel.app").trim();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) return NextResponse.json({ error: "Cron not configured" }, { status: 500 });
  if (authHeader !== `Bearer ${cronSecret}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const start = Date.now();
  const checks: Record<string, { status: string; details?: string }> = {};

  // ─── HEARTBEAT 1: Site uptime ─────────────────────────
  try {
    const res = await fetch(SITE_URL, { method: "HEAD" });
    checks.site = { status: res.ok ? "ok" : "degraded", details: `HTTP ${res.status}` };
  } catch (err) {
    checks.site = { status: "down", details: err instanceof Error ? err.message : "unreachable" };
  }

  // ─── HEARTBEAT 2: Database ────────────────────────────
  const supabase = createAdminClient();
  try {
    const { error } = await supabase.from("user_profiles").select("id", { count: "exact", head: true });
    checks.db = error ? { status: "down", details: error.message } : { status: "ok" };
  } catch (err) {
    checks.db = { status: "down", details: err instanceof Error ? err.message : "unknown" };
  }

  // ─── HEARTBEAT 3: Recent failure spike detection ──────
  const recentFailures = await Promise.all([
    getRecentFailures("generate-post", 240),
    getRecentFailures("publish-social", 120),
    getRecentFailures("support-bot", 120),
  ]);
  const totalFailures = recentFailures.reduce((a, b) => a + b, 0);
  checks.failureRate = {
    status: totalFailures > 5 ? "alert" : "ok",
    details: `${totalFailures} failures in last 4h`,
  };

  // ─── ORCHESTRATOR: Trigger pending social posts ───────
  try {
    const { data: pending } = await supabase
      .from("social_publishing")
      .select("id")
      .eq("status", "pending")
      .limit(1);

    if (pending && pending.length > 0) {
      // Fire publish-social cron (don't await — let it run in background)
      fetch(`${SITE_URL}/api/cron/publish-social`, {
        headers: { Authorization: `Bearer ${cronSecret}` },
      }).catch(() => {});
      checks.publisher = { status: "triggered", details: `${pending.length} pending posts` };
    } else {
      checks.publisher = { status: "idle" };
    }
  } catch (err) {
    checks.publisher = { status: "error", details: err instanceof Error ? err.message : "unknown" };
  }

  // ─── ORCHESTRATOR: Process pending support messages ───
  try {
    const { data: pendingSupport } = await supabase
      .from("support_messages")
      .select("id")
      .eq("status", "pending")
      .limit(1);

    if (pendingSupport && pendingSupport.length > 0) {
      fetch(`${SITE_URL}/api/cron/support-bot`, {
        headers: { Authorization: `Bearer ${cronSecret}` },
      }).catch(() => {});
      checks.supportBot = { status: "triggered", details: `${pendingSupport.length} pending` };
    } else {
      checks.supportBot = { status: "idle" };
    }
  } catch (err) {
    checks.supportBot = { status: "error", details: err instanceof Error ? err.message : "unknown" };
  }

  // ─── ALERT: Email admin if anything is broken ─────────
  const isAlert =
    checks.site.status === "down" ||
    checks.db.status === "down" ||
    checks.failureRate.status === "alert";

  if (isAlert && ADMIN_EMAIL) {
    try {
      await sendEmail({
        to: ADMIN_EMAIL,
        subject: "🚨 NicheKit health check failed",
        html: `<h2>Heartbeat Alert</h2>
<pre style="background:#f5f0eb;padding:16px;border-radius:8px;">${JSON.stringify(checks, null, 2)}</pre>
<p>Check the admin dashboard: <a href="${SITE_URL}/admin">${SITE_URL}/admin</a></p>`,
      });
    } catch {
      // Failsafe — don't crash supervisor if email fails
    }
  }

  const durationMs = Date.now() - start;
  await logActivity({
    agent: "supervisor",
    action: "heartbeat",
    status: isAlert ? "failed" : "success",
    details: checks,
    durationMs,
  });

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    duration_ms: durationMs,
    alert: isAlert,
    checks,
  });
}
