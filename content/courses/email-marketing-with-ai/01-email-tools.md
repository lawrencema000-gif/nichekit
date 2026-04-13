# Free Email Tools That Scale

## Why Email Beats Everything Else

Social media reach: 2-5% of your followers see each post.
Email reach: 30-40% of your list opens each email.

Email is the only marketing channel you own. Instagram can change the algorithm tomorrow. Your email list is yours forever.

## The Tools (All Free to Start)

### Resend (Recommended)

**What it does:** Sends transactional and marketing emails via API.
**Free tier:** 3,000 emails/month (enough for 100+ customers)
**Why this one:** Simple, modern, great deliverability, built for developers. If you followed the core course, you already have it set up.

**Best for:** Automated sequences (welcome, cart recovery, post-purchase)

### Loops (Alternative)

**What it does:** Marketing email platform with visual templates.
**Free tier:** 1,000 contacts
**Why this one:** Beautiful templates, easy drag-and-drop editor, good for newsletters.

**Best for:** Monthly newsletters and manual campaigns

### Buttondown (Alternative)

**What it does:** Simple newsletter platform.
**Free tier:** 100 subscribers
**Why this one:** Minimalist, no bloat, Markdown support. Perfect for solopreneurs who want to write and send, nothing more.

## What You Actually Need

For a new store, you need exactly 4 automated emails:

1. **Welcome email** — When someone signs up / makes first purchase
2. **Post-purchase email** — Day 3, check in + tips
3. **Review request** — Day 7, ask for a Google review
4. **Win-back email** — Day 30, if they haven't bought again

That's it. AI writes all four. You set them up once. They run forever.

## Setting Up Resend (10 min)

If you haven't already:
1. Sign up at resend.com
2. Add your API key to your environment variables
3. Verify a sending domain (or use their default for testing)

```
Tell AI: Set up Resend email sending in my Next.js project.
I need a function that sends emails with: to, subject, and HTML body.
Use the Resend npm package. API key is in RESEND_API_KEY env var.
```

## The Email Capture System

Before you can email people, you need their email address. Two methods:

### Method 1: Purchase (Automatic)
Every customer gives you their email at checkout. This is your highest-quality list.

### Method 2: Lead Magnet (Proactive)
Offer something free in exchange for an email:

- "Free guide: 5 AI Tools That Replace a $5K Developer"
- "Free checklist: Launch Your Online Store This Weekend"
- "Free sample: 3 Social Media Post Templates for [Niche]"

Add a capture form to your homepage. AI builds it:

```
Add an email capture section to my homepage. 
Offer: "[YOUR FREE THING]"
Collect: email address only
After signup: show a thank-you message and deliver the freebie via email
Store the email in my Supabase subscribers table
```

## Your Homework

1. Set up Resend (or confirm it's working from the core course)
2. Decide on your lead magnet (what will you give away free?)
3. Add an email capture form to your site
4. Collect your first 5 email addresses

---

*Next: AI-Written Welcome Sequences →*
