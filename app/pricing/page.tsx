import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get a taste of what NicheKit offers.",
    features: [
      "Module 1 of core course (full access)",
      "3 sample templates",
      "Weekly email tips",
    ],
    cta: "Get started",
    href: "/signup",
    style: "outline" as const,
  },
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Full access to every course and template.",
    popular: true,
    features: [
      "All courses (core + mini-courses)",
      "All template packs (6 niches, 30+ files)",
      "Monthly new content",
      "Community access",
      "Course updates forever",
    ],
    cta: "Start Starter",
    href: process.env.NEXT_PUBLIC_LEMON_STARTER || "#",
    style: "primary" as const,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "Everything plus monthly 1-on-1 strategy calls.",
    features: [
      "Everything in Starter",
      "Monthly 30-min consultation call",
      "Priority support (24hr response)",
      "Store review & feedback",
      "Custom AI prompts library",
      "Early access to new courses",
    ],
    cta: "Go Pro",
    href: process.env.NEXT_PUBLIC_LEMON_PRO || "#",
    style: "primary" as const,
  },
];

const LIFETIME = {
  price: "$297",
  description: "One-time payment. All courses + templates forever. No consultation calls.",
  href: process.env.NEXT_PUBLIC_LEMON_LIFETIME || "#",
};

function CheckMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="8" fill="var(--sage-light)" />
      <path d="M5 8.5l2 2 4-4.5" stroke="var(--sage)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--warm-white)" }}>
      {/* Nav */}
      <nav className="px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            NicheKit
          </Link>
          <Link href="/login" className="text-sm" style={{ color: "var(--ink-muted)" }}>
            Log in
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--terracotta)" }}>
            Pricing
          </p>
          <h1 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Pick your plan
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "var(--ink-muted)" }}>
            Start free. Upgrade when you&rsquo;re ready. Cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl p-6 flex flex-col"
              style={{
                background: plan.popular ? "var(--ink)" : "var(--cream)",
                border: plan.popular ? "none" : "1px solid var(--border)",
                color: plan.popular ? "var(--sand)" : "var(--ink-light)",
              }}
            >
              {plan.popular && (
                <span
                  className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full mb-4"
                  style={{ background: "var(--terracotta)", color: "white" }}
                >
                  Most Popular
                </span>
              )}
              <h2
                className="text-xl mb-1"
                style={{ fontFamily: "var(--font-display)", color: plan.popular ? "var(--warm-white)" : "var(--ink)" }}
              >
                {plan.name}
              </h2>
              <div className="flex items-baseline gap-1 mb-3">
                <span
                  className="text-3xl font-medium"
                  style={{ fontFamily: "var(--font-display)", color: plan.popular ? "var(--warm-white)" : "var(--ink)" }}
                >
                  {plan.price}
                </span>
                <span className="text-sm">{plan.period}</span>
              </div>
              <p className="text-sm mb-6">{plan.description}</p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <CheckMark />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className="block text-center w-full py-3 rounded-full text-sm font-medium transition hover:opacity-90"
                style={
                  plan.style === "primary"
                    ? { background: plan.popular ? "var(--terracotta)" : "var(--ink)", color: "white" }
                    : { border: "1.5px solid var(--border)", color: "var(--ink-light)" }
                }
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Lifetime option */}
        <div
          className="rounded-2xl p-6 text-center"
          style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
        >
          <h3 className="text-lg mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Lifetime Access — {LIFETIME.price}
          </h3>
          <p className="text-sm mb-4" style={{ color: "var(--ink-muted)" }}>
            {LIFETIME.description}
          </p>
          <a
            href={LIFETIME.href}
            className="inline-block px-6 py-2.5 rounded-full text-sm font-medium transition hover:opacity-90"
            style={{ border: "1.5px solid var(--border)", color: "var(--ink)" }}
          >
            Get lifetime access
          </a>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-lg mx-auto">
          <h2 className="text-xl text-center mb-8" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Common questions
          </h2>
          {[
            { q: "Can I cancel anytime?", a: "Yes. Cancel from your billing page and you keep access until the end of your billing period." },
            { q: "What payment methods?", a: "Credit card, debit card, and PayPal — processed securely through LemonSqueezy." },
            { q: "Do I get future courses?", a: "Yes. All new courses and templates added while you're subscribed are included at no extra cost." },
            { q: "What's the consultation like?", a: "A 30-minute video call where we review your store, answer questions, and give you a clear action plan. Available monthly on Pro." },
          ].map((faq, i) => (
            <div key={i} className="py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <h3 className="text-sm font-medium mb-1" style={{ color: "var(--ink)" }}>{faq.q}</h3>
              <p className="text-sm" style={{ color: "var(--ink-light)" }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
