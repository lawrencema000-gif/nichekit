# AI-Written Welcome Sequences

## The Most Important Emails You'll Ever Send

The welcome sequence runs automatically when someone joins your list. It introduces your brand, delivers value, and turns a stranger into a customer.

## The 5-Email Welcome Sequence

### Email 1: Immediate — The Delivery
**Sent:** Instantly after signup
**Purpose:** Deliver what you promised + make a great first impression

```
Write a welcome email for my store [NAME]:

Subject line: Here's your [FREE THING] + a quick hello
Body:
- Thanks for signing up (1 sentence, warm)
- Here's your [freebie] — link/attachment
- Quick intro: who I am, what the store is about (3 sentences max)
- What to expect from these emails (helpful tips, not spam)
- Sign off with personality

Tone: Australian, friendly, like a mate who's good at this stuff
```

### Email 2: Day 2 — The Story
**Sent:** 2 days after signup
**Purpose:** Build connection through your origin story

```
Write email 2 of my welcome sequence:

Subject: How I started [STORE NAME] (the honest version)
Body:
- Share why you started the business (be real, not polished)
- What problem you noticed
- How you're solving it differently
- End with: "Reply and tell me what brought you here"

Keep it under 200 words. Personal, not corporate.
```

### Email 3: Day 4 — The Value
**Sent:** 4 days after signup
**Purpose:** Give genuine value, no selling

```
Write email 3 of my welcome sequence:

Subject: The [NUMBER] mistake most [TARGET CUSTOMER] make with [TOPIC]
Body:
- Share a genuinely useful tip related to your product
- Explain why most people get it wrong
- Give the simple fix
- Don't mention your product at all — pure value
- End with a question to encourage replies

This email builds trust. No selling.
```

### Email 4: Day 7 — The Soft Sell
**Sent:** 7 days after signup
**Purpose:** Introduce your product as a natural solution

```
Write email 4 of my welcome sequence:

Subject: This is what I actually sell (and why it matters)
Body:
- Reference the tip from email 3
- "If you want to [benefit] without [pain point], I built something for that"
- Brief product description (3 sentences)
- 2-3 bullet point benefits
- "If you want to check it out: [link]"
- "No pressure — these emails will keep coming either way"

Soft, not pushy. They should feel informed, not pressured.
```

### Email 5: Day 10 — The Nudge
**Sent:** 10 days after signup (only if they haven't purchased)
**Purpose:** Create urgency without being annoying

```
Write email 5 of my welcome sequence:

Subject: Last thing from me (then back to regular tips)
Body:
- "I've been sending a few emails this week to introduce myself"
- "Here's a quick summary of what [STORE] offers"
- 3 key products/services with one-line descriptions
- Discount code: [WELCOME10] for 10% off first order
- "Valid for 48 hours"
- "After this, you'll just get our [weekly/monthly] tips — 
   no more sales emails unless something genuinely great comes up"

Honest, direct, respectful of their inbox.
```

## Implementation

Tell AI to build the automation:

```
Create a post-signup email sequence system:
- When a user signs up (or is added to subscribers table), 
  record their signup date
- Create a cron job or scheduled function that:
  - Day 0: Send welcome email (email 1)
  - Day 2: Send story email (email 2)
  - Day 4: Send value email (email 3)
  - Day 7: Send soft sell email (email 4)
  - Day 10: Send nudge email (email 5) — skip if they've purchased
- Track which emails have been sent per subscriber
- Use Resend for sending
```

## Your Homework

1. Write all 5 emails using the prompts above
2. Set up the automated sequence
3. Test it by signing up yourself
4. Check that each email arrives on schedule

---

*Next: Abandoned Cart Recovery →*
