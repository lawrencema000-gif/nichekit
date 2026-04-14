import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Verify cron secret — always required
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("[Cron] CRON_SECRET not configured");
    return NextResponse.json({ error: "Cron not configured" }, { status: 500 });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Reset consultation credits for all active Pro subscribers
  // Count pro users first
  const { count: proCount } = await supabase
    .from("user_profiles")
    .select("id", { count: "exact", head: true })
    .eq("plan", "pro")
    .eq("subscription_status", "active");

  // Reset credits
  const { error } = await supabase
    .from("user_profiles")
    .update({
      consultation_credits: 1,
      updated_at: new Date().toISOString(),
    })
    .eq("plan", "pro")
    .eq("subscription_status", "active");

  if (error) {
    console.error("[Cron] Failed to reset consultation credits:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const count = proCount || 0;
  console.log(`[Cron] Reset consultation credits for ${count} Pro subscribers`);

  return NextResponse.json({
    success: true,
    reset_count: count,
    ran_at: new Date().toISOString(),
  });
}
