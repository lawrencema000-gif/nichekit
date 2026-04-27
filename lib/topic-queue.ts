// Topic queue for automated daily blog content generation
// Each topic includes: slug, title, target keyword, brief context

export interface BlogTopic {
  slug: string;
  title: string;
  keyword: string;
  context: string;
  tag: string;
}

export const BLOG_TOPICS: BlogTopic[] = [
  // Compliance & Setup
  { slug: "abn-for-online-business-australia", title: "Do I Need an ABN for My Online Business in Australia?", keyword: "abn online business australia", context: "When you need an ABN, how to get one (free in 10 min via abr.gov.au), differences for sole traders vs companies, when to register for GST.", tag: "Compliance" },
  { slug: "sole-trader-vs-company-australia", title: "Sole Trader vs Company for Online Store Owners", keyword: "sole trader vs company australia", context: "Comparison of structures, when to switch from sole trader to PTY LTD, costs, tax implications, asset protection.", tag: "Compliance" },
  { slug: "business-insurance-online-store", title: "Do You Need Business Insurance for an Online Store?", keyword: "business insurance online store australia", context: "Public liability, product liability, professional indemnity. When to get it, typical Aussie insurer costs, what coverage you actually need.", tag: "Compliance" },
  { slug: "australian-consumer-law-ecommerce", title: "Australian Consumer Law: What Online Store Owners Must Know", keyword: "australian consumer law ecommerce", context: "ACL basics, consumer guarantees, refund obligations, false advertising, mandatory standards, common ACCC enforcement.", tag: "Compliance" },

  // Shipping
  { slug: "australia-post-vs-sendle-vs-aramex", title: "Australia Post vs Sendle vs Aramex: Best Shipping for Aussie Stores", keyword: "best shipping australia online store", context: "Real cost comparison for parcels of different weights, transit times, ease of integration, when to use each.", tag: "Shipping" },
  { slug: "international-shipping-from-australia", title: "International Shipping from Australia: Costs, Carriers, Strategy", keyword: "international shipping australia", context: "When to ship overseas vs not, customs/duties, dimensional weight, best carriers for different regions.", tag: "Shipping" },
  { slug: "dropshipping-suppliers-australia", title: "Best Dropshipping Suppliers for Australian Stores in 2026", keyword: "dropshipping suppliers australia", context: "Aussie suppliers (Wholesale Central, Pet Wholesale, etc.) vs Aliexpress vs Spocket. Real shipping times to AU customers.", tag: "Shipping" },

  // Marketing
  { slug: "instagram-for-ecommerce-australia", title: "Instagram Marketing for Australian Online Stores", keyword: "instagram marketing australia", context: "Reels, Stories, Shopping tags, hashtag strategy for AU audience, when to post (AEST), engagement vs reach.", tag: "Marketing" },
  { slug: "tiktok-ecommerce-australia", title: "Selling on TikTok as an Australian Business", keyword: "tiktok shop australia", context: "TikTok Shop AU rollout, organic content strategy, viral mechanics, building a brand voice, common Aussie creator patterns.", tag: "Marketing" },
  { slug: "google-ads-for-ecommerce-australia", title: "Google Ads for Australian Online Stores (Without Wasting Money)", keyword: "google ads australia ecommerce", context: "Search vs Performance Max vs Shopping campaigns, realistic AUD budgets, ROAS targets, common money-wasting mistakes.", tag: "Marketing" },
  { slug: "meta-ads-australia-small-business", title: "Meta Ads for Australian Small Businesses: Complete 2026 Guide", keyword: "facebook ads australia small business", context: "Pixel setup, targeting AU users, creative formats, cold vs warm audiences, scaling strategies, AUD budget guidance.", tag: "Marketing" },

  // Tech & Tools
  { slug: "nextjs-vs-shopify-ecommerce", title: "Next.js vs Shopify: Building a Custom E-Commerce Store", keyword: "nextjs vs shopify", context: "Code ownership, fees comparison, customisation, real costs at different scales, when each makes sense.", tag: "Tech" },
  { slug: "supabase-for-ecommerce", title: "Why Supabase Is the Best Database for Your E-Commerce Store", keyword: "supabase ecommerce", context: "Postgres+auth+storage in one, free tier limits, RLS for security, comparison vs Firebase/Airtable.", tag: "Tech" },
  { slug: "free-ecommerce-tools-2026", title: "15 Free Tools Every Australian Online Store Should Use", keyword: "free ecommerce tools australia", context: "Free tiers of Vercel, Supabase, Resend, Buffer, Canva, Google Analytics, etc. Real limits and when you outgrow them.", tag: "Tech" },

  // Niche Guides
  { slug: "how-to-sell-handmade-products-australia", title: "How to Sell Handmade Products Online in Australia", keyword: "sell handmade products australia", context: "Etsy AU vs own store, pricing handmade items, photography tips, packaging, market stalls, ABN/GST basics for makers.", tag: "Niche" },
  { slug: "print-on-demand-australia", title: "Print-on-Demand in Australia: Printful vs Printify vs Local", keyword: "print on demand australia", context: "Real shipping times to AU customers, product quality comparison, profit margins, integration with Stripe/Shopify.", tag: "Niche" },
  { slug: "how-to-sell-digital-products-australia", title: "How to Sell Digital Products in Australia", keyword: "sell digital products australia", context: "Gumroad vs LemonSqueezy vs own store, GST on digital goods, file delivery, license terms, pricing.", tag: "Niche" },
  { slug: "how-to-sell-courses-online-australia", title: "Selling Online Courses in Australia: Platforms, Tax, Setup", keyword: "sell online courses australia", context: "Teachable/Thinkific/Kajabi/own store comparison, GST implications, platform fees, marketing strategies.", tag: "Niche" },

  // Growth
  { slug: "ecommerce-conversion-rate-optimization", title: "E-Commerce Conversion Rate Optimisation for Small Stores", keyword: "ecommerce conversion rate optimization", context: "Realistic conversion rates by industry, cart abandonment, trust signals, CTAs, Australian-specific elements.", tag: "Growth" },
  { slug: "abandoned-cart-recovery-strategy", title: "Abandoned Cart Recovery: The Emails That Actually Work", keyword: "abandoned cart recovery", context: "3-email sequence with timings, real templates, Stripe webhook integration, expected recovery rates.", tag: "Growth" },
  { slug: "how-to-get-google-reviews", title: "How to Actually Get Google Reviews (Without Begging)", keyword: "how to get google reviews", context: "Direct review link, post-purchase email, in-person ask scripts, what to do with negative reviews.", tag: "Growth" },
  { slug: "building-email-list-ecommerce", title: "Building an Email List from Zero: The 2026 Playbook", keyword: "build email list ecommerce", context: "Lead magnets, popup vs inline forms, signup-to-buyer conversion, segmentation, Spam Act compliance.", tag: "Growth" },

  // Comparisons
  { slug: "squarespace-vs-shopify-australia", title: "Squarespace vs Shopify for Australian Businesses", keyword: "squarespace vs shopify australia", context: "Pricing in AUD, transaction fees, ease of use, scalability, Aussie payment integrations.", tag: "Comparison" },
  { slug: "wix-vs-shopify-australia", title: "Wix vs Shopify for Australian Online Stores", keyword: "wix vs shopify australia", context: "Pricing AUD, customisation, ecommerce features, when each is right.", tag: "Comparison" },
  { slug: "gumroad-vs-lemonsqueezy", title: "Gumroad vs LemonSqueezy: Which Is Better in 2026?", keyword: "gumroad vs lemonsqueezy", context: "Fees (10% vs 5%), tax handling, payouts, country support, design/UX, why creators are switching.", tag: "Comparison" },
  { slug: "mailchimp-vs-klaviyo-australia", title: "Mailchimp vs Klaviyo for Australian Stores", keyword: "mailchimp vs klaviyo", context: "Pricing in AUD, ecommerce features, automation power, deliverability, when to switch.", tag: "Comparison" },
  { slug: "xero-vs-quickbooks-small-business", title: "Xero vs QuickBooks for Australian Small Businesses", keyword: "xero vs quickbooks australia", context: "Both have AU support — Xero is local, QBO is global. Pricing, features, integrations, Aussie accountant preference.", tag: "Comparison" },
];

/**
 * Get the next topic that doesn't already have a published post.
 * publishedSlugs: array of existing blog slugs (from getAllPosts)
 */
export function getNextTopic(publishedSlugs: string[]): BlogTopic | null {
  return BLOG_TOPICS.find((t) => !publishedSlugs.includes(t.slug)) || null;
}
