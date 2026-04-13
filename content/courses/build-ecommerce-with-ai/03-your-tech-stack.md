# Your Tech Stack (Free or Nearly Free)

## The Tools You Need (and Nothing Else)

Most "start an online store" guides give you a list of 47 tools. You don't need 47 tools. You need 5, and most of them are free.

Here's exactly what to set up, in order, with no fluff.

## Tool 1: Vercel (Your Hosting)

**What it does:** Hosts your website. Like a landlord for your store, but free.
**Cost:** $0 (Hobby plan)
**Why this one:** Australian edge servers = fast load times for Aussie customers. Deploys automatically when you push code. Used by companies like McDonald's and Nike.

**Setup (5 minutes):**
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. If you don't have a GitHub account, create one at [github.com](https://github.com) first
3. That's it. Vercel is ready.

## Tool 2: Supabase (Your Database)

**What it does:** Stores your products, customer info, and orders. Also handles user accounts/logins.
**Cost:** $0 (free tier — 500MB database, 50,000 monthly active users)
**Why this one:** Open source, Australian-founded (originally from Sydney), great free tier, built-in auth.

**Setup (5 minutes):**
1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Name it after your store
4. Choose region: **Oceania (Sydney)** for fastest Australian performance
5. Save your Project URL and anon key — you'll need these in Module 4

## Tool 3: Stripe (Your Payment Processor)

**What it does:** Takes credit card payments and puts money in your bank account.
**Cost:** 1.75% + $0.30 per transaction (Australia). No monthly fee.
**Why this one:** Lowest fees for Australian businesses. Supports Apple Pay, Google Pay. Pays out to any Australian bank account in 2 business days.

**Setup (10 minutes):**
1. Go to [stripe.com](https://stripe.com) and sign up
2. Choose "Australia" as your country
3. Enter your ABN (or skip if you don't have one yet — you can add it later)
4. Add your bank account details (BSB + account number)
5. Switch to "Test mode" for now — we'll go live in Module 7
6. Save your Publishable Key and Secret Key from the Developers section

**Note on GST:** Stripe doesn't charge GST on their fees if you're GST-registered. If you're under the $75K threshold, you don't need to worry about this yet.

## Tool 4: Resend (Your Email Service)

**What it does:** Sends order confirmation emails, receipts, and marketing emails.
**Cost:** $0 (3,000 emails/month free)
**Why this one:** Simple API, great deliverability, modern. Way better than Mailchimp for developers.

**Setup (3 minutes):**
1. Go to [resend.com](https://resend.com) and sign up
2. Save your API key
3. Later we'll set up a custom "from" address with your domain

## Tool 5: Claude Code or Cursor (Your AI Builder)

**What it does:** This is your developer. You describe what you want, AI writes the code.
**Cost:** Varies — Claude Code subscription (~$20/mo), Cursor (~$20/mo), or use free tiers
**Why this one:** Can build an entire website from plain English descriptions. Understands Next.js, React, databases, and payment integrations.

You're using Claude Code right now — so you already have this.

## What You Do NOT Need

Seriously, don't install these:

| Tool | Why You Don't Need It |
|------|----------------------|
| Shopify | $79/mo + transaction fees. We're building something better for free. |
| WordPress + WooCommerce | Slow, needs hosting ($15-30/mo), needs plugins, needs updates, gets hacked |
| Squarespace | $33/mo, limited e-commerce, can't customise properly |
| Mailchimp | Free tier is tiny, UI is bloated, Resend is simpler |
| Google Analytics | Vercel Analytics is built-in and simpler. Add GA later if you want. |
| Photoshop | Canva (free) does everything you need for product images |
| A domain name (yet) | Your Vercel URL works fine to start. Buy a domain when you're making sales. |

## The Architecture (Plain English)

Here's how it all fits together:

```
Customer visits your store (hosted on Vercel)
         ↓
Browses products (stored in Supabase)
         ↓
Clicks "Buy" → Stripe checkout (handles payment)
         ↓
Payment confirmed → Supabase records the order
         ↓
Resend sends order confirmation email
         ↓
You get paid (Stripe → your bank in 2 days)
```

Total cost: **$0/month** until you're making real money.

## Your Homework

Set up all 5 accounts:

1. ✅ **GitHub** — [github.com](https://github.com)
2. ✅ **Vercel** — [vercel.com](https://vercel.com) (sign up with GitHub)
3. ✅ **Supabase** — [supabase.com](https://supabase.com) (create project, Oceania/Sydney region)
4. ✅ **Stripe** — [stripe.com](https://stripe.com) (Australian account, test mode)
5. ✅ **Resend** — [resend.com](https://resend.com) (save API key)

Save all your API keys in a secure note — you'll need them in the next module.

**Time required:** 20-30 minutes total.

---

*Next module: Let AI Build Your Store →*
