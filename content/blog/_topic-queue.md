# Blog Topic Queue

Pre-researched topics ready to become full posts. One per day = 30+ posts/month.

## How to Use
1. Pick a topic from this queue
2. Use the AI prompt template at the bottom
3. Save as `content/blog/{slug}.md`
4. Run `npm run build` and deploy
5. Hit `/api/seo-ping` with your CRON_SECRET to notify search engines

## High-Priority Topics (Target: 2-5 per week)

### Australian E-Commerce Fundamentals
- [ ] `abn-for-online-business-australia` — "Do I Need an ABN for My Online Business in Australia?"
- [ ] `sole-trader-vs-company-australia` — "Sole Trader vs Company for Online Store Owners"
- [ ] `business-insurance-online-store-australia` — "Do You Need Business Insurance for an Online Store?"
- [ ] `privacy-act-ecommerce-australia` — "Australian Privacy Act Compliance for Online Stores"
- [ ] `australian-consumer-law-ecommerce` — "Australian Consumer Law: What Online Store Owners Must Know"

### Shipping & Logistics
- [ ] `australia-post-vs-sendle-vs-aramex` — "Australia Post vs Sendle vs Aramex: Best Shipping for Aussie Stores"
- [ ] `international-shipping-from-australia` — "International Shipping from Australia: Costs, Carriers, Strategy"
- [ ] `returns-policy-template-australia` — "Returns Policy Template (Australian Consumer Law Compliant)"
- [ ] `dropshipping-suppliers-australia` — "Best Dropshipping Suppliers for Australian Stores in 2026"

### Marketing & Growth
- [ ] `instagram-for-ecommerce-australia` — "Instagram Marketing for Australian Online Stores"
- [ ] `tiktok-ecommerce-australia` — "Selling on TikTok as an Australian Business"
- [ ] `email-marketing-automation-australia` — "Email Marketing Automation: The Australian Guide"
- [ ] `content-marketing-strategy-2026` — "Content Marketing Strategy for Small Australian Stores in 2026"
- [ ] `google-ads-for-ecommerce-australia` — "Google Ads for Australian Online Stores (Without Wasting Money)"
- [ ] `meta-ads-australia-small-business` — "Meta Ads for Australian Small Businesses: Complete 2026 Guide"

### Tech & Tools
- [ ] `nextjs-vs-shopify-ecommerce` — "Next.js vs Shopify: Building a Custom E-Commerce Store"
- [ ] `supabase-for-ecommerce` — "Why Supabase Is the Best Database for Your E-Commerce Store"
- [ ] `vercel-for-ecommerce-hosting` — "Vercel for E-Commerce: Free Hosting for Your Online Store"
- [ ] `claude-vs-chatgpt-for-business` — "Claude vs ChatGPT for Small Business Owners in 2026"
- [ ] `free-ecommerce-tools-2026` — "15 Free Tools Every Australian Online Store Should Use"

### Niche Guides
- [ ] `how-to-sell-handmade-products-australia` — "How to Sell Handmade Products Online in Australia"
- [ ] `print-on-demand-australia` — "Print-on-Demand in Australia: Printful, Printify, or Local?"
- [ ] `how-to-sell-digital-products-australia` — "How to Sell Digital Products in Australia (Gumroad vs LemonSqueezy vs Own Store)"
- [ ] `how-to-sell-courses-online-australia` — "Selling Online Courses in Australia: Platforms, Tax, Setup"
- [ ] `how-to-sell-services-online` — "How to Sell Services Online (From Consulting to Coaching)"

### Growth Strategies
- [ ] `ecommerce-conversion-rate-optimization` — "E-Commerce Conversion Rate Optimisation for Small Stores"
- [ ] `abandoned-cart-recovery-strategy` — "Abandoned Cart Recovery: The Emails That Actually Work"
- [ ] `how-to-get-google-reviews` — "How to Actually Get Google Reviews (Without Begging)"
- [ ] `influencer-marketing-australia-small-business` — "Influencer Marketing for Aussie Small Businesses (Under $500 Budget)"
- [ ] `building-email-list-ecommerce` — "Building an Email List from Zero: The 2026 Playbook"

### Comparison Posts (High-Intent)
- [ ] `squarespace-vs-shopify-australia` — "Squarespace vs Shopify for Australian Businesses"
- [ ] `wix-vs-shopify-australia` — "Wix vs Shopify for Australian Online Stores"
- [ ] `gumroad-vs-lemonsqueezy` — "Gumroad vs LemonSqueezy: Which Is Better in 2026?"
- [ ] `mailchimp-vs-klaviyo-australia` — "Mailchimp vs Klaviyo for Australian Stores"
- [ ] `xero-vs-quickbooks-small-business` — "Xero vs QuickBooks for Australian Small Businesses"

## AI Prompt Template for New Posts

```
Write a blog post for NicheKit titled: "[TITLE]"

Requirements:
- 1500-2500 words
- Australian focus (AUD pricing, Australian regulations, local context)
- Conversational tone — like explaining to a mate, not a corporate guide
- Include at least 2 comparison tables
- Include a clear TL;DR or summary section
- End with a soft CTA to /signup or a related course
- Use proper markdown (# H1, ## H2, ### H3, **bold**, *italic*, `code`, [links](url))
- Include 4-6 H2 sections
- Include at least one numbered list and one bullet list
- Mention real prices in AUD where relevant
- Mention real Australian alternatives (don't just push American options)

Frontmatter required:
---
title: [TITLE]
description: [150-160 char meta description]
date: [YYYY-MM-DD]
readTime: [X min]
tag: [Category]
keywords: [comma-separated, real-search-terms, australian-focused]
---

Target keyword: [KEYWORD]
Related NicheKit courses to mention: [Build E-Commerce / AI SEO / Email Marketing / Social Media / Zero to First Sale]
```

## Publishing Checklist

Before deploying each new post:
- [ ] Frontmatter complete (title, description, date, readTime, tag, keywords)
- [ ] Meta description under 160 characters
- [ ] Title under 60 characters
- [ ] At least 3 internal links to related posts or courses
- [ ] 2+ comparison tables
- [ ] Australian examples throughout
- [ ] No generic "AI slop" phrases ("In today's digital landscape", etc.)
- [ ] Read it out loud — sounds human?

## SEO Ping After Each Post

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://nichekit.vercel.app/api/seo-ping
```

This pings IndexNow (Bing + Yandex), Google, and Bing sitemap so they re-crawl within minutes.
