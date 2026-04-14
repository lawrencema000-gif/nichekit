import { createAdminClient } from "@/lib/supabase-admin";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = { title: "Admin — NicheKit" };

export default async function AdminPage() {
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
