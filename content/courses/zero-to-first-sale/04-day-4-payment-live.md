# Day 4: Go Live With Payments

## Today: Accept Real Money

Test mode is over. Time to go live.

## The Checklist

### Stripe Live Mode
1. Open Stripe Dashboard
2. Click "Activate your account" — verify your identity, add bank details
3. Switch toggle from "Test" to "Live"
4. Copy your new live API keys
5. Update `.env.local` and Vercel env vars with live keys
6. Redeploy: `vercel --prod --yes`

### The $1 Test
1. Open your live store
2. Buy your own product with your real card
3. Check: Did the payment appear in Stripe? Did you get a confirmation email? Did the success page show?
4. Refund yourself in Stripe dashboard

If all of that worked, you're live. Real people can now give you real money.

### Add Afterpay (Optional but Recommended)
In Stripe Dashboard → Settings → Payment Methods → Enable Afterpay.
30% of Australian online shoppers use Afterpay. Don't leave that money on the table.

## Legal Minimum

Before you promote publicly:
- **Terms of Service page** — AI writes it in 5 minutes
- **Privacy Policy page** — same
- **ABN** (if you have one) — display in footer
- **Australian Consumer Law:** your returns policy must be fair. 30-day returns for change-of-mind is standard.

```
Write a Terms of Service and Privacy Policy for an Australian 
online store called [NAME] selling [PRODUCTS]. Keep them simple, 
fair, and compliant with Australian law.
```

## Today's Deliverable

Complete a real purchase on your own store (then refund). Screenshot the Stripe payment as proof.

```
STRIPE LIVE: ✅ Yes / ❌ No
TEST PURCHASE COMPLETED: ✅ Yes / ❌ No
```

---

*Tomorrow: Tell Everyone You Know →*
