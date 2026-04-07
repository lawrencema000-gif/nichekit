# NicheKit — Complete Automated Business Plan

## Current State Assessment: 20% Complete

### What We Have
- ✅ 30 digital products generated (5 types × 6 niches) + 6 bundle ZIPs
- ✅ Beautiful storefront deployed on Vercel (nichekit.vercel.app)
- ✅ Terms, Privacy pages
- ✅ GitHub repo (lawrencema000-gif/nichekit)
- ✅ Product generation script (regenerate anytime)

### What's Missing (the other 80%)
- ❌ Payment integration (LemonSqueezy not configured — buy buttons go nowhere)
- ❌ File delivery system (customers can't download after purchase)
- ❌ Email system (no order confirmations, no marketing emails)
- ❌ SEO (no schema markup, no blog, no backlinks)
- ❌ Marketing funnel (no traffic sources, no lead capture)
- ❌ Analytics (can't measure anything)
- ❌ Customer acquisition strategy (nobody knows we exist)

---

## THE PLAN — 10 Phases

Each phase builds on the previous. Nothing is skipped. Every detail is covered.

---

## PHASE 1: PAYMENT & DELIVERY (Critical Path)
**Goal:** Customers can buy and receive products.

### 1.1 LemonSqueezy Setup
- [ ] Create LemonSqueezy account at app.lemonsqueezy.com
- [ ] Set up store: name "NicheKit", dark theme
- [ ] Create 6 products (one per niche), each with 5 variants:
  - Social Media Calendar — $12
  - Email Swipe File — $15
  - Business Document Kit — $19
  - SEO Starter Toolkit — $12
  - Client Acquisition Playbook — $15
- [ ] Create 6 bundle products (one per niche) — $39 each
- [ ] Upload the corresponding ZIP files from `products/` to each product
- [ ] Enable instant download delivery
- [ ] Set 30-day refund policy in LemonSqueezy settings
- [ ] Copy checkout URLs for each product

### 1.2 Stripe Connect (via LemonSqueezy)
- [ ] Connect Stripe account in LemonSqueezy settings
- [ ] LemonSqueezy handles all payment processing, taxes, and compliance
- [ ] No additional Stripe setup needed — LemonSqueezy is the merchant of record

### 1.3 Environment Variables
- [ ] Set on Vercel:
  - `NEXT_PUBLIC_LEMON_STORE_URL` = LemonSqueezy store URL
  - `LEMON_SQUEEZY_API_KEY` = API key from LemonSqueezy
  - `LEMON_SQUEEZY_WEBHOOK_SECRET` = Webhook signing secret
  - `RESEND_API_KEY` = (from existing Resend account)

### 1.4 Webhook Handler
- [ ] Create `/api/webhooks/lemonsqueezy/route.ts`:
  - Verify webhook signature
  - On `order_created`: log order, trigger confirmation email
  - On `order_refunded`: log refund
  - Store orders in a simple JSON file or Supabase (optional)

### 1.5 Update Storefront
- [ ] Replace "#" links with actual LemonSqueezy checkout URLs
- [ ] Add niche selector to each product card (dropdown or separate pages)
- [ ] Deploy updated site

### 1.6 Verification
- [ ] Test purchase with LemonSqueezy test mode
- [ ] Verify file download works
- [ ] Verify email confirmation sends
- [ ] Test refund flow

**Skills to use:** `pricing-strategy`, `form-cro`, `page-cro`

---

## PHASE 2: EMAIL SYSTEM
**Goal:** Automated emails for orders, marketing, and lifecycle.

### 2.1 Transactional Emails (via Resend)
- [ ] Create email templates:
  - **Order confirmation** — "Your NicheKit is ready! Download links inside"
  - **Download reminder** (Day 3) — "Don't forget to download your templates"
  - **Review request** (Day 7) — "How's NicheKit working for you?"
  - **Refund confirmation** — "Your refund has been processed"

### 2.2 Marketing Email Capture
- [ ] Add email capture to landing page (above footer): "Get 3 free social media post templates"
- [ ] Create lead magnet: 3 free sample posts (one per niche, no sign-up wall — just email)
- [ ] Store emails in LemonSqueezy email list OR Resend audience
- [ ] Create welcome email sequence:
  - Day 0: Deliver free templates + introduce NicheKit
  - Day 2: "The #1 mistake small businesses make on social media" (value content)
  - Day 4: "How [niche] businesses save 10+ hours/week with templates" (social proof)
  - Day 7: "Your templates are waiting — $39 for everything" (soft sell)
  - Day 14: "Last chance: 20% off this week only" (urgency — only if not purchased)

### 2.3 Post-Purchase Sequence
- [ ] Day 0: Order confirmation + download + how-to-use guide
- [ ] Day 3: "Have you customized your first template yet?" + quick-start tip
- [ ] Day 7: "How's it going? Reply with any questions"
- [ ] Day 14: Review request (link to LemonSqueezy review or Google)
- [ ] Day 30: Upsell other niches — "Expanding to a new market?"

**Skills to use:** `email-sequence`, `copywriting`, `marketing-psychology`

---

## PHASE 3: SEO & ORGANIC TRAFFIC
**Goal:** Rank on Google for "business templates" and niche-specific keywords.

### 3.1 Technical SEO
- [ ] Add JSON-LD schema markup to homepage:
  - `Organization` schema
  - `Product` schema for each product (with price, availability)
  - `FAQPage` schema for FAQ section
  - `BreadcrumbList` schema
- [ ] Add `robots.txt` and `sitemap.xml` (auto-generate)
- [ ] Add canonical URLs
- [ ] Ensure all pages have unique title/description meta tags
- [ ] Add Open Graph images (generate with `@vercel/og`)

### 3.2 Niche Landing Pages (Programmatic SEO)
- [ ] Create `/for/[niche]/page.tsx` — dynamic page per niche:
  - "Social Media Templates for Dentists"
  - "Email Templates for Restaurants"
  - "SEO Toolkit for Real Estate Agents"
  - etc.
- [ ] Each page:
  - Custom H1 with niche name
  - Sample content preview (3-5 posts from the calendar)
  - Pain points addressed
  - Product features specific to that niche
  - CTA to buy
- [ ] This creates 6 × 5 = 30 indexable pages targeting long-tail keywords
- [ ] Internal linking between niche pages and homepage

### 3.3 Blog
- [ ] Create `/blog/[slug]/page.tsx`
- [ ] Initial articles (written by Content SEO Writer agent):
  - "How to Create a 90-Day Social Media Calendar for Your [Niche]"
  - "The Complete Email Marketing Guide for [Niche]"
  - "SEO for [Niche]: A Beginner's Guide"
  - "5 Documents Every [Niche] Needs Before Taking Clients"
  - "How to Get Your First 10 Clients as a [Niche]"
- [ ] Each article: 1500-2000 words, internal links to products, FAQ schema
- [ ] Publish 2 articles/week (automated via OpenClaw Content SEO Writer)

### 3.4 AI SEO (Getting Cited by ChatGPT/Perplexity)
- [ ] Structure content to be LLM-friendly:
  - Clear Q&A format in blog posts
  - Definitive statements ("The best social media calendar for dentists includes...")
  - Comparison tables
  - Data-backed claims
- [ ] Submit sitemap to Google, Bing, and Yandex

**Skills to use:** `seo-audit`, `ai-seo`, `programmatic-seo`, `schema-markup`, `site-architecture`, `content-strategy`

**OpenClaw agents:** SEO Orchestrator (strategy), Content SEO Writer (articles), Technical SEO Auditor (validation)

---

## PHASE 4: LANDING PAGE OPTIMIZATION
**Goal:** Maximize conversion rate on every page.

### 4.1 Homepage CRO
- [ ] Add product preview/sample section:
  - Show 3-5 actual posts from the calendar CSV
  - Show 1 email template screenshot
  - Show 1 page of the SEO guide
  - "See what you're getting before you buy"
- [ ] Add social proof section:
  - "Used by X+ small businesses" (once we have data)
  - Star ratings from LemonSqueezy reviews
  - Testimonial quotes
- [ ] Add trust badges:
  - "30-day money-back guarantee"
  - "Instant download"
  - "No subscription"
  - LemonSqueezy secure checkout badge
- [ ] Add comparison table: "NicheKit vs. Hiring a Marketing Agency vs. DIY"
- [ ] Add countdown timer for limited-time bundle discount (optional)

### 4.2 Checkout Optimization
- [ ] Pre-fill niche selection from landing page click
- [ ] LemonSqueezy checkout overlay (instead of redirect) for fewer drop-offs
- [ ] Add order bump: "Add another niche for just $19" (bundle discount)

### 4.3 Mobile Optimization
- [ ] Verify all pages render perfectly on mobile
- [ ] Ensure CTA buttons are thumb-friendly
- [ ] Test checkout flow on mobile

**Skills to use:** `page-cro`, `form-cro`, `signup-flow-cro`, `marketing-psychology`, `ab-test-setup`

---

## PHASE 5: MARKETING CHANNELS
**Goal:** Drive traffic from multiple sources.

### 5.1 Social Media (Automated via OpenClaw)
- [ ] Create accounts: X/Twitter, Instagram, TikTok, LinkedIn
- [ ] Content strategy:
  - **Twitter/X:** 2 posts/day — tips, stats, mini-threads about each niche
  - **Instagram:** 1 post/day — product previews, testimonials, carousels
  - **TikTok:** 3 videos/week — "I created 90 days of posts for a dentist in 5 seconds"
  - **LinkedIn:** 3 posts/week — B2B angle, "stop wasting time on marketing"
- [ ] Use OpenClaw Content SEO Writer + social-content skill to generate
- [ ] Schedule via Late API (already connected from PostPilot)
- [ ] Track engagement and iterate

### 5.2 Reddit & Communities
- [ ] Identify subreddits: r/smallbusiness, r/Entrepreneur, r/marketing, r/socialmedia, niche-specific subs
- [ ] Strategy: provide genuine value first, link to NicheKit naturally
- [ ] Create "free resource" posts sharing tips from the playbooks
- [ ] OpenClaw Content SEO Writer generates Reddit-appropriate content

### 5.3 Product Hunt Launch
- [ ] Prepare Product Hunt listing:
  - Tagline: "90 days of marketing templates for your niche — $39"
  - Screenshots of all products
  - Maker story
  - Special launch discount (20% off for first 48 hours)
- [ ] Schedule launch for a Tuesday (best day for Product Hunt)
- [ ] Prepare "coming soon" page and email blast

### 5.4 Gumroad / Etsy / Creative Market Cross-Listing
- [ ] List products on Gumroad (additional distribution, no extra work)
- [ ] List on Etsy (digital downloads category — huge audience for templates)
- [ ] List on Creative Market (if accepted — more premium audience)
- [ ] All link back to NicheKit.co for brand building

### 5.5 Cold Outreach (Automated via OpenClaw Sales Agent)
- [ ] Target: marketing agencies, freelancers, business coaches who serve our niches
- [ ] Pitch: "Use NicheKit templates for your clients — save 20+ hours per client"
- [ ] OpenClaw VelocityAI Sales Agent handles:
  - Finding prospects (LinkedIn, Google Maps)
  - Writing personalized cold emails
  - Follow-up sequences
  - Objection handling
- [ ] Offer affiliate/white-label deal for bulk buyers

### 5.6 Paid Ads (Phase 2 — after organic validates)
- [ ] Google Ads: Target "social media templates for [niche]" keywords
- [ ] Meta Ads: Retarget website visitors
- [ ] Budget: Start at $10-20/day, scale what works
- [ ] Only start after organic revenue proves product-market fit

**Skills to use:** `social-content`, `cold-email`, `launch-strategy`, `marketing-ideas`, `paid-ads`, `ad-creative`, `referral-program`

**OpenClaw agents:** Content SEO Writer (content), VelocityAI Sales Agent (outreach), SEO Orchestrator (strategy)

---

## PHASE 6: ANALYTICS & OPTIMIZATION
**Goal:** Measure everything, optimize what works.

### 6.1 Analytics Setup
- [ ] Vercel Analytics (built-in, free on Hobby plan)
- [ ] Add PostHog or Plausible for detailed event tracking:
  - Page views per product/niche
  - CTA click tracking (which buttons convert)
  - Scroll depth on landing page
  - Time on page
- [ ] LemonSqueezy dashboard for revenue tracking
- [ ] UTM parameter tracking on all links

### 6.2 Key Metrics to Track
- **Traffic:** Unique visitors/day, traffic sources
- **Conversion:** Visitor → checkout click → purchase (funnel)
- **Revenue:** Daily/weekly/monthly revenue, AOV, products sold by niche
- **Email:** Open rate, click rate, unsubscribe rate
- **SEO:** Rankings for target keywords, organic traffic growth
- **Social:** Followers, engagement rate, traffic from social

### 6.3 A/B Testing
- [ ] Test headline variations on homepage
- [ ] Test pricing display ($39 vs $39/one-time vs $0.43/day)
- [ ] Test CTA button text ("Get the Bundle" vs "Download Now" vs "Start Marketing Today")
- [ ] Test product order on page
- [ ] Test with/without countdown timer

**Skills to use:** `analytics-tracking`, `ab-test-setup`, `revops`

---

## PHASE 7: PRODUCT EXPANSION
**Goal:** More niches, more products, more revenue.

### 7.1 Add 6 More Niches
- [ ] Chiropractors, Plumbers, Accountants, Auto Repair, Medical Clinics, Lawyers
- [ ] Already have niche data in PostPilot's content-templates.ts — port it to NicheKit
- [ ] Run product generation script with expanded niche-data.ts
- [ ] Create new niche landing pages
- [ ] Announce to email list

### 7.2 New Product Types
- [ ] **Canva Social Media Graphics Pack** ($19) — 30 editable Canva templates per niche
  - Requires Canva API or manual creation
  - Share as Canva template links (no file download needed)
- [ ] **Video Script Pack** ($15) — 30 TikTok/Reels scripts per niche
  - Pure text, easy to generate
- [ ] **Google Business Profile Optimization Guide** ($9) — Step-by-step PDF
- [ ] **Client Onboarding Packet** ($12) — Welcome email + intake form + expectations doc
- [ ] **Annual Marketing Calendar** ($19) — 12-month strategy with campaigns per season

### 7.3 Subscription Product (Optional Future)
- [ ] "NicheKit Pro" — $9/month
  - Fresh 30-day calendar every month (no repeats)
  - Monthly email templates for seasonal campaigns
  - Quarterly SEO keyword refresh
  - Priority support
- [ ] Only build this if one-time sales validate demand

**Skills to use:** `pricing-strategy`, `content-strategy`, `copywriting`

---

## PHASE 8: AUTOMATION & ZERO-TOUCH OPERATIONS
**Goal:** Business runs with zero daily human involvement.

### 8.1 Content Automation (OpenClaw)
- **SEO Orchestrator:** Monthly SEO audit → generates content briefs
- **Content SEO Writer:** Writes 2 blog posts/week from briefs
- **Technical SEO Auditor:** Weekly site health check
- PC-Agent coordinates, commits, and deploys

### 8.2 Social Media Automation
- Content SEO Writer generates posts → Late API publishes to X, IG, TikTok, LinkedIn
- Schedule via cron or n8n workflow
- OpenClaw monitors engagement, adjusts strategy monthly

### 8.3 Sales Automation (OpenClaw)
- VelocityAI Sales Agent runs cold outreach campaigns
- Prospects from LinkedIn/Google Maps → personalized email → follow-up sequence
- All handled by n8n workflows triggering OpenClaw agents

### 8.4 Email Automation
- LemonSqueezy handles: order confirmation, download delivery
- Resend handles: welcome sequence, nurture sequence, review requests
- All email flows are automated — no manual sending

### 8.5 Product Refresh (Quarterly)
- Run `npx tsx scripts/generate-products.ts` to regenerate with updated content
- Script uses `currentYear()` and `currentMonthYear()` for freshness
- Upload new ZIPs to LemonSqueezy (can be automated via their API)

### 8.6 Monitoring
- Vercel: uptime monitoring (auto-alerts on downtime)
- LemonSqueezy: revenue dashboard (check weekly)
- PostHog: traffic and conversion dashboard
- Total time investment: **< 1 hour/week** reviewing dashboards

**OpenClaw automation flow:**
```
n8n cron (daily) → trigger OpenClaw agents:
  - Content SEO Writer → new social posts → Late API → published
  - SEO Orchestrator → keyword tracking → content briefs
  - VelocityAI Sales Agent → prospect outreach → email sequences
  - Technical SEO Auditor → weekly health check → alerts on issues
```

---

## PHASE 9: LEGAL & COMPLIANCE
**Goal:** Protect the business legally.

### 9.1 Business Entity
- [ ] Register LLC or sole proprietorship (for tax and liability)
- [ ] Get EIN (if US-based) or equivalent
- [ ] Open business bank account
- [ ] Connect bank to LemonSqueezy for payouts

### 9.2 Tax Compliance
- [ ] LemonSqueezy handles sales tax collection (they're merchant of record)
- [ ] Track revenue for income tax purposes
- [ ] Set aside 25-30% of revenue for taxes

### 9.3 Legal Pages (Update)
- [ ] Expand Privacy Policy:
  - GDPR compliance section (EU customers)
  - CCPA compliance section (California customers)
  - Cookie policy
  - Data retention periods
- [ ] Expand Terms of Service:
  - Detailed license terms (personal use, client use, no resale)
  - Intellectual property clause
  - Limitation of liability
  - Dispute resolution
- [ ] Add disclaimer to document kit: "Not a substitute for legal advice"

### 9.4 Domain & Brand
- [ ] Buy nichekit.co domain
- [ ] Point to Vercel
- [ ] Update canonical URLs
- [ ] Set up support@nichekit.co email
- [ ] Trademark search (optional but recommended)

---

## PHASE 10: SCALE & OPTIMIZE
**Goal:** Maximize revenue per visitor.

### 10.1 Upsell Funnel
- Post-purchase: "Add another niche for $19" (discounted from $39)
- Post-purchase: "Upgrade to ALL 12 niches for $99" (mega bundle)
- Email sequence: cross-sell other products 14 days after purchase

### 10.2 Affiliate Program
- [ ] Set up affiliate program in LemonSqueezy (built-in feature)
- [ ] Offer 30% commission per sale
- [ ] Recruit affiliates: marketing bloggers, business coaches, freelancers
- [ ] Provide affiliate assets: banners, email copy, social posts

### 10.3 Partnerships
- [ ] Partner with business coaches who serve our niches
- [ ] White-label option: "Powered by NicheKit" templates for agencies
- [ ] Bulk licensing for agencies serving multiple clients

### 10.4 Revenue Targets
| Month | Revenue Target | How |
|-------|---------------|-----|
| 1 | $100-300 | Friends, social, initial SEO |
| 2 | $300-500 | Blog traffic, Product Hunt, Etsy |
| 3 | $500-1000 | SEO ranking, email list, affiliates |
| 6 | $1000-2000 | Expanded niches, paid ads, partnerships |
| 12 | $2000-5000 | Full automation, 12+ niches, subscription product |

---

## EXECUTION PRIORITY

### Week 1 (Do First)
1. Phase 1: LemonSqueezy setup + payment integration
2. Phase 9.4: Buy domain, set up email
3. Phase 3.1: Schema markup + basic SEO

### Week 2
4. Phase 2: Email system + lead magnet
5. Phase 4.1: Landing page improvements (previews, social proof)
6. Phase 5.1: Social media accounts + first posts

### Week 3
7. Phase 3.2: Niche landing pages (programmatic SEO)
8. Phase 5.2: Reddit + community marketing
9. Phase 6.1: Analytics setup

### Week 4
10. Phase 3.3: Blog (first 5 articles via OpenClaw)
11. Phase 5.3: Product Hunt preparation
12. Phase 8: Full automation setup

### Month 2+
13. Phase 7: Product expansion (more niches)
14. Phase 10: Upsells, affiliates, partnerships
15. Phase 5.6: Paid ads (only after organic validates)

---

## TOOLS & SERVICES NEEDED

| Tool | Purpose | Cost |
|------|---------|------|
| LemonSqueezy | Payments, delivery, taxes | Free (5% + $0.50 per transaction) |
| Resend | Transactional + marketing email | Free tier (3,000 emails/month) |
| Vercel | Hosting | Free (Hobby plan) |
| Late (getlate.dev) | Social media scheduling | Free tier or existing plan |
| OpenClaw | AI agents for content, SEO, sales | Already set up |
| PostHog | Analytics | Free tier (1M events/month) |
| nichekit.co | Domain | ~$10-15/year |
| Canva | Graphics for social/products | Free tier |

**Total monthly cost: ~$0-10** (until paid ads start)

---

## CLAUDE CODE SKILLS TO USE

### Phase 1 (Payment): `pricing-strategy`, `form-cro`
### Phase 2 (Email): `email-sequence`, `copywriting`, `marketing-psychology`
### Phase 3 (SEO): `seo-audit`, `ai-seo`, `programmatic-seo`, `schema-markup`, `site-architecture`, `content-strategy`
### Phase 4 (CRO): `page-cro`, `form-cro`, `signup-flow-cro`, `marketing-psychology`, `ab-test-setup`
### Phase 5 (Marketing): `social-content`, `cold-email`, `launch-strategy`, `marketing-ideas`, `paid-ads`, `ad-creative`, `referral-program`, `competitor-alternatives`
### Phase 6 (Analytics): `analytics-tracking`, `ab-test-setup`, `revops`
### Phase 7 (Expansion): `pricing-strategy`, `content-strategy`, `copywriting`
### Phase 10 (Scale): `referral-program`, `churn-prevention`, `sales-enablement`

---

## GAP ANALYSIS: CURRENT vs. PLAN

| Area | Current State | Target State | Gap |
|------|--------------|--------------|-----|
| **Payment** | Buttons link to "#" | LemonSqueezy checkout live | 🔴 Critical |
| **Delivery** | ZIPs in /products/ folder | Auto-download after purchase | 🔴 Critical |
| **Email** | None | Full lifecycle automation | 🔴 Critical |
| **SEO** | Basic meta tags only | Schema, blog, 30+ pages | 🟠 Major |
| **Social** | No accounts | 4 platforms, daily posts | 🟠 Major |
| **Analytics** | None | Full funnel tracking | 🟠 Major |
| **Landing page** | Good but no previews/proof | Previews, testimonials, trust | 🟡 Medium |
| **Products** | 6 niches, 5 products | 12 niches, 8+ products | 🟡 Medium |
| **Automation** | None | OpenClaw runs everything | 🟡 Medium |
| **Legal** | Basic terms/privacy | Full compliance, LLC, domain | 🟡 Medium |
| **Marketing** | Zero traffic sources | SEO, social, email, affiliates | 🟠 Major |
| **Domain** | nichekit.vercel.app | nichekit.co | 🟡 Medium |
