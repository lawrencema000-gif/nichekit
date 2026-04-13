# Abandoned Cart Recovery

## 70% of Carts Get Abandoned. Recover 10-15%.

The average online store loses 70% of potential sales at checkout. People get distracted, second-guess themselves, or just forget. Cart recovery emails bring them back.

## The 3-Email Recovery Sequence

### Email 1: 1 Hour After Abandonment
**Tone:** Helpful, not pushy

```
Subject: Did something go wrong?
Body:
Hey [Name],

I noticed you started checkout but didn't finish. 
Totally fine — just wanted to make sure nothing 
went wrong on our end.

If you had a technical issue, reply and I'll sort it out.

If you just got distracted (happens to the best of us), 
here's a link back to your cart: [CART LINK]

Cheers,
[Your Name]
```

### Email 2: 24 Hours After
**Tone:** Value-add, address objections

```
Subject: Still thinking about it?
Body:
Hey [Name],

A few things that might help you decide:

✓ Free shipping on orders over $75 AUD
✓ 30-day money-back guarantee
✓ Australian owned — ships from [location]

The [product] you were looking at is one of our 
best sellers. Here's why people love it: [1-2 sentences]

[LINK BACK TO CART]

Any questions? Just reply.
```

### Email 3: 48 Hours After (With Incentive)
**Tone:** Last chance, small discount

```
Subject: 10% off — just for you
Body:
Hey [Name],

I don't do this often, but I wanted to offer you 
10% off the [product] you were looking at.

Use code COMEBACK10 at checkout: [CART LINK]

Valid for 24 hours.

If it's not the right time, no worries at all. 
I won't email about this again.

Cheers,
[Your Name]
```

## How to Set It Up

### With Stripe (Technical)

Stripe fires a `checkout.session.expired` webhook when someone starts but doesn't complete checkout. Capture this:

```
Add abandoned cart recovery to my store:

1. When Stripe fires checkout.session.expired, 
   save the customer email + product to a Supabase table
2. Create a cron job that checks for abandoned carts:
   - 1 hour old → send email 1
   - 24 hours old → send email 2
   - 48 hours old → send email 3 (with discount code)
3. If they complete a purchase, cancel any remaining emails
4. Use Resend for sending
```

### Quick Win (Non-Technical)

If you don't want to build the automation yet, do it manually:

1. Check Stripe dashboard daily for "Incomplete" checkout sessions
2. The customer's email is in the session data
3. Send the emails manually using the templates above

Even manual recovery of 2-3 carts per week adds up.

## The Numbers

| Metric | Typical Result |
|--------|---------------|
| Email 1 open rate | 45-55% |
| Email 2 open rate | 35-40% |
| Email 3 open rate | 25-30% |
| Overall recovery rate | 10-15% of abandoned carts |

On a store doing $3,000/month with 70% cart abandonment, recovering 10% means **$630/month in recovered revenue** — from 3 automated emails.

## Your Homework

1. Write your 3 cart recovery emails using the templates above
2. Set up the automation (or plan to do it manually initially)
3. Create a 10% discount code in Stripe for cart recovery
4. Test the flow by starting and abandoning your own checkout

---

*Next: Monthly Newsletter on Autopilot →*
