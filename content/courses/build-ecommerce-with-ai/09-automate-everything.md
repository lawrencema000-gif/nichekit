# Automate Everything

## Stop Doing Things Manually

You've got sales coming in. Now let's remove yourself from the process so the store runs while you sleep.

## Email Automation

### Order Confirmation (Already Done)
Your webhook already sends confirmation emails. But let's add more:

### Post-Purchase Sequence

Tell AI to create these automated emails:

```
Create an API route at /api/cron/post-purchase that sends these 
emails to customers based on their order date:

Day 1: Order confirmation (already handled by webhook)
Day 3: "How's your [product]? Quick tips to get the most from it"
Day 7: "We'd love a quick review — it helps other Aussies find us"
Day 14: "Here's 10% off your next order" (include coupon code COMEBACK10)

Store email schedule in Supabase. Check which emails are due 
and send via Resend.
```

### Abandoned Cart Recovery

If someone starts checkout but doesn't finish, follow up:

```
Create a system that:
1. Logs when someone starts Stripe checkout (webhook: checkout.session.created)
2. If checkout isn't completed within 1 hour, send an email:
   Subject: "You left something behind"
   Body: Friendly reminder with link back to checkout
3. If still not completed after 24 hours, send a second email 
   with a 10% discount code
```

This single automation recovers 5-15% of abandoned carts. On a store doing $5K/month, that's $250-750 in recovered revenue.

## Social Media Autopilot

### AI Content Generation

Use AI to batch-create a month of social content:

```
Generate 30 social media posts for my Australian [product type] store.
Mix of:
- 10 product highlights (different angles/benefits)
- 5 customer use cases / scenarios
- 5 behind-the-scenes / brand story posts
- 5 tips related to our niche
- 3 promotional posts (sales, discounts, new arrivals)
- 2 Australian-themed posts (seasons, holidays, events)

Tone: casual Australian, not corporate. Include hashtags.
Format: One post per line, ready to schedule.
```

### Auto-Scheduling

Use **Later** (getlate.dev) or **Buffer** (buffer.com) to schedule posts:

1. Upload all 30 posts at once
2. Set posting schedule: 1 post/day at peak times
3. Platforms: Instagram, TikTok, Facebook, LinkedIn (pick 2-3 to start)
4. Repeat monthly — generate new batch of 30 posts with AI

**Time investment: 1 hour per month** (generate with AI + upload to scheduler).

## SEO on Autopilot

### Blog Content

Publish 1-2 blog posts per month. AI writes them:

```
Write a 1500-word blog post for my Australian [product] store:

Topic: "[KEYWORD YOU WANT TO RANK FOR]"
Target audience: Australians looking for [your product category]
Include: practical advice, Australian context, mention our products naturally
SEO: Use the target keyword in title, first paragraph, 2 subheadings, 
and 2-3 times in body text.
Tone: helpful, not salesy.
```

Publish on your site. Over 3-6 months, these posts start bringing organic Google traffic.

### Google Business Profile

If you have any local presence (even a home office):
1. Create a Google Business Profile
2. Add your store URL, photos, description
3. Post weekly updates (reuse your social media content)
4. Collect Google reviews from customers

This is free and drives local Australian traffic.

## Order Processing Automation

### Digital Products
Already automated — customer pays, gets instant download. Nothing to do.

### Physical Products
Set up automatic shipping label generation:

**Option A: Sendle API** — Create shipping labels automatically when an order comes in
**Option B: ShipStation** — Connects to your store and automates label printing
**Option C: Manual (for now)** — Check orders daily, print labels from Sendle/AusPost website

Start with Option C. Automate when you're doing 5+ orders per day.

## Customer Service Automation

### FAQ Chatbot

Add a simple FAQ section that answers 80% of customer questions:

```
Add a floating FAQ widget to my store that covers:
- Shipping times and costs
- Returns and refund policy
- Sizing/specs for [products]
- Contact information
- Order tracking

Make it a simple toggle panel, not a chatbot — 
customers prefer finding answers themselves.
```

### Automated Responses

Set up email auto-replies:

```
Subject: We got your message!

Thanks for reaching out. We typically respond within 24 hours 
(often much faster).

In the meantime, check our FAQ: [link]

Cheers,
[Your Store Name]
```

## The Automation Stack Summary

| Task | Tool | Time to Set Up | Time Saved Weekly |
|------|------|---------------|-------------------|
| Order emails | Resend + cron | 1 hour | 2-3 hours |
| Social media | AI + Later | 1 hour/month | 5-10 hours |
| Blog/SEO | AI + Next.js | 2 hours/month | 5-10 hours |
| Cart recovery | Stripe webhook | 2 hours | Passive revenue |
| Shipping labels | Sendle/manual | 30 min | 1-2 hours |
| Customer FAQ | On-site widget | 1 hour | 3-5 hours |

**Total setup: ~8 hours.** After that, your store needs **2-3 hours per week** of your time.

## Your Homework

1. Set up post-purchase email sequence
2. Generate 30 social media posts with AI
3. Schedule them in Later or Buffer
4. Write and publish 1 blog post
5. Set up your FAQ section
6. Set up abandoned cart recovery emails

---

*Next module: Scale This Store or Build Another →*
