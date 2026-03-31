import Link from "next/link";

const NICHES = [
  { key: "dentists", label: "Dental Practices", emoji: "🦷" },
  { key: "restaurants", label: "Restaurants", emoji: "🍽️" },
  { key: "real-estate", label: "Real Estate", emoji: "🏠" },
  { key: "gyms", label: "Gyms & Fitness", emoji: "💪" },
  { key: "salons", label: "Salons & Spas", emoji: "💇" },
  { key: "ecommerce", label: "E-Commerce", emoji: "🛒" },
];

const PRODUCTS = [
  {
    id: "calendar",
    name: "90-Day Social Media Calendar",
    price: 12,
    description: "90 days of ready-to-post content. Every post written, hashtags included, scheduling notes provided. Just customize and post.",
    includes: ["90 unique posts with full copy", "Platform-specific hashtags (3 rotating sets)", "Content type rotation (15 formats)", "Posting schedule with best times", "How-to guide PDF"],
    color: "from-violet-600 to-indigo-600",
  },
  {
    id: "email",
    name: "Email Marketing Swipe File",
    price: 15,
    description: "10 professional HTML email templates ready to copy into any email platform. Welcome sequences, promotions, re-engagement, and more.",
    includes: ["10 styled HTML email templates", "Welcome sequence (3 emails)", "Promotional & seasonal templates", "Review request & referral templates", "Newsletter template"],
    color: "from-indigo-600 to-blue-600",
  },
  {
    id: "documents",
    name: "Business Document Kit",
    price: 19,
    description: "Professional invoice, proposal, and contract templates customized for your niche. Look polished from day one.",
    includes: ["Invoice template (HTML, print-ready)", "Service proposal template (HTML)", "Client service agreement (PDF)", "All niche-customized", "Easy to edit and brand"],
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "seo",
    name: "SEO Starter Toolkit",
    price: 12,
    description: "Keyword research spreadsheet + step-by-step SEO action plan. Start ranking on Google without any technical background.",
    includes: ["10+ researched keywords with intent data", "Competition level analysis", "Content ideas for each keyword", "Google Business Profile checklist", "On-page SEO action plan (PDF)"],
    color: "from-cyan-600 to-teal-600",
  },
  {
    id: "acquisition",
    name: "Client Acquisition Playbook",
    price: 15,
    description: "Step-by-step guide to finding and closing new clients. Cold email scripts, objection handlers, referral systems, and follow-up frameworks.",
    includes: ["Cold outreach scripts (email + DM)", "Objection handling scripts", "Referral request templates", "Follow-up framework (Day 1-30)", "Pricing strategy guide"],
    color: "from-teal-600 to-emerald-600",
  },
];

const BUNDLE_PRICE = 39;
const BUNDLE_ORIGINAL = 73;

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function HomePage() {
  const lemonBase = process.env.NEXT_PUBLIC_LEMON_STORE_URL || "#";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-200">
      {/* Nav */}
      <nav className="border-b border-gray-800/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-white">
            Niche<span className="text-indigo-400">Kit</span>
          </span>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#products" className="hover:text-white transition">Products</a>
            <a href="#niches" className="hover:text-white transition">Niches</a>
            <a href="#bundle" className="hover:text-white transition">Bundle Deal</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-20 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            Ready-made business templates — download instantly
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            Stop creating everything
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              from scratch.
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Professional social media content, email templates, SEO toolkits, and business documents — all customized for your specific niche. Download once, use forever.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="#bundle" className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-lg hover:opacity-90 transition">
              Get the Bundle — ${BUNDLE_PRICE}
            </a>
            <a href="#products" className="px-8 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition">
              See All Products
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">One-time purchase. No subscription. No recurring fees.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-800/50 py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-white">6</div>
            <div className="text-sm text-gray-500">Niche-specific kits</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">30+</div>
            <div className="text-sm text-gray-500">Individual products</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">90</div>
            <div className="text-sm text-gray-500">Days of content per calendar</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">${BUNDLE_PRICE}</div>
            <div className="text-sm text-gray-500">For everything</div>
          </div>
        </div>
      </section>

      {/* Niches */}
      <section id="niches" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">Built for your niche</h2>
          <p className="text-gray-400 text-center mb-10">Every template is customized with industry-specific content, terminology, and strategies.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {NICHES.map((niche) => (
              <div key={niche.key} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center hover:border-indigo-500/30 transition">
                <div className="text-3xl mb-3">{niche.emoji}</div>
                <div className="font-semibold text-white">{niche.label}</div>
                <div className="text-sm text-gray-500 mt-1">All 5 products available</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">What you get</h2>
          <p className="text-gray-400 text-center mb-10">Each product is available individually or as part of the Complete Bundle.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="bg-[#12121f] border border-gray-800 rounded-2xl p-6 flex flex-col">
                <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${product.color} mb-4`} />
                <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-4 flex-1">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                  <span className="text-2xl font-bold text-white">${product.price}</span>
                  <a
                    href={lemonBase}
                    className={`px-5 py-2 bg-gradient-to-r ${product.color} text-white text-sm font-semibold rounded-lg hover:opacity-90 transition`}
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle */}
      <section id="bundle" className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-500/30 rounded-2xl p-8 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-4">
              BEST VALUE — Save 47%
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Complete NicheKit Bundle</h2>
            <p className="text-gray-400 mb-6">All 5 products in one download. Everything you need to market, sell, and run your business — for one niche of your choice.</p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-4xl font-bold text-white">${BUNDLE_PRICE}</span>
              <span className="text-lg text-gray-500 line-through">${BUNDLE_ORIGINAL}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-8 max-w-md mx-auto">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckIcon />
                  {p.name}
                </div>
              ))}
              <div className="flex items-center gap-2 text-sm text-indigo-300 font-medium">
                <CheckIcon />
                Lifetime access + updates
              </div>
            </div>
            <a
              href={lemonBase}
              className="inline-block px-10 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition"
            >
              Get the Complete Bundle — ${BUNDLE_PRICE}
            </a>
            <p className="text-sm text-gray-500 mt-4">One-time payment. Instant download. Choose your niche at checkout.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Pick your niche", desc: "Choose from 6 industries. Every template is pre-written with industry-specific content." },
              { step: "2", title: "Download instantly", desc: "Get your files immediately after purchase. CSVs, PDFs, and HTML files — ready to use." },
              { step: "3", title: "Customize & launch", desc: "Fill in your business details, schedule your content, and start marketing professionally." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold mx-auto mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              { q: "What format are the files?", a: "Social media calendars are CSV (opens in Excel/Google Sheets). Email templates are HTML. Guides and documents are PDF. Everything is ready to use immediately." },
              { q: "Can I use these for my clients?", a: "Yes! You have a personal/business use license. You can use the templates for your own business or customize them for your clients. You cannot resell the templates as-is." },
              { q: "Do I need any special software?", a: "Nope. CSVs open in Google Sheets or Excel. PDFs open in any browser. HTML files open in any email platform. No special tools required." },
              { q: "Is this a subscription?", a: "No. One-time purchase, lifetime access. You'll also get any future updates to your purchased products for free." },
              { q: "What if it's not right for me?", a: "We offer a 30-day money-back guarantee. If you're not happy with the quality, we'll refund you — no questions asked." },
              { q: "My niche isn't listed. Will you add more?", a: "We're adding new niches regularly. Email us with your request and we'll prioritize the most requested ones." },
            ].map((faq, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to stop winging it?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Get professional-quality templates for your niche. One-time purchase, instant download, use forever.</p>
        <a
          href="#bundle"
          className="inline-block px-10 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-lg text-lg hover:opacity-90 transition"
        >
          Get the Complete Bundle — ${BUNDLE_PRICE}
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <span>Niche<span className="text-indigo-400">Kit</span></span>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
            <a href="mailto:support@nichekit.co" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
