import Link from "next/link";
import EmailCapture from "@/components/EmailCapture";

const NICHES = [
  { key: "dentists", label: "Dental Practices", icon: "🦷", count: "23 templates" },
  { key: "restaurants", label: "Restaurants", icon: "🍴", count: "23 templates" },
  { key: "real-estate", label: "Real Estate", icon: "🏡", count: "23 templates" },
  { key: "gyms", label: "Gyms & Fitness", icon: "🏋️", count: "23 templates" },
  { key: "salons", label: "Salons & Spas", icon: "✂️", count: "23 templates" },
  { key: "ecommerce", label: "E-Commerce", icon: "🛍️", count: "23 templates" },
];

const PRODUCTS = [
  {
    id: "calendar",
    name: "90-Day Social Media Calendar",
    price: 19,
    tag: "Most Popular",
    description:
      "90 days of ready-to-post content with full copy, hashtags, CTAs, and scheduling notes. 15 rotating content formats keep your feed fresh.",
    includes: [
      "90 unique posts with full copy",
      "3 rotating hashtag sets",
      "15 content formats",
      "Best posting times guide",
      "How-to PDF guide",
    ],
    envKey: "NEXT_PUBLIC_LEMON_CALENDAR",
    accent: "var(--terracotta)",
  },
  {
    id: "email",
    name: "Email Marketing Swipe File",
    price: 19,
    tag: "10 Templates",
    description:
      "Professional HTML email templates for every stage — welcome sequences, promos, review requests, referrals, and newsletters.",
    includes: [
      "10 styled HTML emails",
      "Welcome sequence (3 emails)",
      "Promotional templates",
      "Referral & review requests",
      "Newsletter template",
    ],
    envKey: "NEXT_PUBLIC_LEMON_EMAIL",
    accent: "var(--sage)",
  },
  {
    id: "documents",
    name: "Business Document Kit",
    price: 19,
    tag: "Essentials",
    description:
      "Invoice, proposal, and contract templates that make your business look established from day one. Print-ready and easy to customize.",
    includes: [
      "Invoice template (HTML)",
      "Service proposal template",
      "Client service agreement (PDF)",
      "All niche-customized",
      "Easy to brand",
    ],
    envKey: "NEXT_PUBLIC_LEMON_DOCUMENTS",
    accent: "var(--charcoal)",
  },
  {
    id: "seo",
    name: "SEO Starter Toolkit",
    price: 19,
    tag: "Rank Higher",
    description:
      "Keyword research spreadsheet with intent data plus a step-by-step action plan. No technical background needed.",
    includes: [
      "10+ researched keywords",
      "Competition analysis",
      "Content ideas per keyword",
      "Google Business checklist",
      "SEO action plan (PDF)",
    ],
    envKey: "NEXT_PUBLIC_LEMON_SEO",
    accent: "var(--terracotta-dark)",
  },
  {
    id: "acquisition",
    name: "Client Acquisition Playbook",
    price: 19,
    tag: "Get Clients",
    description:
      "Scripts and frameworks for finding, reaching, and closing new clients. Cold emails, objection handlers, referrals, and follow-ups.",
    includes: [
      "Cold outreach scripts",
      "Objection handling scripts",
      "Referral templates",
      "30-day follow-up framework",
      "Pricing strategy guide",
    ],
    envKey: "NEXT_PUBLIC_LEMON_ACQUISITION",
    accent: "var(--sage)",
  },
];

const BUNDLE_PRICE = 67;
const BUNDLE_ORIGINAL = 95;

/* ─── Tiny SVG icons ─── */
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
  const lemonBase = process.env.NEXT_PUBLIC_LEMON_STORE_URL || "#";

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* ════════ NAV ════════ */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(253,251,247,0.85)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            NicheKit
          </span>
          <div className="hidden sm:flex items-center gap-8 text-sm" style={{ color: "var(--ink-light)" }}>
            <a href="#products" className="hover:text-[var(--ink)] transition">Products</a>
            <a href="#niches" className="hover:text-[var(--ink)] transition">Niches</a>
            <a href="#bundle" className="hover:text-[var(--ink)] transition">Bundle</a>
          </div>
          <a
            href="#bundle"
            className="text-sm font-medium px-5 py-2 rounded-full transition hover:opacity-90"
            style={{ background: "var(--ink)", color: "var(--warm-white)" }}
          >
            Get the Bundle
          </a>
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
              Templates for small businesses
            </p>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6 animate-fade-up delay-1"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              The marketing toolkit
              <br />
              you wish you had
              <br />
              <span style={{ color: "var(--terracotta)" }}>on day one.</span>
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate-fade-up delay-2"
              style={{ color: "var(--ink-light)" }}
            >
              90 days of social content. Email sequences. SEO playbooks.
              Client acquisition scripts. All written for your niche —
              ready to customize and launch today.
            </p>
            <div className="flex flex-wrap items-center gap-4 animate-fade-up delay-3">
              <a
                href="#bundle"
                className="inline-flex items-center px-7 py-3.5 rounded-full text-base font-medium transition hover:opacity-90"
                style={{ background: "var(--terracotta)", color: "white" }}
              >
                Everything for ${BUNDLE_PRICE}
                <ArrowIcon />
              </a>
              <a
                href="#products"
                className="inline-flex items-center px-7 py-3.5 rounded-full text-base font-medium transition hover:opacity-90"
                style={{ border: "1.5px solid var(--border)", color: "var(--ink-light)" }}
              >
                Browse products
              </a>
            </div>
            <p className="text-xs mt-5 animate-fade-up delay-4" style={{ color: "var(--ink-muted)" }}>
              One-time purchase &middot; Instant download &middot; No subscription
            </p>
          </div>
        </div>
      </section>

      {/* ════════ MARQUEE TRUST BAR ════════ */}
      <div
        className="overflow-hidden py-4"
        style={{ background: "var(--ink)", color: "var(--sand)" }}
      >
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-sm tracking-wide">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-12 items-center">
              <span>6 Niches</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
              <span>30+ Templates</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
              <span>90 Days of Content</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
              <span>Instant Download</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
              <span>30-Day Guarantee</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
              <span>Use Forever</span>
              <span style={{ color: "var(--terracotta-light)" }}>&bull;</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════ NICHES ════════ */}
      <section id="niches" className="py-20 px-6" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--terracotta)" }}>
              Pick your industry
            </p>
            <h2
              className="text-3xl md:text-4xl mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Built for your niche
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: "var(--ink-muted)" }}>
              Every template is written with real industry terminology, pain points, and strategies.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {NICHES.map((n, i) => (
              <div
                key={n.key}
                className={`hover-lift rounded-2xl p-6 text-center cursor-default animate-fade-up delay-${(i % 6) + 1}`}
                style={{ background: "var(--cream)", border: "1px solid var(--border)" }}
              >
                <span className="text-3xl block mb-3">{n.icon}</span>
                <span className="font-medium block" style={{ color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
                  {n.label}
                </span>
                <span className="text-xs block mt-1" style={{ color: "var(--ink-muted)" }}>
                  {n.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PREVIEW / SOCIAL PROOF ════════ */}
      <section className="py-20 px-6" style={{ background: "var(--cream)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--terracotta)" }}>
              See before you buy
            </p>
            <h2 className="text-3xl md:text-4xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              Here&rsquo;s what you get
            </h2>
            <p className="text-base max-w-md mx-auto" style={{ color: "var(--ink-muted)" }}>
              Real samples from the Dental Practices kit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Sample Calendar Posts */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}>
              <div className="px-6 py-4" style={{ background: "var(--ink)", color: "var(--sand)" }}>
                <span className="text-xs font-medium tracking-widest uppercase">From the 90-Day Calendar</span>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { day: "Day 3", type: "Client Testimonial", text: "\"[Client] came to us for cosmetic dentistry and the results were incredible.\" We love hearing from happy clients! Thank you for trusting us.", platform: "Instagram" },
                  { day: "Day 7", type: "Myth Buster", text: "Myth: \"Patient no-shows\" is just something you have to live with.\n\nFact: With automated reminders and smart scheduling, you can reduce no-shows by 40%.", platform: "Facebook" },
                  { day: "Day 12", type: "Behind the Scenes", text: "Here's what a typical day looks like at our dental practice! From general dentistry to making sure every detail is perfect — this is what goes into great results.", platform: "TikTok" },
                ].map((post, i) => (
                  <div key={i} className="p-4 rounded-xl" style={{ background: "var(--cream)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium" style={{ color: "var(--terracotta)" }}>{post.day} &middot; {post.type}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--sage-light)", color: "var(--sage)" }}>{post.platform}</span>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--ink-light)" }}>{post.text}</p>
                  </div>
                ))}
                <p className="text-xs text-center pt-2" style={{ color: "var(--ink-muted)" }}>+ 87 more posts with hashtags, CTAs, and scheduling notes</p>
              </div>
            </div>

            {/* Sample Email + SEO Preview */}
            <div className="space-y-6">
              {/* Email Preview */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}>
                <div className="px-6 py-4" style={{ background: "var(--ink)", color: "var(--sand)" }}>
                  <span className="text-xs font-medium tracking-widest uppercase">From the Email Swipe File</span>
                </div>
                <div className="p-6">
                  <div className="p-4 rounded-xl" style={{ background: "var(--cream)" }}>
                    <p className="text-xs mb-1" style={{ color: "var(--ink-muted)" }}>Subject:</p>
                    <p className="text-sm font-medium mb-3" style={{ color: "var(--ink)" }}>Your smile deserves this (quick read)</p>
                    <p className="text-xs mb-1" style={{ color: "var(--ink-muted)" }}>Preview:</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--ink-light)" }}>
                      Hi [First Name], Welcome to [Your Practice Name]! Here&rsquo;s what you can expect: General dentistry tailored to your needs, Cosmetic dentistry using the best techniques, Expert guidance from our experienced team...
                    </p>
                  </div>
                  <p className="text-xs text-center pt-3" style={{ color: "var(--ink-muted)" }}>+ 9 more templates (referrals, promos, newsletters...)</p>
                </div>
              </div>

              {/* SEO Keywords Preview */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}>
                <div className="px-6 py-4" style={{ background: "var(--ink)", color: "var(--sand)" }}>
                  <span className="text-xs font-medium tracking-widest uppercase">From the SEO Toolkit</span>
                </div>
                <div className="p-6">
                  <div className="space-y-2">
                    {[
                      { kw: "dentist near me", intent: "Local", diff: "High" },
                      { kw: "teeth whitening cost", intent: "Commercial", diff: "Medium" },
                      { kw: "how to fix a chipped tooth", intent: "Informational", diff: "Low" },
                    ].map((k, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--cream)" }}>
                        <span className="text-sm" style={{ color: "var(--ink)" }}>{k.kw}</span>
                        <div className="flex gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "var(--sage-light)", color: "var(--sage)" }}>{k.intent}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: k.diff === "Low" ? "var(--sage-light)" : k.diff === "Medium" ? "var(--sand)" : "#fde8e8", color: k.diff === "Low" ? "var(--sage)" : k.diff === "Medium" ? "var(--terracotta-dark)" : "#c45d3e" }}>{k.diff}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-center pt-3" style={{ color: "var(--ink-muted)" }}>+ 7 more keywords with content ideas and priority rankings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PRODUCTS ════════ */}
      <section id="products" className="noise-bg py-20 px-6" style={{ background: "var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--terracotta)" }}>
              What&rsquo;s inside
            </p>
            <h2
              className="text-3xl md:text-4xl mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Five products. One mission.
            </h2>
            <p className="text-base max-w-lg mx-auto" style={{ color: "var(--ink-muted)" }}>
              Each product handles a different part of your marketing so you can focus on running your business.
            </p>
          </div>

          <div className="space-y-6">
            {PRODUCTS.map((product, idx) => (
              <div
                key={product.id}
                className="hover-lift rounded-2xl overflow-hidden"
                style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
              >
                <div className="md:flex">
                  {/* Left accent strip */}
                  <div
                    className="hidden md:block w-1.5 shrink-0"
                    style={{ background: product.accent }}
                  />

                  {/* Content */}
                  <div className="flex-1 p-8 md:p-10">
                    <div className="md:flex md:items-start md:justify-between md:gap-8">
                      <div className="flex-1 mb-6 md:mb-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className="text-xs font-medium px-2.5 py-1 rounded-full"
                            style={{ background: "var(--sage-light)", color: "var(--sage)" }}
                          >
                            {product.tag}
                          </span>
                          <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
                            #{String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3
                          className="text-xl md:text-2xl mb-3"
                          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                        >
                          {product.name}
                        </h3>
                        <p className="text-sm leading-relaxed max-w-lg" style={{ color: "var(--ink-light)" }}>
                          {product.description}
                        </p>
                      </div>

                      {/* Right side: includes + price */}
                      <div className="shrink-0 md:w-72">
                        <ul className="space-y-2 mb-6">
                          {product.includes.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--ink-light)" }}>
                              <CheckMark />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                          <span className="text-2xl font-medium" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                            ${product.price}
                          </span>
                          <a
                            href={process.env[product.envKey] || lemonBase}
                            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition hover:opacity-90"
                            style={{ background: "var(--ink)", color: "var(--warm-white)" }}
                          >
                            Buy now
                            <ArrowIcon />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ BUNDLE ════════ */}
      <section id="bundle" className="py-20 px-6" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--terracotta)" }}>
            Best value
          </p>
          <h2
            className="text-3xl md:text-4xl mb-3"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Get everything.
          </h2>
          <p className="text-base mb-10" style={{ color: "var(--ink-muted)" }}>
            All 5 products for one niche of your choice. Save 30%.
          </p>

          <div
            className="rounded-3xl p-8 md:p-12 text-left"
            style={{ background: "var(--cream)", border: "1.5px solid var(--sand-dark)" }}
          >
            <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
              <div>
                <h3
                  className="text-2xl md:text-3xl mb-1"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                >
                  Complete NicheKit Bundle
                </h3>
                <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
                  One niche. Everything you need.
                </p>
              </div>
              <div className="text-right">
                <span className="block text-3xl font-medium" style={{ fontFamily: "var(--font-display)", color: "var(--terracotta)" }}>
                  ${BUNDLE_PRICE}
                </span>
                <span className="text-sm line-through" style={{ color: "var(--ink-muted)" }}>
                  ${BUNDLE_ORIGINAL}
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--ink-light)" }}>
                  <CheckMark />
                  <span>{p.name}</span>
                </div>
              ))}
              <div className="flex items-start gap-2.5 text-sm font-medium" style={{ color: "var(--terracotta)" }}>
                <CheckMark />
                <span>Lifetime access + future updates</span>
              </div>
            </div>

            <div className="text-center">
              <a
                href={process.env.NEXT_PUBLIC_LEMON_BUNDLE || lemonBase}
                className="inline-flex items-center px-10 py-4 rounded-full text-base font-medium transition hover:opacity-90"
                style={{ background: "var(--terracotta)", color: "white" }}
              >
                Get the Complete Bundle — ${BUNDLE_PRICE}
                <ArrowIcon />
              </a>
              <p className="text-xs mt-4" style={{ color: "var(--ink-muted)" }}>
                One-time payment &middot; Instant download &middot; Choose your niche at checkout
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ HOW IT WORKS ════════ */}
      <section className="py-20 px-6" style={{ background: "var(--cream)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              Three steps. Done.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                num: "01",
                title: "Pick your niche",
                desc: "Choose from 6 industries. Every word is customized to your market.",
              },
              {
                num: "02",
                title: "Download instantly",
                desc: "CSV, PDF, and HTML files — open in Google Sheets, any browser, or email tool.",
              },
              {
                num: "03",
                title: "Customize & launch",
                desc: "Fill in your details, schedule your content, and start marketing like a pro.",
              },
            ].map((step) => (
              <div key={step.num}>
                <span
                  className="block text-5xl font-medium mb-4"
                  style={{ fontFamily: "var(--font-display)", color: "var(--sand-dark)" }}
                >
                  {step.num}
                </span>
                <h3 className="text-lg font-medium mb-2" style={{ color: "var(--ink)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-light)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="py-20 px-6" style={{ background: "var(--warm-white)" }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl text-center mb-14"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Common questions
          </h2>
          <div className="space-y-0">
            {[
              {
                q: "What format are the files?",
                a: "Social media calendars are CSV (opens in Excel or Google Sheets). Email templates are HTML. Guides and documents are PDF. No special software needed.",
              },
              {
                q: "Can I use these for my clients?",
                a: "Yes. You have a personal and business use license. Customize them for your clients freely. The only restriction is reselling the original files as-is.",
              },
              {
                q: "Is this a subscription?",
                a: "No. One-time purchase, lifetime access. You also get any future updates to your purchased products at no extra cost.",
              },
              {
                q: "What if it's not right for me?",
                a: "We offer a 30-day money-back guarantee. If the quality isn't what you expected, email us for a full refund — no questions asked.",
              },
              {
                q: "My niche isn't listed yet.",
                a: "We're adding new niches regularly. Email us your request and we'll prioritize the most popular ones.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="py-6"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <h3 className="text-base font-medium mb-2" style={{ color: "var(--ink)" }}>
                  {faq.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-light)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ EMAIL CAPTURE ════════ */}
      <section className="py-16 px-6" style={{ background: "var(--cream)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Not ready to buy?
          </h2>
          <p className="text-sm mb-6" style={{ color: "var(--ink-muted)" }}>
            Get 3 free social media post templates for your niche. No spam, unsubscribe anytime.
          </p>
          <EmailCapture />
        </div>
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section
        className="noise-bg py-24 px-6 text-center"
        style={{ background: "var(--ink)" }}
      >
        <h2
          className="text-3xl md:text-4xl mb-4"
          style={{ fontFamily: "var(--font-display)", color: "var(--warm-white)" }}
        >
          Stop building from scratch.
        </h2>
        <p className="text-base mb-10 max-w-md mx-auto" style={{ color: "var(--sand)" }}>
          Professional templates, written for your niche, ready to use today.
        </p>
        <a
          href="#bundle"
          className="inline-flex items-center px-10 py-4 rounded-full text-base font-medium transition hover:opacity-90"
          style={{ background: "var(--terracotta)", color: "white" }}
        >
          Get the Complete Bundle — ${BUNDLE_PRICE}
          <ArrowIcon />
        </a>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer className="py-10 px-6" style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--ink-muted)" }}>
          <span style={{ fontFamily: "var(--font-display)", color: "var(--ink-light)" }}>NicheKit</span>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-[var(--ink)] transition">Terms</Link>
            <Link href="/privacy" className="hover:text-[var(--ink)] transition">Privacy</Link>
            <a href="mailto:support@nichekit.co" className="hover:text-[var(--ink)] transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
