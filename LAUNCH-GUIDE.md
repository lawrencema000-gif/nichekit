# NicheKit Launch Guide

Everything that needs to happen for NicheKit to be a fully operational, revenue-generating business. Each step is independent — do them in any order.

---

## 1. Custom Domain (15 min)

### Buy the domain
Recommended: **nichekit.co** or **nichekit.com.au**.

Best registrars:
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) — at-cost pricing, ~$10 USD/year for .co
- [Porkbun](https://porkbun.com/) — cheap, decent UI
- For .com.au: [VentraIP](https://ventraip.com.au/) or [Crazy Domains](https://www.crazydomains.com.au/)

### Connect to Vercel

1. Vercel Dashboard → nichekit project → Settings → Domains
2. Add `nichekit.co` (or your domain)
3. Vercel shows DNS records you need to add at your registrar:
   - **A record** `@ → 76.76.21.21` (Vercel's IP)
   - **CNAME** `www → cname.vercel-dns.com`
4. SSL provisions automatically within 5-15 min

### Update env var
After domain is live:
```bash
vercel env rm NEXT_PUBLIC_SITE_URL production
echo -n "https://nichekit.co" | vercel env add NEXT_PUBLIC_SITE_URL production
vercel --prod --yes
```

---

## 2. LemonSqueezy Account (30 min — payments)

### Sign up
1. Go to [app.lemonsqueezy.com/register](https://app.lemonsqueezy.com/register)
2. Verify email
3. Create your store: name = "NicheKit"

### Connect payouts
1. Settings → Payouts → Add bank account (Stripe Connect under the hood)
2. Provide ABN if you have one (gets you AUD payouts directly)

### Create the 4 subscription products
| Product | Price | Type |
|---|---|---|
| NicheKit Starter | $29 AUD/mo | Subscription |
| NicheKit Pro | $79 AUD/mo | Subscription |
| NicheKit Lifetime | $297 AUD | One-time |
| NicheKit Bundle (Templates) | $67 AUD | One-time |

For each, copy the **buy URL** (e.g., `https://nichekit.lemonsqueezy.com/buy/abc-xyz`).

### Set up webhook
1. Settings → Webhooks → Add endpoint
2. URL: `https://nichekit.co/api/webhooks/lemonsqueezy` (or .vercel.app)
3. Events: select all `order_*`, `subscription_*`
4. Copy the signing secret

### Add env vars to Vercel
```bash
vercel env add NEXT_PUBLIC_LEMON_STORE_URL production  # https://nichekit.lemonsqueezy.com
vercel env add NEXT_PUBLIC_LEMON_STARTER production    # buy URL
vercel env add NEXT_PUBLIC_LEMON_PRO production        # buy URL
vercel env add NEXT_PUBLIC_LEMON_LIFETIME production   # buy URL
vercel env add NEXT_PUBLIC_LEMON_BUNDLE production     # buy URL
vercel env add NEXT_PUBLIC_LEMON_BILLING_URL production  # https://nichekit.lemonsqueezy.com/billing
vercel env add LEMON_SQUEEZY_WEBHOOK_SECRET production # webhook secret
vercel --prod --yes
```

---

## 3. Cal.com Booking (15 min — Pro consultations)

### Sign up
1. Go to [cal.com/signup](https://cal.com/signup)
2. Free plan is fine
3. Username: `nichekit` or your name

### Create a 30-min booking event
1. Event Types → New
2. Title: "NicheKit Pro Consultation (30 min)"
3. Duration: 30 min
4. Buffer: 5 min before/after
5. Availability: set your weekly slots
6. Description: brief summary of what's covered

### Add link to Vercel
```bash
echo -n "https://cal.com/nichekit/30min" | vercel env add NEXT_PUBLIC_CALENDLY_URL production
vercel --prod --yes
```

(Variable named `NEXT_PUBLIC_CALENDLY_URL` for legacy reasons — works for any booking provider URL.)

---

## 4. Resend Email (10 min)

### Sign up
1. [resend.com/signup](https://resend.com/signup) — free tier 3,000 emails/mo
2. Verify domain (or use `onboarding@resend.dev` for testing)
3. Get API key from dashboard

### Add to Vercel
```bash
vercel env add RESEND_API_KEY production
echo -n "NicheKit <hello@nichekit.co>" | vercel env add EMAIL_FROM production
vercel --prod --yes
```

### (Optional) Marketing audience
1. Resend → Audiences → Create "NicheKit Subscribers"
2. Copy audience ID
3. `vercel env add RESEND_AUDIENCE_ID production`

---

## 5. Google Search Console (20 min — critical)

### Verify ownership
1. [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://nichekit.co` (your domain)
3. Choose **HTML tag** verification method
4. Copy the `content` value of the meta tag (e.g., `abcdef123456`)

### Add to Vercel
```bash
echo -n "abcdef123456" | vercel env add GOOGLE_SITE_VERIFICATION production
vercel --prod --yes
```

### Verify and submit sitemap
1. Wait 2-3 min after deploy
2. Click "Verify" in Search Console
3. Once verified → Sitemaps → Add new sitemap → `sitemap.xml`
4. Submit

### Request indexing for key pages
1. URL inspection → enter homepage URL → Request indexing
2. Repeat for /pricing, /blog, top 3 blog posts
3. Google indexes within hours

---

## 6. Bing Webmaster Tools (10 min)

### Verify
1. [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site: import from Google Search Console (easiest) OR
3. Manual verify: copy the meta tag content
4. `vercel env add BING_SITE_VERIFICATION production`
5. Redeploy

### Submit sitemap
Sitemaps → Submit → `https://nichekit.co/sitemap.xml`

---

## 7. Daily Content Automation (10 min — fully autonomous)

### Get Anthropic API key
1. [console.anthropic.com](https://console.anthropic.com)
2. Create API key
3. Add credits ($5 covers ~50 blog posts)

### Get GitHub token
1. [github.com/settings/tokens](https://github.com/settings/tokens) → Fine-grained tokens
2. Repository access: `lawrencema000-gif/nichekit`
3. Permissions: Contents (Read & write)
4. Generate, copy

### Add to Vercel
```bash
vercel env add ANTHROPIC_API_KEY production
vercel env add GITHUB_TOKEN production
vercel --prod --yes
```

### Verify cron is scheduled
- vercel.json already includes: `/api/cron/generate-post` daily at 22:00 UTC (8am AEST)
- Vercel Dashboard → Crons should show it

### Test manually
```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://nichekit.co/api/cron/generate-post
```

Should return `{ success: true, published: "...", title: "..." }` and commit a new blog post to GitHub. Vercel auto-deploys it within 1-2 min.

After publish, the cron also fires `/api/seo-ping` to notify search engines.

---

## 8. Admin Account

Already done. Login:
- **Email:** Lawrence.ma000@gmail.com
- **Password:** Mmd208608!
- **Admin URL:** /admin

---

## 9. Marketing Channels (Ongoing)

### Social media accounts
Create accounts under "@NicheKit" or "@NicheKitAU":
- Instagram
- TikTok
- X/Twitter
- LinkedIn
- Facebook Page

### First-week launch checklist
- [ ] Post launch announcement on each platform
- [ ] Share in 3 Aussie business Facebook groups
- [ ] Post on Reddit (r/smallbusinessAU, r/Entrepreneur)
- [ ] Email anyone on your existing email list
- [ ] DM 20 people in your personal network

### Partnerships
- Reach out to 5 Aussie business podcasts for guest appearances
- Cross-promote with complementary AU brands (5-10 candidates)
- Consider sponsoring a small Aussie business newsletter

---

## 10. Analytics (5 min)

Vercel Analytics is auto-enabled. Beyond that:

### Plausible (privacy-friendly, $9 USD/mo)
or **PostHog** (free tier, 1M events/mo) — better for product analytics

Add the snippet to `app/layout.tsx` once chosen.

---

## Priority Order

If you want to launch as fast as possible:

1. **LemonSqueezy** (so you can take money)
2. **Resend** (so customers get receipts)
3. **Custom domain** (looks legitimate)
4. **Google Search Console** (start ranking)
5. **Daily automation** (set and forget)
6. **Cal.com** (only matters once you have Pro subscribers)
7. **Bing** (lower priority but free)
8. **Marketing** (ongoing)

Total time: **~2 hours** to fully launch.

---

## Existing Working Infrastructure

These are already done and verified:
- ✅ Hosted on Vercel: nichekit.vercel.app
- ✅ Supabase (auth + database) — pavduupwzebsdbvgqwsy
- ✅ Admin account: Lawrence.ma000@gmail.com
- ✅ 11 SEO-optimised blog posts published
- ✅ Sitemap, robots.txt, OG image, schema markup
- ✅ IndexNow auto-pinging (Bing/Yandex/Naver)
- ✅ Auto internal linking on blog posts
- ✅ Daily content cron (needs ANTHROPIC_API_KEY + GITHUB_TOKEN)
- ✅ Rate limiting, security headers, CSP
- ✅ Course content (33 modules, 5 courses)
- ✅ User dashboard with onboarding, progress tracking
- ✅ Template downloads (auth-gated)

Just add the env vars above and you're live.
