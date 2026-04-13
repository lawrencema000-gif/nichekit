# Let AI Build Your Store

## This Is Where It Gets Real

You have your product. You have your tools. Now we build.

This module walks you through giving AI instructions to create your actual store. By the end, you'll have a live website with a homepage, product page, and checkout — hosted on Vercel, accepting payments via Stripe.

**Time required:** 1-2 hours (mostly waiting for AI to write code).

## Step 1: Create Your Project

Open your terminal (Command Prompt on Windows, Terminal on Mac) and run:

```bash
npx create-next-app@latest my-store --typescript --tailwind --app --yes
cd my-store
```

This creates a Next.js project with TypeScript and Tailwind CSS. Don't worry about what those mean — AI handles it.

## Step 2: Give AI the Blueprint

Open Claude Code (or Cursor) in your project folder. Paste this prompt:

```
Build me an e-commerce store with these specs:

PRODUCT: [YOUR PRODUCT NAME]
PRICE: $[PRICE] AUD
DESCRIPTION: [2-3 sentences about your product]
BRAND VIBE: [modern/minimal/bold/playful/professional — pick one]

I need:
1. A homepage with hero section, product showcase, and "why buy from us" section
2. A product page with description, image placeholder, price, and buy button
3. Stripe checkout integration (use Stripe Checkout Sessions)
4. A success page after purchase ("Thanks for your order!")
5. Light theme, clean design, mobile-responsive
6. Australian pricing (AUD, no need for GST display yet)

Use Next.js App Router, Tailwind CSS, and TypeScript.
Environment variables needed:
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- NEXT_PUBLIC_SITE_URL
```

AI will generate your entire store. This typically takes 2-5 minutes.

## Step 3: Add Your Stripe Keys

Create a file called `.env.local` in your project root:

```
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace with your actual Stripe test keys from Module 3.

## Step 4: Test Locally

Run your store:

```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see your store.

**Test the checkout:**
1. Click "Buy" on your product
2. Stripe opens a checkout page (in test mode)
3. Use test card: `4242 4242 4242 4242`, any future expiry, any CVC
4. Complete the purchase
5. You should land on the success page

If something doesn't work, tell AI what's wrong:

```
The checkout button isn't working. When I click it, nothing happens.
Here's the error in my browser console: [paste error]
Fix this.
```

AI will diagnose and fix it.

## Step 5: Deploy to Vercel

Your store works locally. Let's put it online.

```bash
git init
git add -A
git commit -m "Initial store"
```

Then push to GitHub and deploy to Vercel:

```bash
gh repo create my-store --public --source=. --push
vercel --prod --yes
```

Vercel will give you a URL like `my-store-abc123.vercel.app`. That's your live store.

**Add your Stripe keys to Vercel:**

```bash
vercel env add STRIPE_SECRET_KEY
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add NEXT_PUBLIC_SITE_URL
```

Redeploy:

```bash
vercel --prod --yes
```

## Step 6: Customise the Design

Your store is live but generic. Now make it yours:

```
Update the design of my store:
- Change the hero headline to: "[YOUR HEADLINE]"
- Use these brand colours: primary [#HEXCODE], background [#HEXCODE]
- Add a section below the hero with 3 trust badges: 
  "Free shipping over $50 AUD", "30-day returns", "Australian owned"
- Add my product image (I'll place it at public/product.jpg)
- Make the footer include links to terms, privacy, and contact email
```

## Common Issues and Fixes

**"Stripe checkout gives a 500 error"**
→ Your Stripe secret key isn't set properly. Check `.env.local` and make sure there are no spaces around the `=` sign.

**"The page looks broken on mobile"**
→ Tell AI: "Make the homepage fully responsive for mobile screens. The product grid should be single column on mobile."

**"I want to change the font"**
→ Tell AI: "Change the font to [font name] using next/font/google. Apply it to the entire site."

**"How do I add more products?"**
→ We'll cover this in Module 5. For now, one product is perfect.

## What You Should Have Now

- ✅ A live website on Vercel
- ✅ A homepage with your product
- ✅ Working Stripe checkout (test mode)
- ✅ A success page after purchase
- ✅ Basic branding (colours, fonts, copy)

This is a real store. It's just in test mode. In Module 7, we'll flip it to live and start taking real payments.

## Your Homework

1. Build your store using the prompts above
2. Test the full checkout flow with Stripe test card
3. Deploy to Vercel
4. Share the URL with a friend and ask: "Would you buy this?" (honest feedback only)

---

*Next module: AI-Generated Products & Pages →*
