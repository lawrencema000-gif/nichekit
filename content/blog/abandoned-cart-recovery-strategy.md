---
title: Abandoned Cart Recovery: The Emails That Actually Recover Sales
description: 70% of carts are abandoned. The exact 3-email recovery sequence that recovers 10-15% of those — with templates, timings, and Stripe webhook setup.
date: 2026-04-25
readTime: 6 min
tag: Growth
keywords: [abandoned cart recovery, cart recovery emails, ecommerce email automation]
---

# Abandoned Cart Recovery: The Emails That Actually Recover Sales

Every online store loses around **70% of potential sales at checkout**. People add items, get distracted, second-guess the purchase, or just forget. Most of those sales are recoverable with three simple emails.

This guide gives you the exact sequence, real timing data, and the technical setup to make it run automatically.

## The Numbers Behind Cart Recovery

For a store doing $5,000 AUD/month with a typical 70% abandonment rate:

| Metric | Without Recovery | With Recovery |
|---|---|---|
| Monthly checkouts | 100 | 100 |
| Completed | 30 | 30 |
| Abandoned | 70 | 70 |
| Recovery rate | 0% | 12% (industry average) |
| Recovered sales | 0 | 8.4 |
| Extra revenue | $0 | $420/mo |
| Annual extra revenue | $0 | **$5,040/mo** |

That's $5,000+/year from three emails you set up once. It's the highest-ROI automation in e-commerce.

## The 3-Email Recovery Sequence

### Email 1: 1 Hour After Abandonment
**Tone:** Helpful, not pushy. Assume something went wrong technically.

```
Subject: Did something go wrong?

Hi [First Name],

I noticed you started checkout but didn't finish. Totally fine — just wanted to make sure nothing went wrong on our end.

If you had a technical issue, reply and I'll sort it out.

If you got distracted (happens to the best of us), here's a link back to your cart: [CART LINK]

Cheers,
[Your Name]
```

**Why this works:** Most abandons are accidental. People genuinely forget. A non-pushy reminder recovers 30-40% of email 1 opens.

### Email 2: 24 Hours After Abandonment
**Tone:** Address objections, share value.

```
Subject: Still thinking it over?

Hi [First Name],

A few things that might help you decide:

✓ Free shipping on orders over $75 AUD
✓ 30-day money-back guarantee
✓ Australian owned — ships from [your location]

The [Product Name] is one of our best sellers. Here's why people love it: [1-2 specific reasons].

[CART LINK]

Any questions? Just reply.

— [Your Name]
```

**Why this works:** Hesitation is usually about trust or value. Addressing concerns directly recovers another 5-10%.

### Email 3: 48-72 Hours After (With Incentive)
**Tone:** Last chance, soft urgency.

```
Subject: 10% off — just for you

Hi [First Name],

I don't do this often, but I wanted to offer you 10% off the [Product Name] you were looking at.

Use code COMEBACK10 at checkout: [CART LINK]

Valid for 24 hours.

If it's not the right time, no worries at all. I won't email about this again.

— [Your Name]
```

**Why this works:** Discount + deadline + permission to leave = recovers another 3-5%.

## What NOT to Do

❌ **Subject lines like "OMG YOU FORGOT SOMETHING!!!"** — looks like spam, ends up in junk
❌ **Emails every 4 hours** — annoying, drives unsubscribes
❌ **Big discounts in email 1** — trains customers to abandon for discounts
❌ **No way to opt out** — illegal under the Australian Spam Act 2003
❌ **Generic templates** — read like every other store and convert poorly

## Technical Setup with Stripe

If you're using Stripe (which most Aussie stores should), here's how to capture abandoned checkouts:

### Step 1: Listen for the Right Webhooks

Stripe fires `checkout.session.expired` when a customer starts checkout but doesn't complete within the session timeout (default 24 hours).

```javascript
// app/api/webhooks/stripe/route.ts (simplified)
case "checkout.session.expired": {
  const session = event.data.object;
  const email = session.customer_email;
  const productInfo = session.metadata;

  // Save to your database for the recovery email scheduler
  await db.from("abandoned_carts").insert({
    email,
    product_info: productInfo,
    abandoned_at: new Date(),
  });
  break;
}
```

### Step 2: Build a Cron Job

Run a daily cron that checks `abandoned_carts` and triggers the right email based on age:

```javascript
// app/api/cron/recover-carts/route.ts
const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

// Find carts ready for each email
const pendingEmail1 = await db.from("abandoned_carts")
  .select()
  .lt("abandoned_at", oneHourAgo.toISOString())
  .is("email1_sent_at", null);

// Send via Resend, mark sent in DB
```

### Step 3: Use Resend for Delivery

Free tier (3,000 emails/month) handles most small stores easily. Set up a transactional email template, fill in customer-specific data, send.

### Step 4: Track Conversions

Add UTM params to recovery email links to see which emails actually recover sales:

```
https://yourstore.com.au/checkout/recover?session=xyz&utm_source=email&utm_medium=cart_recovery&utm_campaign=email1
```

Then check Stripe for sales with that UTM source.

## Personalisation That Actually Matters

| Element | Impact |
|---|---|
| First name in subject | +2-3% open rate |
| First name in body | Marginal |
| Product name in subject | +5-8% open rate |
| Product image in email | +3-5% click rate |
| Real sender name (not noreply) | +5-10% open rate |
| Reply-to is monitored | +2-3% reply rate |

The biggest single win: **include the product name in the subject line.**

## What Aussie-Specific Stores Should Add

A few local touches that improve recovery rates for Australian customers:

- **Mention free shipping over $75 AUD** in email 2 (Aussies hate paying shipping)
- **Mention Afterpay availability** if relevant ("Or split it into 4 with Afterpay")
- **Reference your Australian-ness** ("Australian owned, ships from Melbourne")
- **Use Australian English** (organise, not organize)

## Realistic Recovery Rates

Don't expect miracles. Here's what's achievable:

| Effort Level | Recovery Rate | Notes |
|---|---|---|
| No emails | 0% | Default |
| 1 email | 5-7% | Better than nothing |
| 3 emails (proper sequence) | 10-15% | Industry standard |
| 5+ emails | 15-18% | Diminishing returns, more unsubscribes |
| Personalised + segmented | 18-25% | Requires more setup |

For most small Aussie stores, **target 10-12% recovery** with the 3-email sequence. That's profitable and sustainable.

## The Quick Setup (Without Coding)

If you don't want to set up Stripe webhooks yourself, these tools handle it:

- **Klaviyo** ($45+ AUD/mo) — best ecommerce email tool, native Stripe integration
- **MailerLite** ($14+ AUD/mo) — cheaper alternative, decent automation
- **Omnisend** ($19+ AUD/mo) — focuses on ecommerce, ok automation

For under-$50K-revenue stores, MailerLite is fine. For serious automation, Klaviyo.

## Common Mistakes Aussie Stores Make

1. **Sending recovery emails in USD currency** — sloppy, kills trust
2. **No mobile-friendly emails** — 70%+ of opens are mobile
3. **Generic "we miss you" copy** — sounds desperate
4. **Sending the third email after 7+ days** — they've moved on
5. **No clear CTA button** — people skim, not read
6. **No way to update preferences** — Spam Act compliance issue

## The TL;DR

- 3 emails: 1 hour, 24 hours, 48-72 hours
- First email: friendly check-in
- Second email: address concerns + value props
- Third email: 10% discount with deadline
- Use real sender name, monitored reply-to
- Australian English, AUD pricing, Aussie context
- Expect 10-15% recovery rate — that's $5,000+/year for a $5K/mo store

The technical setup takes a weekend. The emails take an hour. The ROI is permanent.

---

Want a complete template for setting up Stripe webhooks + Resend automation + cart recovery flows? [NicheKit's Email Marketing Machine course](/) has the exact code, templates, and walkthrough.
