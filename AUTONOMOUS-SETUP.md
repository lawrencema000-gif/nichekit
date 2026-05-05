# NicheKit Autonomous System — Setup Guide

This is the complete guide to making NicheKit run itself.

## What's Already Built (Code-Side)

Every piece of the autonomous brain is shipped:

| System | What it does | Cron |
|--------|--------------|------|
| **Supervisor** | Heartbeat, orchestrator, self-healing, alerts | Daily (every 30 min on Vercel Pro $20/mo) |
| **Daily content** | Generates 1 SEO blog post via Claude | Daily 22:00 UTC |
| **Multi-channel publisher** | Posts new content to Twitter + LinkedIn | Triggered by supervisor |
| **Support bot** | Auto-replies to customer emails | Triggered by inbound |
| **SEO ping** | IndexNow → Bing/Yandex on each new post | After publish |
| **Credit reset** | Pro consultation credits monthly | 1st of each month |
| **Activity log** | Every action recorded to Supabase | Continuous |
| **Health alerts** | Email admin if supervisor detects issues | Auto |

The whole brain runs from **one supervisor cron** that wakes up every 30 minutes, checks system health, and triggers other agents on demand. If anything breaks, you get an email.

---

## What You Need to Do (One-Time Setup)

The system needs API tokens to act on your behalf. KYC laws mean you have to create the accounts yourself — no way around it. Once you do, everything is automatic forever.

### Required (for everything to work)

#### 1. Anthropic API key — funds AI generation
- Sign up at [console.anthropic.com](https://console.anthropic.com)
- Add billing/credits ($20 covers ~100 blog posts + ~5,000 support replies)
- Create API key → copy
- Add to Vercel:
  ```bash
  vercel env add ANTHROPIC_API_KEY production
  ```

> **Note on billing:** Anthropic API billing is separate from your Claude Code subscription. They share the same Anthropic account, but billing is on the API side. Add credits at console.anthropic.com.

#### 2. GitHub Personal Access Token — for auto-commits
- [github.com/settings/personal-access-tokens](https://github.com/settings/personal-access-tokens) → Fine-grained
- Repository: `lawrencema000-gif/nichekit`
- Permissions: **Contents: Read & write**
- Generate, copy
- ```bash
  vercel env add GITHUB_TOKEN production
  ```

#### 3. Resend API key — for emails
- [resend.com](https://resend.com) → API keys
- ```bash
  vercel env add RESEND_API_KEY production
  echo -n "NicheKit <hello@yourdomain.com>" | vercel env add EMAIL_FROM production
  ```

#### 4. Admin email (already set)
- `ADMIN_EMAIL=Lawrence.ma000@gmail.com` — receives all alerts and escalations

#### 5. Cron secret (already set)
- `CRON_SECRET` — protects all cron endpoints

---

### Optional: Social Media (auto-posting)

Both are free APIs with paid tiers. Free tiers fine for daily posting.

#### Twitter / X (free tier = 1,500 posts/month)

1. [developer.twitter.com](https://developer.twitter.com) → sign up, create a project + app
2. App → "User authentication settings" → set permissions: **Read and write**
3. Generate **OAuth 2.0 Bearer Token**
4. ```bash
   vercel env add TWITTER_BEARER_TOKEN production
   ```

> Note: Twitter API v2 free tier has restrictions. For real automation you may want Basic ($100 USD/mo) which allows 3,000 posts/month. For starting out, free is fine.

#### LinkedIn (free)

1. [linkedin.com/developers](https://www.linkedin.com/developers) → Create app
2. Add permissions: `w_member_social`
3. Generate access token (3 month expiry — needs renewal)
4. Get your Person URN: API call to `/v2/userinfo` returns your `sub` field. URN format: `urn:li:person:YOUR_SUB_ID`
5. ```bash
   vercel env add LINKEDIN_ACCESS_TOKEN production
   echo -n "urn:li:person:YOUR_SUB_ID" | vercel env add LINKEDIN_PERSON_URN production
   ```

If you skip these, the social publishing queue will accumulate but not post (jobs marked "failed" with clear error messages in admin dashboard).

---

### Optional: Inbound Email (auto-responder)

For the support bot to receive emails, you need an inbound email parser. Three options:

#### Option A: Resend Inbound (recommended, simplest)

1. Resend dashboard → Inbound → Set up
2. Domain: yourdomain.com (must be verified)
3. Webhook URL: `https://nichekit.vercel.app/api/inbound/support`
4. Select events: incoming emails to `support@yourdomain.com`
5. Copy webhook secret →
   ```bash
   vercel env add INBOUND_EMAIL_SECRET production
   ```

#### Option B: Postmark Inbound
- [postmarkapp.com](https://postmarkapp.com) — same setup, different provider

#### Option C: CloudMailin
- [cloudmailin.com](https://cloudmailin.com) — generic inbound parser

Without an inbound provider, customers email but nothing happens. With one set up, the support bot replies within minutes.

---

### Optional: Search Console verification

#### Google Search Console
1. [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → HTML tag verification
3. Copy the `content` value from the meta tag
4. ```bash
   vercel env add GOOGLE_SITE_VERIFICATION production
   ```
5. Redeploy, click "Verify"
6. Submit sitemap: `sitemap.xml`

#### Bing Webmaster Tools
1. [bing.com/webmasters](https://www.bing.com/webmasters)
2. Import from Google or manual verify
3. ```bash
   vercel env add BING_SITE_VERIFICATION production
   ```

---

## The Complete Env Var Checklist

After all setup, your Vercel project has these env vars:

```
# Core (already set)
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
ADMIN_EMAIL
CRON_SECRET

# AI generation (add)
ANTHROPIC_API_KEY
GITHUB_TOKEN

# Email (add)
RESEND_API_KEY
EMAIL_FROM

# LemonSqueezy (when you launch payments)
LEMON_SQUEEZY_WEBHOOK_SECRET
NEXT_PUBLIC_LEMON_*

# Social media (optional)
TWITTER_BEARER_TOKEN
LINKEDIN_ACCESS_TOKEN
LINKEDIN_PERSON_URN

# Inbound email (optional)
INBOUND_EMAIL_SECRET

# SEO (optional but recommended)
GOOGLE_SITE_VERIFICATION
BING_SITE_VERIFICATION
```

---

## How the System Runs Itself

Every 30 minutes, the supervisor:

1. **Checks site uptime** (HEAD request to homepage)
2. **Checks DB connection** (Supabase user_profiles count)
3. **Counts recent failures** across all agents (alerts if >5 in 4 hours)
4. **Looks for pending social posts** → fires `/api/cron/publish-social` if any
5. **Looks for pending support messages** → fires `/api/cron/support-bot` if any
6. **Logs everything** to `agent_activity` table
7. **Emails you** if anything is broken

Daily at 22:00 UTC, the content cron:

1. Picks next unpublished topic from `lib/topic-queue.ts`
2. Generates 1500-2500 word SEO blog post via Claude Sonnet
3. Commits to GitHub → Vercel auto-deploys
4. Queues social posts (Twitter + LinkedIn)
5. Pings IndexNow (Bing/Yandex/Naver/Seznam)
6. Within 30 min, supervisor picks up the queue → posts to socials

When a customer emails support@yourdomain.com:

1. Inbound provider POSTs to `/api/inbound/support`
2. Stored in `support_messages` as pending
3. Triggers support-bot immediately
4. Within seconds, customer gets an AI reply OR escalates to you

---

## Monitoring

The admin dashboard (`/admin`) shows:

- **System status** — current heartbeat (green = all good)
- **Recent activity** — every action across all agents
- **Social publishing queue** — what's posted, what's pending, what failed
- **Support messages** — incoming emails, replies, escalations

If anything breaks, you get an email at `ADMIN_EMAIL` within 30 minutes.

---

## Cost Per Month (Realistic)

| Service | Monthly cost | What you get |
|---------|------------|--------------|
| Vercel Hobby | $0 | Hosting, 3 cron jobs |
| Supabase Free | $0 | Database, auth, 500MB |
| Anthropic API | $5-20 | ~100 blog posts + ~5K support replies |
| Resend Free | $0 | 3,000 emails/mo |
| Twitter Free | $0 | 1,500 posts/mo |
| LinkedIn Free | $0 | Unlimited (manual rate limits) |
| Domain | $10-15/year | One-time |
| **Total** | **$5-20/mo** | Fully autonomous business |

Compare to hiring a marketing agency ($3,000-10,000/mo).

---

## What's NOT Automated (the limits)

These require you, not because the code can't do it, but because of laws and verification:

- **Creating social media accounts** (phone verification, sometimes ID)
- **Creating LemonSqueezy/Stripe accounts** (KYC)
- **Buying domains** (credit card)
- **Creating Google/Meta Ads accounts** (business verification)
- **Tax filing** (legal requirement to be human-signed)
- **Customer disputes** (judgment + payment auth required)

Everything else — content creation, posting, indexing, customer support, monitoring, alerts — runs without you.

---

## Test Everything Once

After setup, manually fire each agent to verify:

```bash
# Supervisor
curl -H "Authorization: Bearer $CRON_SECRET" https://nichekit.vercel.app/api/cron/supervisor

# Daily content (will commit a new blog post!)
curl -H "Authorization: Bearer $CRON_SECRET" https://nichekit.vercel.app/api/cron/generate-post

# Social publisher (only does work if pending jobs exist)
curl -H "Authorization: Bearer $CRON_SECRET" https://nichekit.vercel.app/api/cron/publish-social

# Support bot
curl -H "Authorization: Bearer $CRON_SECRET" https://nichekit.vercel.app/api/cron/support-bot

# SEO ping
curl -H "Authorization: Bearer $CRON_SECRET" https://nichekit.vercel.app/api/seo-ping
```

Then check the admin dashboard at `/admin` — you should see all of these in the activity log.

---

## TL;DR

1. Add 3 env vars (Anthropic key, GitHub token, Resend key)
2. Optionally add Twitter + LinkedIn tokens for social auto-posting
3. Optionally configure Resend Inbound for support auto-reply
4. The business runs itself

You check the admin dashboard once a week. If anything breaks, you get an email. Otherwise, content publishes daily, gets indexed, gets shared on socials, customer questions get answered, and you collect revenue.

That's the whole game.
