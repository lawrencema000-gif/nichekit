import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";

const COURSES = [
  {
    title: "Build Your Own Online Store with AI",
    tag: "Core Course",
    modules: "10 modules",
    description: "The complete, no-BS guide to launching a profitable e-commerce store — without Shopify, without agencies, without blowing $5K on a developer. Just AI tools, free platforms, and scrappy Australian hustle.",
    topics: ["Next.js + Vercel (free hosting)", "Stripe & LemonSqueezy payments", "AI-generated product pages", "ABN, GST & Australian compliance", "Launch to first sale in 14 days"],
  },
  {
    title: "AI SEO That Actually Works",
    tag: "Mini Course",
    modules: "6 modules",
    description: "Rank on Google without an agency. Unconventional SEO tactics using AI — keyword research, content generation, and local SEO for Australian cities and suburbs.",
    topics: ["AI keyword research", "Content that ranks (not just reads)", "Google Business Profile domination", "Local SEO for Aussie suburbs", "Get cited by ChatGPT & Perplexity"],
  },
  {
    title: "From Zero to First Sale in 7 Days",
    tag: "Beginner",
    modules: "7 modules",
    description: "No theory. No fluff. Just the fastest path from idea to income. Built for people who are tired of courses that teach everything except how to actually make money.",
    topics: ["Pick a product in 2 hours", "Build a store in 1 day", "Get traffic without ads", "Close your first sale", "What to do after the first $100"],
  },
  {
    title: "Email Marketing Machine",
    tag: "Mini Course",
    modules: "5 modules",
    description: "Build an email list and write sequences that convert — using AI to do 90% of the work. Stop paying Mailchimp $50/mo for something you can automate for free.",
    topics: ["Free email tools that scale", "AI-written welcome sequences", "Abandoned cart recovery", "Monthly newsletter autopilot", "List building without popups"],
  },
  {
    title: "Social Media on Autopilot",
    tag: "Mini Course",
    modules: "5 modules",
    description: "Set up automated posting across Instagram, TikTok, X, and LinkedIn. AI writes it, tools schedule it, you get on with your life.",
    topics: ["AI content generation", "Auto-scheduling tools", "Platform-specific strategies", "Engagement without being online", "Content repurposing system"],
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "See if it's for you.",
    features: ["Module 1 of core course", "3 sample templates", "Weekly email tips"],
    cta: "Start free",
    href: "/signup",
    highlight: false,
  },
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "Full access to everything.",
    features: ["All courses (5 courses, 33 modules)", "All template packs (6 niches)", "Monthly new content", "Community access", "Future courses included"],
    cta: "Start learning",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/mo",
    description: "Courses + monthly 1-on-1 calls.",
    features: ["Everything in Starter", "Monthly 30-min consultation", "Store review & feedback", "Priority support (24hr)", "Custom AI prompts library"],
    cta: "Go Pro",
    href: "/signup",
    highlight: false,
  },
];

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline-block ml-1">
      <path d="M1 7h12m0 0L8 2m5 5L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
      <circle cx="8" cy="8" r="8" fill="var(--sage-light)" />
      <path d="M5 8.5l2 2 4-4.5" stroke="var(--sage)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* ════════ NAV ════════ */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(253,251,247,0.85)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            NicheKit
          </Link>
          <div className="hidden sm:flex items-center gap-8 text-sm" style={{ color: "var(--ink-light)" }}>
            <a href="#courses" className="hover:text-[var(--ink)] transition">Courses</a>
            <a href="#pricing" className="hover:text-[var(--ink)] transition">Pricing</a>
            <Link href="/login" className="hover:text-[var(--ink)] transition">Log in</Link>
          </div>
          <Link
            href="/signup"
            className="text-sm font-medium px-5 py-2 rounded-full transition hover:opacity-90"
            style={{ background: "var(--ink)", color: "var(--warm-white)" }}
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* ════════ HERO ════════ */}
      <section className="noise-bg" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="max-w-3xl">
            <p
              className="text-sm font-medium tracking-widest uppercase mb-6 animate-fade-up"
              style={{ color: "var(--terracotta)" }}
            >
              For Australians who want to sell online
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6 animate-fade-up delay-1"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Build your own
              <br />
              e-commerce store.
              <br />
              <span style={{ color: "var(--terracotta)" }}>No Shopify. Just AI.</span>
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up delay-2"
              style={{ color: "var(--ink-light)" }}
            >
              Unconventional, effective courses that teach you to build, launch,
              and market an online store using AI tools — for a fraction of what
              agencies charge. Built for the Australian market.
            </p>
            <div className="flex flex-wrap items-center gap-4 animate-fade-up delay-3">
              <Link
                href="/signup"
                className="inline-flex items-center px-7 py-3.5 rounded-full text-base font-medium transition hover:opacity-90"
                style={{ background: "var(--terracotta)", color: "white" }}
              >
                Start learning free
                <ArrowIcon />
              </Link>
              <a
                href="#courses"
                className="inline-flex items-center px-7 py-3.5 rounded-full text-base font-medium transition hover:opacity-90"
                style={{ border: "1.5px solid var(--border)", color: "var(--ink-light)" }}
              >
                See what&rsquo;s inside
              </a>
            </div>
            <p className="text-xs mt-5 animate-fade-up delay-4" style={{ color: "var(--ink-muted)" }}>
              Free tier available &middot; No credit card required &middot; Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* ════════ MARQUEE ════════ */}
      <div className="overflow-hidden py-4" style={{ background: "var(--ink)", color: "var(--sand)" }}>
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-sm tracking-wide">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-12 items-center">
              <span>5 Courses</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
              <span>33 Modules</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
              <span>Australian-First</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
              <span>AI-Powered</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
              <span>No Shopify</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
              <span>1-on-1 Calls Available</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
              <span>Templates Included</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════ WHY DIFFERENT ════════ */}
      <section className="py-20 px-6" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--terracotta)" }}>
              Not another generic course
            </p>
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              What makes this different
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Australian-first",
                desc: "ABN setup, GST handling, AUD pricing, Aussie payment processors, local shipping, Australian consumer law. Not American advice repackaged.",
              },
              {
                title: "AI does the heavy lifting",
                desc: "Product descriptions, SEO content, email sequences, social posts — AI generates 90% of it. You edit and publish. Save hundreds of hours.",
              },
              {
                title: "Effective, not conventional",
                desc: "No \"follow these 47 steps\" theory. Scrappy tactics that actually work — guerrilla marketing, AI shortcuts, and strategies the gurus don't teach.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl" style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
                <h3 className="text-base font-medium mb-2" style={{ color: "var(--ink)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-light)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ COURSES ════════ */}
      <section id="courses" className="noise-bg py-20 px-6" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--terracotta)" }}>
              The curriculum
            </p>
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              5 courses. Everything you need.
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "var(--ink-muted)" }}>
              From picking a product to automating your marketing — each course solves one piece of the puzzle.
            </p>
          </div>

          <div className="space-y-5">
            {COURSES.map((course, idx) => (
              <div
                key={idx}
                className="hover-lift rounded-2xl overflow-hidden"
                style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
              >
                <div className="md:flex">
                  <div className="hidden md:block w-1.5 shrink-0" style={{ background: "var(--terracotta)" }} />
                  <div className="flex-1 p-8 md:p-10">
                    <div className="md:flex md:items-start md:justify-between md:gap-8">
                      <div className="flex-1 mb-6 md:mb-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: "var(--sage-light)", color: "var(--sage)" }}>
                            {course.tag}
                          </span>
                          <span className="text-xs" style={{ color: "var(--ink-muted)" }}>{course.modules}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                          {course.title}
                        </h3>
                        <p className="text-sm leading-relaxed max-w-lg" style={{ color: "var(--ink-light)" }}>
                          {course.description}
                        </p>
                      </div>
                      <div className="shrink-0 md:w-64">
                        <ul className="space-y-2">
                          {course.topics.map((topic, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--ink-light)" }}>
                              <CheckMark />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ TEMPLATES INCLUDED ════════ */}
      <section className="py-20 px-6" style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--terracotta)" }}>
            Included with every plan
          </p>
          <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Ready-made templates too
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto" style={{ color: "var(--ink-muted)" }}>
            Don&rsquo;t just learn — launch. Every subscriber gets downloadable business templates for 6 niches.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["90-Day Social Media Calendar", "Email Marketing Swipe File", "Business Document Kit", "SEO Starter Toolkit", "Client Acquisition Playbook", "30+ Files Per Niche"].map((item, i) => (
              <div key={i} className="p-4 rounded-xl text-sm" style={{ background: "var(--cream)", border: "1px solid var(--border)", color: "var(--ink-light)" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PRICING ════════ */}
      <section id="pricing" className="noise-bg py-20 px-6" style={{ background: "var(--cream)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--terracotta)" }}>
              Simple pricing
            </p>
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              Start free. Upgrade when ready.
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: "var(--ink-muted)" }}>
              All prices in AUD. Cancel anytime. No lock-in contracts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  background: plan.highlight ? "var(--ink)" : "var(--warm-white)",
                  border: plan.highlight ? "none" : "1px solid var(--border)",
                  color: plan.highlight ? "var(--sand)" : "var(--ink-light)",
                }}
              >
                {plan.highlight && (
                  <span className="self-start text-xs font-medium px-2.5 py-0.5 rounded-full mb-4" style={{ background: "var(--terracotta)", color: "white" }}>
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl mb-1" style={{ fontFamily: "var(--font-display)", color: plan.highlight ? "var(--warm-white)" : "var(--ink)" }}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-0.5 mb-3">
                  <span className="text-3xl font-medium" style={{ fontFamily: "var(--font-display)", color: plan.highlight ? "var(--warm-white)" : "var(--ink)" }}>
                    {plan.price}
                  </span>
                  {plan.period && <span className="text-sm">{plan.period}</span>}
                </div>
                <p className="text-sm mb-6">{plan.description}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckMark />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className="block text-center w-full py-3 rounded-full text-sm font-medium transition hover:opacity-90"
                  style={
                    plan.highlight
                      ? { background: "var(--terracotta)", color: "white" }
                      : plan.name === "Pro"
                      ? { background: "var(--ink)", color: "var(--warm-white)" }
                      : { border: "1.5px solid var(--border)", color: "var(--ink-light)" }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm mt-8" style={{ color: "var(--ink-muted)" }}>
            Also available: <Link href="/pricing" className="underline" style={{ color: "var(--terracotta)" }}>Lifetime access for $297</Link> (one-time, no consultations)
          </p>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section className="py-20 px-6" style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              How it works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { num: "01", title: "Sign up free", desc: "Get instant access to Module 1 and sample templates. See if it's right for you — no credit card needed." },
              { num: "02", title: "Follow the courses", desc: "Step-by-step guides with real examples. AI does the heavy lifting — you make the decisions." },
              { num: "03", title: "Launch & earn", desc: "Use the templates, scripts, and playbooks to go live. Start making sales while you're still learning." },
            ].map((step) => (
              <div key={step.num}>
                <span className="block text-5xl font-medium mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--sand-dark)" }}>
                  {step.num}
                </span>
                <h3 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-light)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="py-20 px-6" style={{ background: "var(--cream)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-14" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Common questions
          </h2>
          <div className="space-y-0">
            {[
              { q: "Do I need technical skills?", a: "No. The courses are designed for complete beginners. AI handles the technical parts — you follow step-by-step guides." },
              { q: "Why not just use Shopify?", a: "Shopify costs $79+ AUD/month, takes a 2% transaction fee, and locks you into their ecosystem. We teach you to build on free/low-cost platforms you own and control." },
              { q: "Is this for Australians only?", a: "The courses work globally, but we focus on Australian specifics — ABN, GST, AUD pricing, Aussie payment processors, Australian consumer law, and local marketing tactics." },
              { q: "What if I already have a store?", a: "The SEO, email, and social media courses are valuable for any existing business. The consultation calls (Pro plan) are perfect for getting specific feedback on your store." },
              { q: "Can I cancel anytime?", a: "Yes. Cancel from your dashboard. You keep access until the end of your billing period. No lock-in, no exit fees." },
              { q: "What's the consultation like?", a: "A 30-minute video call where we review your store, answer questions, and give you a clear action plan. Available monthly on the Pro plan." },
            ].map((faq, i) => (
              <div key={i} className="py-6" style={{ borderBottom: "1px solid var(--border)" }}>
                <h3 className="text-base font-medium mb-2" style={{ color: "var(--ink)" }}>{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-light)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ EMAIL CAPTURE ════════ */}
      <section className="py-16 px-6" style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Not ready to commit?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--ink-muted)" }}>
            Get a free guide: &ldquo;5 AI Tools That Replace a $5K Web Developer&rdquo; — straight to your inbox.
          </p>
          <EmailCapture />
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section className="noise-bg py-24 px-6 text-center" style={{ background: "var(--ink)" }}>
        <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--warm-white)" }}>
          Your store won&rsquo;t build itself.
        </h2>
        <p className="text-base mb-10 max-w-md mx-auto" style={{ color: "var(--sand)" }}>
          But with AI and the right plan, it&rsquo;s a lot closer than you think.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center px-10 py-4 rounded-full text-base font-medium transition hover:opacity-90"
          style={{ background: "var(--terracotta)", color: "white" }}
        >
          Start learning free
          <ArrowIcon />
        </Link>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="py-10 px-6" style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--ink-muted)" }}>
          <span style={{ fontFamily: "var(--font-display)", color: "var(--ink-light)" }}>NicheKit</span>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="hover:text-[var(--ink)] transition">Pricing</Link>
            <Link href="/terms" className="hover:text-[var(--ink)] transition">Terms</Link>
            <Link href="/privacy" className="hover:text-[var(--ink)] transition">Privacy</Link>
            <a href="mailto:support@nichekit.co" className="hover:text-[var(--ink)] transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
