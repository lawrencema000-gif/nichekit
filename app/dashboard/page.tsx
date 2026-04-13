import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user!.id)
    .single();

  const plan = profile?.plan || "free";
  const firstName = profile?.full_name?.split(" ")[0] || "there";

  return (
    <div>
      <h1 className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
        G&rsquo;day, {firstName}
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--ink-muted)" }}>
        Here&rsquo;s your NicheKit dashboard.
      </p>

      {plan === "free" && (
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "var(--warm-white)", border: "1.5px solid var(--terracotta)", borderStyle: "dashed" }}
        >
          <h2 className="text-lg mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Unlock everything
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--ink-light)" }}>
            You&rsquo;re on the free plan. Upgrade to access all courses, templates, and resources.
          </p>
          <Link
            href="/pricing"
            className="inline-block px-5 py-2.5 rounded-full text-sm font-medium transition hover:opacity-90"
            style={{ background: "var(--terracotta)", color: "white" }}
          >
            View plans
          </Link>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/dashboard/courses"
          className="hover-lift rounded-2xl p-6"
          style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
        >
          <span className="text-2xl block mb-3">◈</span>
          <h3 className="font-medium mb-1" style={{ color: "var(--ink)" }}>Courses</h3>
          <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
            {plan === "free" ? "Preview Module 1 free" : "Access all courses"}
          </p>
        </Link>

        <Link
          href="/dashboard/templates"
          className="hover-lift rounded-2xl p-6"
          style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
        >
          <span className="text-2xl block mb-3">◇</span>
          <h3 className="font-medium mb-1" style={{ color: "var(--ink)" }}>Templates</h3>
          <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
            {plan === "free" ? "3 free samples" : "All 30+ templates"}
          </p>
        </Link>

        <Link
          href={plan === "pro" ? "/dashboard/consultation" : "/pricing"}
          className="hover-lift rounded-2xl p-6"
          style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
        >
          <span className="text-2xl block mb-3">◎</span>
          <h3 className="font-medium mb-1" style={{ color: "var(--ink)" }}>1-on-1 Consultation</h3>
          <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
            {plan === "pro" ? "Book your monthly call" : "Pro plan only"}
          </p>
        </Link>
      </div>
    </div>
  );
}
