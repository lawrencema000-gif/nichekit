# Day 2: Build Your Store in 3 Hours

## Today: A Working Website

No design debates. No colour deliberation. A functional store that can take money.

## Hour 1: Setup (30 min)

Sign up for these (if you haven't):
- **Vercel** (vercel.com) — hosting, free
- **Stripe** (stripe.com) — payments, sign up with Australian details

Create your project:

```bash
npx create-next-app@latest my-first-store --typescript --tailwind --app --yes
cd my-first-store
```

## Hour 2: AI Builds It (60 min)

Open Claude Code or Cursor in the project folder. Paste this:

```
Build me a simple one-product store:

Product: [YOUR PRODUCT]
Price: $[PRICE] AUD
Description: [2 SENTENCES]

I need:
1. Homepage with product hero, description, and "Buy Now" button
2. Stripe Checkout integration for the buy button
3. A /success page that says "Thanks! Your order is confirmed."
4. Clean, modern design. Light background. Mobile friendly.
5. Australian pricing (AUD).

Keep it simple. One page, one product, one button.
```

Wait for AI to generate everything. Test it: `npm run dev` → open localhost:3000.

## Hour 3: Deploy (30 min)

```bash
git init && git add -A && git commit -m "my first store"
vercel --prod --yes
```

Add Stripe keys to Vercel, redeploy. Your store is live.

## Today's Deliverable

A live URL you can share. That's it. Not perfect — live.

```
MY STORE URL: _______________
```

---

*Tomorrow: The Perfect Product Page →*
