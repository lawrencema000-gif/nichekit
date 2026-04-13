# Payments, Shipping & GST (Australia)

## The Money Part — Done Right

This is where most Aussie store owners get confused. GST, ABN, shipping rates, payment processors — it sounds complex but it's actually straightforward once you know the rules.

## Stripe Australia Setup

You set up Stripe in Module 3. Now let's configure it properly.

### Go Live Checklist

Before accepting real payments:

1. **Switch from Test to Live mode** in your Stripe dashboard
2. **Verify your identity** — Stripe requires ID verification for Australian accounts
3. **Add your bank account** — BSB + Account Number for payouts
4. **Set payout schedule** — Daily (default) or Weekly. Daily is fine.
5. **Update your `.env.local`** with live keys (replace `sk_test_` with `sk_live_`)

### Stripe Fees in Australia

| Method | Fee |
|--------|-----|
| Domestic cards (Visa, MC, Amex) | 1.75% + $0.30 AUD |
| International cards | 2.9% + $0.30 AUD |
| Apple Pay / Google Pay | Same as card rates |

**Compare to Shopify:** Shopify Payments charges the same card fees PLUS $79/month platform fee. You save $948/year minimum.

### Accept Multiple Payment Methods

Tell AI to enable these in your checkout:

```
Update my Stripe checkout to accept:
- Credit/debit cards (Visa, Mastercard, Amex)
- Apple Pay
- Google Pay
- Afterpay (huge in Australia — customers pay in 4 instalments, you get paid upfront)

Add Afterpay by enabling it in Stripe Dashboard > Settings > Payment Methods.
```

**Afterpay is massive in Australia.** 30% of Australian online shoppers use it. If you don't offer it, you're losing sales.

## Shipping (Physical Products)

If you sell physical products, here's the simplest shipping setup:

### Option A: Flat Rate (Recommended to Start)

```
Standard Shipping: $9.95 AUD (3-7 business days)
Express Shipping: $14.95 AUD (1-3 business days)
Free shipping on orders over $75 AUD
```

This covers most items under 5kg within Australia. You'll overpay on some shipments and underpay on others — it averages out.

### Option B: Calculated Shipping

Use Australia Post's API or Sendle's API to calculate exact rates. More accurate but more complex to set up.

**Sendle** is often cheaper than Australia Post for small parcels (under 2kg). They also offer carbon-neutral shipping which Aussie customers love.

### Shipping Providers

| Provider | Best For | Price Range |
|----------|----------|-------------|
| **Australia Post** | Reliable, customers trust it | $8-15 standard |
| **Sendle** | Small parcels, eco-friendly | $6-12 standard |
| **Aramex (Fastway)** | Bulk shipping | Negotiate rates |
| **StarTrack** | Heavy items | $15-30+ |

### International Shipping

Start with **Australia only**. Add international later when you have demand. International shipping from Australia is expensive ($15-40+ AUD) and customs adds complexity.

## GST — The Simple Version

### Do I Need to Register for GST?

**If your annual turnover is under $75,000 AUD: No.** You can choose to register voluntarily, but you don't have to.

**If your annual turnover is $75,000+ AUD: Yes.** You must register and charge 10% GST.

### What This Means in Practice

**Under $75K (most new stores):**
- Price your products normally
- Don't mention GST on your website
- No BAS (Business Activity Statement) to lodge
- Just report income on your tax return

**Over $75K:**
- Register for GST via the ATO
- Your prices must include GST (10%)
- Lodge a BAS quarterly or monthly
- You can claim GST credits on business expenses
- Stripe fees are GST-free (they're a foreign service)

### GST on Digital Products

If you sell digital products (templates, courses, ebooks) to Australian customers, GST rules apply the same way. The $75K threshold still applies.

If you sell to overseas customers, Australian GST generally doesn't apply (it's a GST-free export).

## Your .env.local for Production

Update your environment file:

```
# Stripe LIVE keys (not test!)
STRIPE_SECRET_KEY=sk_live_your_actual_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_key
NEXT_PUBLIC_SITE_URL=https://your-store.vercel.app
```

Then redeploy:

```bash
vercel --prod --yes
```

## Your Homework

1. Switch Stripe to live mode and verify your identity
2. Choose your shipping strategy (flat rate recommended)
3. Decide if you need to register for GST (probably not yet)
4. Update environment variables with live Stripe keys
5. Test a real $1 purchase to yourself to verify everything works

---

*Next module: The Launch Checklist →*
