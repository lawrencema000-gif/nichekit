import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function BillingPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("plan, subscription_status, subscription_ends_at, lemon_customer_id")
    .eq("id", user!.id)
    .single();

  const plan = profile?.plan || "free";
  const status = profile?.subscription_status || "inactive";
  const endsAt = profile?.subscription_ends_at;

  const planDetails: Record<string, { name: string; price: string }> = {
    free: { name: "Free", price: "$0" },
    starter: { name: "Starter", price: "$29/mo" },
    pro: { name: "Pro", price: "$79/mo" },
    lifetime: { name: "Lifetime", price: "One-time" },
  };

  const current = planDetails[plan] || planDetails.free;

  return (
    <div>
      <h1 className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
        Billing
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--ink-muted)" }}>
        Manage your subscription and payment details.
      </p>

      <div
        className="rounded-2xl p-6 mb-6"
        style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              {current.name} Plan
            </h2>
            <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
              {current.price}
              {status === "active" && " · Active"}
              {status === "cancelled" && endsAt && ` · Cancels ${new Date(endsAt).toLocaleDateString("en-AU")}`}
            </p>
          </div>
          {plan === "free" ? (
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-full text-sm font-medium transition hover:opacity-90"
              style={{ background: "var(--terracotta)", color: "white" }}
            >
              Upgrade
            </Link>
          ) : (
            <a
              href={process.env.NEXT_PUBLIC_LEMON_BILLING_URL || "#"}
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ border: "1px solid var(--border)", color: "var(--ink-light)" }}
            >
              Manage subscription
            </a>
          )}
        </div>

        {plan !== "free" && (
          <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
            <h3 className="text-sm font-medium mb-2" style={{ color: "var(--ink)" }}>Your plan includes</h3>
            <ul className="space-y-1.5 text-sm" style={{ color: "var(--ink-light)" }}>
              <li>✓ All courses and future updates</li>
              <li>✓ All template packs (6 niches)</li>
              {plan === "pro" && <li>✓ Monthly 30-min consultation call</li>}
              {plan === "pro" && <li>✓ Priority support (24hr response)</li>}
            </ul>
          </div>
        )}
      </div>

      <div
        className="rounded-2xl p-6"
        style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-sm font-medium mb-2" style={{ color: "var(--ink)" }}>Need help?</h2>
        <p className="text-sm" style={{ color: "var(--ink-light)" }}>
          Email <a href="mailto:support@nichekit.co" style={{ color: "var(--terracotta)" }}>support@nichekit.co</a> for
          billing questions, plan changes, or refund requests.
        </p>
      </div>
    </div>
  );
}
