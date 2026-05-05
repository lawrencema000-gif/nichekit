import { createAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin — NicheKit" };

export default async function AdminPage() {
  // Auth check: only admin email can access
  const authClient = await createClient();
  const { data: { user } } = await authClient.auth.getUser();

  if (!user) redirect("/login");

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail || user.email !== adminEmail) {
    redirect("/dashboard");
  }

  const supabase = createAdminClient();

  // Fetch all users
  const { data: users, error: usersError } = await supabase
    .from("user_profiles")
    .select("id, email, full_name, plan, subscription_status, onboarded, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  // Fetch all orders
  const { data: orders } = await supabase
    .from("orders")
    .select("id, customer_email, product_name, amount_cents, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  // Fetch subscribers
  const { data: subscribers } = await supabase
    .from("subscribers")
    .select("id, email, source, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  // Fetch course progress stats
  const { data: progressData } = await supabase
    .from("course_progress")
    .select("user_id, course_slug, completed");

  // Fetch agent activity (last 50)
  const { data: activity } = await supabase
    .from("agent_activity")
    .select("agent, action, status, error_message, duration_ms, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  // Fetch latest supervisor heartbeat
  const { data: lastHeartbeat } = await supabase
    .from("agent_activity")
    .select("status, details, created_at")
    .eq("agent", "supervisor")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // Fetch pending support messages
  const { data: pendingSupport } = await supabase
    .from("support_messages")
    .select("from_email, subject, status, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  // Fetch social publishing status
  const { data: socialJobs } = await supabase
    .from("social_publishing")
    .select("blog_slug, platform, status, error_message, posted_at, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  // Calculate stats
  const totalUsers = users?.length || 0;
  const paidUsers = users?.filter(u => u.plan !== "free").length || 0;
  const freeUsers = totalUsers - paidUsers;
  const totalOrders = orders?.length || 0;
  const totalRevenue = (orders || []).filter(o => o.status === "completed").reduce((sum, o) => sum + (o.amount_cents || 0), 0);
  const totalSubscribers = subscribers?.length || 0;
  const totalCompletions = (progressData || []).filter(p => p.completed).length;

  // Plan breakdown
  const planCounts: Record<string, number> = {};
  for (const u of users || []) {
    planCounts[u.plan] = (planCounts[u.plan] || 0) + 1;
  }

  if (usersError) {
    return (
      <div className="min-h-screen p-8" style={{ background: "var(--cream)" }}>
        <p style={{ color: "var(--terracotta)" }}>Error loading admin data. Check SUPABASE_SERVICE_ROLE_KEY is set.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      <header className="px-6 py-4" style={{ borderBottom: "1px solid var(--border)", background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-lg" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              NicheKit
            </Link>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "var(--terracotta)", color: "white" }}>
              Admin
            </span>
          </div>
          <Link href="/dashboard" className="text-xs" style={{ color: "var(--ink-muted)" }}>Back to dashboard</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl mb-6" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
          Admin Overview
        </h1>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Users", value: totalUsers, sub: `${paidUsers} paid / ${freeUsers} free` },
            { label: "Email Subscribers", value: totalSubscribers, sub: "from lead capture" },
            { label: "Orders", value: totalOrders, sub: `$${(totalRevenue / 100).toFixed(2)} total` },
            { label: "Module Completions", value: totalCompletions, sub: "across all users" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 rounded-xl" style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}>
              <span className="text-2xl font-medium block" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                {stat.value}
              </span>
              <span className="text-sm block" style={{ color: "var(--ink-light)" }}>{stat.label}</span>
              <span className="text-xs block mt-1" style={{ color: "var(--ink-muted)" }}>{stat.sub}</span>
            </div>
          ))}
        </div>

        {/* Heartbeat status */}
        <div className="mb-10">
          <h2 className="text-sm font-medium mb-3" style={{ color: "var(--ink-muted)" }}>Autonomous System Status</h2>
          <div className="rounded-xl p-5" style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}>
            {lastHeartbeat ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: lastHeartbeat.status === "success" ? "var(--sage)" : "var(--terracotta)" }}
                  />
                  <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
                    {lastHeartbeat.status === "success" ? "All systems operational" : "Issues detected"}
                  </span>
                  <span className="text-xs ml-auto" style={{ color: "var(--ink-muted)" }}>
                    Last check: {new Date(lastHeartbeat.created_at).toLocaleString("en-AU")}
                  </span>
                </div>
                {lastHeartbeat.details && typeof lastHeartbeat.details === "object" && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                    {Object.entries(lastHeartbeat.details as Record<string, { status: string; details?: string }>).map(([key, val]) => (
                      <div key={key} className="p-2 rounded" style={{ background: "var(--cream)" }}>
                        <span className="block font-medium" style={{ color: "var(--ink-muted)" }}>{key}</span>
                        <span
                          className="block"
                          style={{
                            color:
                              val.status === "ok" || val.status === "idle" || val.status === "triggered"
                                ? "var(--sage)"
                                : "var(--terracotta)",
                          }}
                        >
                          {val.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <span className="text-sm" style={{ color: "var(--ink-muted)" }}>
                No heartbeat data yet. Supervisor cron will populate this once it runs.
              </span>
            )}
          </div>
        </div>

        {/* Recent agent activity */}
        <div className="mb-10">
          <h2 className="text-sm font-medium mb-3" style={{ color: "var(--ink-muted)" }}>Recent Agent Activity</h2>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--cream)" }}>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>Agent</th>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>Action</th>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>Status</th>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>Duration</th>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>When</th>
                  </tr>
                </thead>
                <tbody>
                  {(activity || []).length === 0 ? (
                    <tr style={{ background: "var(--warm-white)" }}>
                      <td colSpan={5} className="px-4 py-6 text-center text-xs" style={{ color: "var(--ink-muted)" }}>
                        No agent activity yet. Crons will populate this as they run.
                      </td>
                    </tr>
                  ) : (
                    (activity || []).map((a, i) => (
                      <tr key={i} style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
                        <td className="px-4 py-2 text-xs font-medium" style={{ color: "var(--ink)" }}>{a.agent}</td>
                        <td className="px-4 py-2 text-xs" style={{ color: "var(--ink-light)" }}>{a.action}</td>
                        <td className="px-4 py-2">
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{
                              background: a.status === "success" ? "var(--sage-light)" : a.status === "failed" ? "#fde8e8" : "var(--sand)",
                              color: a.status === "success" ? "var(--sage)" : a.status === "failed" ? "var(--terracotta)" : "var(--ink-muted)",
                            }}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-xs" style={{ color: "var(--ink-muted)" }}>
                          {a.duration_ms ? `${a.duration_ms}ms` : "—"}
                        </td>
                        <td className="px-4 py-2 text-xs" style={{ color: "var(--ink-muted)" }}>
                          {new Date(a.created_at).toLocaleString("en-AU", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Social publishing status */}
        <div className="mb-10">
          <h2 className="text-sm font-medium mb-3" style={{ color: "var(--ink-muted)" }}>Social Publishing Queue</h2>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--cream)" }}>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>Post</th>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>Platform</th>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>Status</th>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>Posted/Created</th>
                  </tr>
                </thead>
                <tbody>
                  {(socialJobs || []).length === 0 ? (
                    <tr style={{ background: "var(--warm-white)" }}>
                      <td colSpan={4} className="px-4 py-6 text-center text-xs" style={{ color: "var(--ink-muted)" }}>
                        No social posts queued yet.
                      </td>
                    </tr>
                  ) : (
                    (socialJobs || []).map((s, i) => (
                      <tr key={i} style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
                        <td className="px-4 py-2 text-xs" style={{ color: "var(--ink)" }}>{s.blog_slug}</td>
                        <td className="px-4 py-2 text-xs" style={{ color: "var(--ink-light)" }}>{s.platform}</td>
                        <td className="px-4 py-2">
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{
                              background: s.status === "posted" ? "var(--sage-light)" : s.status === "failed" ? "#fde8e8" : "var(--sand)",
                              color: s.status === "posted" ? "var(--sage)" : s.status === "failed" ? "var(--terracotta)" : "var(--ink-muted)",
                            }}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-xs" style={{ color: "var(--ink-muted)" }}>
                          {new Date(s.posted_at || s.created_at).toLocaleString("en-AU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Support messages */}
        <div className="mb-10">
          <h2 className="text-sm font-medium mb-3" style={{ color: "var(--ink-muted)" }}>Support Messages</h2>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--cream)" }}>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>From</th>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>Subject</th>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>Status</th>
                    <th className="text-left px-4 py-2 font-medium text-xs" style={{ color: "var(--ink-muted)" }}>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {(pendingSupport || []).length === 0 ? (
                    <tr style={{ background: "var(--warm-white)" }}>
                      <td colSpan={4} className="px-4 py-6 text-center text-xs" style={{ color: "var(--ink-muted)" }}>
                        No support messages yet. Configure inbound email to populate.
                      </td>
                    </tr>
                  ) : (
                    (pendingSupport || []).map((m, i) => (
                      <tr key={i} style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
                        <td className="px-4 py-2 text-xs" style={{ color: "var(--ink)" }}>{m.from_email}</td>
                        <td className="px-4 py-2 text-xs" style={{ color: "var(--ink-light)" }}>{m.subject || "(none)"}</td>
                        <td className="px-4 py-2">
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{
                              background:
                                m.status === "replied"
                                  ? "var(--sage-light)"
                                  : m.status === "escalated"
                                  ? "#fde8e8"
                                  : "var(--sand)",
                              color:
                                m.status === "replied"
                                  ? "var(--sage)"
                                  : m.status === "escalated"
                                  ? "var(--terracotta)"
                                  : "var(--ink-muted)",
                            }}
                          >
                            {m.status}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-xs" style={{ color: "var(--ink-muted)" }}>
                          {new Date(m.created_at).toLocaleString("en-AU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Plan breakdown */}
        <div className="mb-10">
          <h2 className="text-sm font-medium mb-3" style={{ color: "var(--ink-muted)" }}>Plan Breakdown</h2>
          <div className="flex gap-3">
            {Object.entries(planCounts).map(([plan, count]) => (
              <div key={plan} className="px-4 py-3 rounded-lg" style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}>
                <span className="text-lg font-medium block" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>{count}</span>
                <span className="text-xs" style={{ color: "var(--ink-muted)" }}>{plan}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Users table */}
        <div className="mb-10">
          <h2 className="text-sm font-medium mb-3" style={{ color: "var(--ink-muted)" }}>Recent Users</h2>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--cream)" }}>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Name</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Email</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Plan</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Status</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {(users || []).map((u) => (
                    <tr key={u.id} style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
                      <td className="px-4 py-3" style={{ color: "var(--ink)" }}>{u.full_name || "—"}</td>
                      <td className="px-4 py-3" style={{ color: "var(--ink-light)" }}>{u.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{
                            background: u.plan === "free" ? "var(--sand)" : u.plan === "pro" ? "var(--terracotta)" : "var(--sage-light)",
                            color: u.plan === "free" ? "var(--ink-muted)" : u.plan === "pro" ? "white" : "var(--sage)",
                          }}
                        >
                          {u.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs" style={{ color: u.onboarded ? "var(--sage)" : "var(--ink-muted)" }}>
                          {u.onboarded ? "Onboarded" : "Not onboarded"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--ink-muted)" }}>
                        {new Date(u.created_at).toLocaleDateString("en-AU")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Orders table */}
        <div className="mb-10">
          <h2 className="text-sm font-medium mb-3" style={{ color: "var(--ink-muted)" }}>Recent Orders</h2>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--cream)" }}>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Customer</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Product</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Amount</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Status</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(orders || []).length === 0 ? (
                    <tr style={{ background: "var(--warm-white)" }}>
                      <td colSpan={5} className="px-4 py-6 text-center" style={{ color: "var(--ink-muted)" }}>
                        No orders yet. Orders will appear here once LemonSqueezy is connected.
                      </td>
                    </tr>
                  ) : (
                    (orders || []).map((o) => (
                      <tr key={o.id} style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
                        <td className="px-4 py-3" style={{ color: "var(--ink)" }}>{o.customer_email}</td>
                        <td className="px-4 py-3" style={{ color: "var(--ink-light)" }}>{o.product_name}</td>
                        <td className="px-4 py-3" style={{ color: "var(--ink)" }}>${(o.amount_cents / 100).toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <span
                            className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{
                              background: o.status === "completed" ? "var(--sage-light)" : o.status === "refunded" ? "var(--sand)" : "var(--cream)",
                              color: o.status === "completed" ? "var(--sage)" : o.status === "refunded" ? "var(--terracotta)" : "var(--ink-muted)",
                            }}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--ink-muted)" }}>
                          {new Date(o.created_at).toLocaleDateString("en-AU")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Subscribers table */}
        <div>
          <h2 className="text-sm font-medium mb-3" style={{ color: "var(--ink-muted)" }}>Email Subscribers</h2>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--cream)" }}>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Email</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Source</th>
                    <th className="text-left px-4 py-3 font-medium" style={{ color: "var(--ink-muted)" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {(subscribers || []).length === 0 ? (
                    <tr style={{ background: "var(--warm-white)" }}>
                      <td colSpan={3} className="px-4 py-6 text-center" style={{ color: "var(--ink-muted)" }}>
                        No subscribers yet. They&rsquo;ll appear when people use the email capture form.
                      </td>
                    </tr>
                  ) : (
                    (subscribers || []).map((s) => (
                      <tr key={s.id} style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
                        <td className="px-4 py-3" style={{ color: "var(--ink)" }}>{s.email}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--ink-muted)" }}>{s.source}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: "var(--ink-muted)" }}>
                          {new Date(s.created_at).toLocaleDateString("en-AU")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
