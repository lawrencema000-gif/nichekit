import { createAdminClient } from "@/lib/supabase-admin";

export interface ActivityLog {
  agent: string;
  action: string;
  status: "success" | "failed" | "skipped" | "retrying";
  details?: Record<string, unknown>;
  errorMessage?: string;
  retryCount?: number;
  durationMs?: number;
}

export async function logActivity(log: ActivityLog): Promise<void> {
  try {
    const supabase = createAdminClient();
    await supabase.from("agent_activity").insert({
      agent: log.agent,
      action: log.action,
      status: log.status,
      details: log.details || null,
      error_message: log.errorMessage || null,
      retry_count: log.retryCount || 0,
      duration_ms: log.durationMs || null,
    });
  } catch (err) {
    // Never throw from logger — failsafe
    console.error("[Activity Log] Failed to write:", err);
  }
}

export async function getRecentFailures(agent: string, withinMinutes = 60): Promise<number> {
  try {
    const supabase = createAdminClient();
    const since = new Date(Date.now() - withinMinutes * 60_000).toISOString();
    const { count } = await supabase
      .from("agent_activity")
      .select("id", { count: "exact", head: true })
      .eq("agent", agent)
      .eq("status", "failed")
      .gte("created_at", since);
    return count || 0;
  } catch {
    return 0;
  }
}
