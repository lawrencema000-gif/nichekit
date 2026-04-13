import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function ConsultationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("plan, consultation_credits")
    .eq("id", user!.id)
    .single();

  const plan = profile?.plan || "free";
  const credits = profile?.consultation_credits || 0;

  if (plan !== "pro") {
    return (
      <div>
        <h1 className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
          1-on-1 Consultation
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--ink-muted)" }}>
          Monthly 30-minute strategy calls — available on the Pro plan.
        </p>
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
        >
          <p className="text-3xl mb-4">◎</p>
          <h2 className="text-lg mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Upgrade to Pro
          </h2>
          <p className="text-sm mb-6 max-w-sm mx-auto" style={{ color: "var(--ink-light)" }}>
            Get a monthly 30-minute consultation call to review your store, strategy, and marketing — plus everything in Starter.
          </p>
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 rounded-full text-sm font-medium transition hover:opacity-90"
            style={{ background: "var(--terracotta)", color: "white" }}
          >
            View Pro plan — $79/mo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
        1-on-1 Consultation
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--ink-muted)" }}>
        You have {credits} consultation credit{credits !== 1 ? "s" : ""} remaining this month.
      </p>

      <div
        className="rounded-2xl p-8"
        style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
      >
        <h2 className="text-lg mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
          Book your call
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--ink-light)" }}>
          Schedule a 30-minute strategy session. Come with questions about your store, marketing, or growth plan.
        </p>

        {credits > 0 ? (
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-full text-sm font-medium transition hover:opacity-90"
            style={{ background: "var(--terracotta)", color: "white" }}
          >
            Book a time
          </a>
        ) : (
          <p className="text-sm p-4 rounded-lg" style={{ background: "var(--sand)", color: "var(--ink-light)" }}>
            You&rsquo;ve used your consultation this month. Your credit resets on the 1st.
          </p>
        )}

        <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <h3 className="text-sm font-medium mb-3" style={{ color: "var(--ink)" }}>What to prepare</h3>
          <ul className="space-y-2 text-sm" style={{ color: "var(--ink-light)" }}>
            <li>• Your store URL (if live) or description of what you&rsquo;re building</li>
            <li>• 2-3 specific questions or challenges</li>
            <li>• Any analytics or metrics you want reviewed</li>
            <li>• What you&rsquo;ve tried that hasn&rsquo;t worked</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
