import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import archiver from "archiver";
import { NICHES, NicheData } from "./niche-data";

const PRODUCTS_DIR = path.resolve(__dirname, "../products");
const BRAND = "NicheKit";

// ============================================================
// UTILITY HELPERS
// ============================================================

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function createPDF(filePath: string): Promise<PDFKit.PDFDocument> {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: "LETTER", margins: { top: 60, bottom: 60, left: 60, right: 60 } });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    stream.on("finish", () => resolve(doc));
    resolve(doc);
  });
}

function pdfTitle(doc: PDFKit.PDFDocument, text: string) {
  doc.fontSize(28).font("Helvetica-Bold").fillColor("#1e1b4b").text(text, { align: "center" });
  doc.moveDown(0.3);
  doc.fontSize(10).font("Helvetica").fillColor("#6b7280").text(`${BRAND} — Professional Business Templates`, { align: "center" });
  doc.moveDown(0.3);
  doc.moveTo(60, doc.y).lineTo(552, doc.y).strokeColor("#e5e7eb").stroke();
  doc.moveDown(1);
}

function pdfH2(doc: PDFKit.PDFDocument, text: string) {
  doc.moveDown(0.5);
  doc.fontSize(16).font("Helvetica-Bold").fillColor("#312e81").text(text);
  doc.moveDown(0.3);
}

function pdfH3(doc: PDFKit.PDFDocument, text: string) {
  doc.fontSize(13).font("Helvetica-Bold").fillColor("#1f2937").text(text);
  doc.moveDown(0.2);
}

function pdfBody(doc: PDFKit.PDFDocument, text: string) {
  doc.fontSize(10.5).font("Helvetica").fillColor("#374151").text(text, { lineGap: 3 });
  doc.moveDown(0.3);
}

function pdfBullet(doc: PDFKit.PDFDocument, text: string) {
  doc.fontSize(10.5).font("Helvetica").fillColor("#374151").text(`  •  ${text}`, { lineGap: 2 });
}

function pdfFooter(doc: PDFKit.PDFDocument) {
  doc.moveDown(2);
  doc.moveTo(60, doc.y).lineTo(552, doc.y).strokeColor("#e5e7eb").stroke();
  doc.moveDown(0.5);
  doc.fontSize(9).font("Helvetica").fillColor("#9ca3af").text(`© ${new Date().getFullYear()} ${BRAND}. All rights reserved. For personal/business use only. Do not redistribute.`, { align: "center" });
}

function finishPDF(doc: PDFKit.PDFDocument): Promise<void> {
  return new Promise((resolve) => {
    const stream = (doc as any)._writableState ? doc : doc;
    // @ts-ignore
    const ws = doc._streams?.[0] || doc;
    doc.on("end", () => setTimeout(resolve, 100));
    doc.end();
  });
}

async function zipDirectory(sourceDir: string, outPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outPath);
    const archive = archiver("zip", { zlib: { level: 9 } });
    output.on("close", () => resolve());
    archive.on("error", (err: Error) => reject(err));
    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

// ============================================================
// PRODUCT 1: 90-Day Social Media Content Calendar
// ============================================================

const POST_TYPES = [
  "Educational tip",
  "Behind-the-scenes",
  "Client testimonial/review",
  "Before & after / showcase",
  "Question / engagement post",
  "Promotional offer",
  "Industry news / trend",
  "Team / staff spotlight",
  "Motivational / inspirational",
  "User-generated content / repost",
  "How-to / tutorial",
  "Fun fact / myth buster",
  "Poll / quiz",
  "Holiday / seasonal",
  "Local community shoutout",
];

function generateCalendarCSV(niche: NicheData): string {
  const rows: string[] = ["Day,Week,Platform,Content Type,Post Text,Hashtags,Call to Action,Notes"];
  const platforms = niche.socialPlatforms;
  const hashtags = niche.hashtagSets;
  const months = ["Jan", "Feb", "Mar"];
  const seasonal = niche.seasonalEvents;

  for (let day = 1; day <= 90; day++) {
    const week = Math.ceil(day / 7);
    const platform = platforms[(day - 1) % platforms.length];
    const postType = POST_TYPES[(day - 1) % POST_TYPES.length];
    const hashtagSet = hashtags[(day - 1) % hashtags.length].join(" ");
    const monthIdx = Math.floor((day - 1) / 30);
    const monthName = months[monthIdx] || "Mar";

    let postText = "";
    let cta = "";
    let notes = "";

    // Generate genuinely useful, varied post content
    const pillar = niche.contentPillars[(day - 1) % niche.contentPillars.length];
    const painPoint = niche.painPoints[(day - 1) % niche.painPoints.length];
    const service = niche.services[(day - 1) % niche.services.length];
    const stat = niche.seoKeywords[(day - 1) % niche.seoKeywords.length];

    switch (postType) {
      case "Educational tip":
        postText = `Did you know? Most ${niche.label.toLowerCase()} struggle with ${painPoint.toLowerCase()}. Here's a quick tip to solve it: [Add your specific tip about ${service.toLowerCase()}]. Your audience will love this practical advice.`;
        cta = "Save this for later! What's your biggest challenge? Comment below.";
        notes = `Pillar: ${pillar}. Keep it practical and actionable.`;
        break;
      case "Behind-the-scenes":
        postText = `Here's what a typical day looks like at our ${niche.singular}! From ${service.toLowerCase()} to making sure every detail is perfect — this is what goes into delivering great results for our clients.`;
        cta = "Want to see more behind-the-scenes? Follow us for the inside look!";
        notes = "Film a short video or take a candid photo. Authenticity > polish.";
        break;
      case "Client testimonial/review":
        postText = `"[Client name] came to us for ${service.toLowerCase()} and the results were incredible." We love hearing from happy clients! Thank you for trusting us with your ${niche.singular} needs.`;
        cta = "Ready for your own transformation? Link in bio to book.";
        notes = "Use a real review (with permission). Screenshot the Google/Yelp review for authenticity.";
        break;
      case "Before & after / showcase":
        postText = `Transformation alert! Swipe to see the before & after of this ${service.toLowerCase()} project. Our team put so much care into getting this right — and the client's reaction was priceless.`;
        cta = "Book your consultation today — link in bio.";
        notes = "Always get client permission for before/after content. Side-by-side photos perform best.";
        break;
      case "Question / engagement post":
        postText = `Quick question for ${niche.label.toLowerCase()} owners: What's the one thing you wish more people knew about ${painPoint.toLowerCase()}? We'll share the best answers in our stories!`;
        cta = "Drop your answer below! We read every comment.";
        notes = "Engagement posts boost algorithm reach. Reply to every comment within 1 hour.";
        break;
      case "Promotional offer":
        postText = `This ${monthName} only: [Your special offer] on ${service.toLowerCase()}. We only run this deal once a year, and spots are limited. Don't miss out!`;
        cta = "Book now before spots fill up — link in bio!";
        notes = "Create urgency but be honest. Limited-time offers should have a real deadline.";
        break;
      case "Industry news / trend":
        postText = `The ${niche.label.toLowerCase()} industry is changing fast. Here's what we're seeing in 2026: [trend related to ${pillar.toLowerCase()}]. How is this affecting your business?`;
        cta = "What trends are you seeing? Let us know in the comments.";
        notes = "Position yourself as a thought leader. Share genuine insights, not just content for content's sake.";
        break;
      case "Team / staff spotlight":
        postText = `Meet [team member name]! They've been with us for [X years] and specialize in ${service.toLowerCase()}. Fun fact about them: [something personal/fun]. We're lucky to have such an amazing team!`;
        cta = "Give [name] some love in the comments!";
        notes = "Humanizes your brand. People follow people, not businesses. Get a photo of them in action.";
        break;
      case "Motivational / inspirational":
        postText = `Running a ${niche.singular} isn't easy. Between ${painPoint.toLowerCase()} and everything else on your plate, it can feel overwhelming. But here's what we've learned: consistency beats perfection every time.`;
        cta = "Tag someone who needs to hear this today.";
        notes = "Keep it genuine. Avoid generic motivational quotes — share real experience.";
        break;
      case "User-generated content / repost":
        postText = `We love when our clients share their experience! [Client] posted this about their ${service.toLowerCase()} and we had to share. Thank you for being part of our community!`;
        cta = "Tag us in your posts for a chance to be featured!";
        notes = "Always credit the original poster and ask permission before reposting.";
        break;
      case "How-to / tutorial":
        postText = `Quick tutorial: How to [specific tip related to ${service.toLowerCase()}] in 3 easy steps. Step 1: [Step]. Step 2: [Step]. Step 3: [Step]. Save this for later!`;
        cta = "Found this helpful? Share it with someone who needs it.";
        notes = "Carousel posts or short videos work best for tutorials. Keep each step concise.";
        break;
      case "Fun fact / myth buster":
        postText = `Myth: "${painPoint}" is just something you have to live with.\n\nFact: With the right approach to ${service.toLowerCase()}, you can completely solve this. Here's how...`;
        cta = "What myths have you heard about our industry? Comment below!";
        notes = "Myth-busting content gets shared a lot. Be specific and back claims with facts.";
        break;
      case "Poll / quiz":
        postText = `Quick poll: Which is more important for your ${niche.singular}?\n\nA) ${niche.benefits ? niche.services[0] : service}\nB) ${niche.services[1] || service}\n\nVote in stories or comment A or B!`;
        cta = "Vote now! We'll share the results tomorrow.";
        notes = "Use Instagram/Facebook poll stickers in Stories. Share results as a follow-up post.";
        break;
      case "Holiday / seasonal":
        const seasonalPost = seasonal.find((s) => s.month.startsWith(monthName)) || seasonal[0];
        postText = seasonalPost.postIdea;
        cta = "Book now — link in bio!";
        notes = `Seasonal content. Plan and schedule 1-2 weeks in advance.`;
        break;
      case "Local community shoutout":
        postText = `Shoutout to our amazing community! We love being part of [your city/neighborhood]. Here's why supporting local ${niche.label.toLowerCase()} matters — and how you can help small businesses thrive.`;
        cta = "Tag a local business you love! Let's support each other.";
        notes = "Tag local businesses you partner with. Community content builds local following.";
        break;
    }

    const escaped = (s: string) => `"${s.replace(/"/g, '""')}"`;
    rows.push(`${day},${week},${platform},${escaped(postType)},${escaped(postText)},${escaped(hashtagSet)},${escaped(cta)},${escaped(notes)}`);
  }

  return rows.join("\n");
}

async function generateCalendarGuide(niche: NicheData, dir: string) {
  const filePath = path.join(dir, "How-To-Use-This-Calendar.pdf");
  const doc = await createPDF(filePath);

  pdfTitle(doc, `90-Day Social Media Calendar\nfor ${niche.label}`);
  pdfBody(doc, `This calendar gives you 90 days of ready-to-use social media content specifically designed for ${niche.label.toLowerCase()}. Every post is crafted to engage your audience, showcase your expertise, and drive business.`);

  pdfH2(doc, "How to Use This Calendar");
  pdfBody(doc, "1. Open the CSV file in Google Sheets or Excel");
  pdfBody(doc, "2. Each row is one day. Customize the [bracketed text] with your specific details");
  pdfBody(doc, "3. Schedule posts using your preferred scheduling tool (Later, Buffer, etc.)");
  pdfBody(doc, "4. Use the hashtags provided or mix in your own branded hashtags");
  pdfBody(doc, "5. The Call to Action column tells you what to ask your audience to do");
  pdfBody(doc, "6. The Notes column has tips for making each post perform better");

  pdfH2(doc, "Your Content Pillars");
  pdfBody(doc, `For ${niche.label.toLowerCase()}, we've built your content around these pillars:`);
  niche.contentPillars.forEach((p) => pdfBullet(doc, p));

  doc.moveDown(0.5);
  pdfH2(doc, "Best Posting Times");
  pdfBody(doc, "Based on industry data for " + niche.label.toLowerCase() + ":");
  pdfBullet(doc, "Instagram: Weekdays 11am-1pm, 7pm-9pm");
  pdfBullet(doc, "Facebook: Weekdays 1pm-4pm");
  pdfBullet(doc, "TikTok: Weekdays 7pm-11pm, Weekends 10am-1pm");
  pdfBullet(doc, "LinkedIn: Tuesday-Thursday 8am-10am");

  pdfH2(doc, "Hashtag Strategy");
  pdfBody(doc, "We've provided 3 rotating hashtag sets. Mix them up to avoid looking spammy:");
  niche.hashtagSets.forEach((set, i) => {
    pdfBody(doc, `Set ${i + 1}: ${set.join(" ")}`);
  });

  pdfH2(doc, "Pro Tips");
  pdfBullet(doc, "Customize every post — don't copy-paste verbatim. Add your personality.");
  pdfBullet(doc, "Engage with comments within 1 hour for maximum reach.");
  pdfBullet(doc, "Use Stories daily, even if it's just a quick behind-the-scenes clip.");
  pdfBullet(doc, "Repost your best-performing content every 4-6 weeks.");
  pdfBullet(doc, "Track which post types get the most engagement and double down.");

  pdfFooter(doc);
  await finishPDF(doc);
}

// ============================================================
// PRODUCT 2: Email Marketing Swipe File
// ============================================================

function generateEmailHTML(template: { name: string; subject: string; body: string }, niche: NicheData): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${template.name} — ${niche.label}</title>
<style>
body{margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1f2937;}
.container{max-width:600px;margin:24px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);}
.header{background:#1e1b4b;padding:32px;text-align:center;color:#fff;}
.header h1{margin:0;font-size:22px;font-weight:600;}
.body{padding:32px;line-height:1.7;font-size:15px;}
.body h2{font-size:18px;color:#1e1b4b;margin:24px 0 12px;}
.body a{color:#4f46e5;text-decoration:none;}
.cta{display:inline-block;background:#4f46e5;color:#fff;padding:14px 32px;border-radius:6px;text-decoration:none;font-weight:600;margin:16px 0;}
.footer{padding:24px 32px;background:#f3f4f6;text-align:center;font-size:12px;color:#9ca3af;}
.highlight{background:#f0f0ff;border-left:4px solid #4f46e5;padding:16px;margin:16px 0;border-radius:0 6px 6px 0;}
.meta{background:#f9fafb;padding:16px 32px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#6b7280;}
</style></head><body>
<div class="meta">
<strong>Template:</strong> ${template.name}<br>
<strong>Subject line:</strong> ${template.subject}<br>
<strong>Niche:</strong> ${niche.label}<br>
<strong>Instructions:</strong> Replace all [bracketed text] with your specific details.
</div>
<div class="container">
<div class="header"><h1>[Your ${niche.singular} Name]</h1></div>
<div class="body">${template.body}</div>
<div class="footer">
[Your Business Name] · [Address] · <a href="#">Unsubscribe</a>
</div>
</div></body></html>`;
}

function getEmailTemplates(niche: NicheData): { name: string; subject: string; body: string }[] {
  return [
    {
      name: "Welcome Email",
      subject: niche.emailSubjectLines[0],
      body: `<p>Hi [First Name],</p>
<p>Welcome to [Your ${niche.singular} Name]! We're thrilled to have you.</p>
<p>Here's what you can expect from us:</p>
<div class="highlight">
<ul>
<li><strong>${niche.services[0]}</strong> — tailored to your needs</li>
<li><strong>${niche.services[1]}</strong> — using the best techniques</li>
<li><strong>Expert guidance</strong> — from our experienced team</li>
</ul>
</div>
<p>To get started, [specific next step for your business]:</p>
<p style="text-align:center"><a href="[BOOKING LINK]" class="cta">Book Your First Appointment →</a></p>
<p>If you have any questions, just reply to this email — I read every one.</p>
<p>Best,<br>[Your Name]<br>[Your ${niche.singular} Name]</p>`,
    },
    {
      name: "Follow-Up #1 (3 days after welcome)",
      subject: `Quick question about your ${niche.singular} needs`,
      body: `<p>Hi [First Name],</p>
<p>I wanted to follow up and make sure you got my last email.</p>
<p>I know ${niche.painPoints[0].toLowerCase()} can be frustrating. That's exactly why we offer ${niche.services[0].toLowerCase()} — to make things easier for you.</p>
<p>Most of our clients see results within [timeframe]. Here's what [recent client name] had to say:</p>
<div class="highlight">
<p>"[Insert genuine client testimonial about your service]"</p>
</div>
<p>Would you like to chat about how we can help? Just reply "yes" and I'll send over some options.</p>
<p>Best,<br>[Your Name]</p>`,
    },
    {
      name: "Value Email (1 week)",
      subject: niche.emailSubjectLines[2],
      body: `<p>Hi [First Name],</p>
<p>I wanted to share something that helps a lot of our clients:</p>
<h2>3 Tips to [Solve Pain Point] Without [Common Frustration]</h2>
<p><strong>Tip 1:</strong> [Specific actionable advice related to ${niche.contentPillars[0].toLowerCase()}]</p>
<p><strong>Tip 2:</strong> [Specific actionable advice related to ${niche.contentPillars[1].toLowerCase()}]</p>
<p><strong>Tip 3:</strong> [Specific actionable advice related to ${niche.services[2]?.toLowerCase() || "your service"}]</p>
<p>Of course, if you'd rather have a professional handle it, that's what we're here for.</p>
<p style="text-align:center"><a href="[BOOKING LINK]" class="cta">Let Us Handle It →</a></p>
<p>Best,<br>[Your Name]</p>`,
    },
    {
      name: "Social Proof Email (2 weeks)",
      subject: `How [Client] solved ${niche.painPoints[1].toLowerCase()}`,
      body: `<p>Hi [First Name],</p>
<p>I wanted to share a quick story about one of our clients.</p>
<p>[Client Name] came to us because they were dealing with ${niche.painPoints[1].toLowerCase()}. Sound familiar?</p>
<div class="highlight">
<p><strong>The problem:</strong> ${niche.painPoints[1]}</p>
<p><strong>What we did:</strong> [Describe your solution using ${niche.services[1].toLowerCase()}]</p>
<p><strong>The result:</strong> [Specific, measurable outcome]</p>
</div>
<p>If you're dealing with something similar, I'd love to help.</p>
<p style="text-align:center"><a href="[BOOKING LINK]" class="cta">Get the Same Results →</a></p>
<p>Best,<br>[Your Name]</p>`,
    },
    {
      name: "Last Chance / Offer Email",
      subject: niche.emailSubjectLines[4],
      body: `<p>Hi [First Name],</p>
<p>I wanted to reach out one more time because I think we can really help you.</p>
<p>As a special thank-you for being on our list, I'd like to offer you:</p>
<div class="highlight" style="text-align:center">
<p style="font-size:24px;font-weight:700;color:#4f46e5;margin:0">[X]% OFF</p>
<p style="margin:4px 0 0;">Your first ${niche.services[0].toLowerCase()} — this week only.</p>
</div>
<p>No pressure at all. If the timing isn't right, I understand. But if you've been thinking about it, now's a great time to start.</p>
<p style="text-align:center"><a href="[BOOKING LINK]" class="cta">Claim Your Discount →</a></p>
<p>This offer expires [Date].</p>
<p>Best,<br>[Your Name]</p>`,
    },
    {
      name: "Re-engagement (30 days inactive)",
      subject: `We miss you at [${niche.singular} name]`,
      body: `<p>Hi [First Name],</p>
<p>It's been a while since we've heard from you, and we just wanted to check in.</p>
<p>Since your last visit, we've added some exciting things:</p>
<ul>
<li>${niche.services[2] || "New service"} — now available</li>
<li>Updated [process/equipment/menu] for an even better experience</li>
<li>Special pricing for returning clients</li>
</ul>
<p>We'd love to see you again. Here's a little incentive:</p>
<div class="highlight" style="text-align:center">
<p style="font-size:18px;font-weight:600;color:#4f46e5;">Come back and get [X] off your next visit</p>
</div>
<p style="text-align:center"><a href="[BOOKING LINK]" class="cta">Book Your Return Visit →</a></p>
<p>Hope to see you soon!<br>[Your Name]</p>`,
    },
    {
      name: "Referral Request",
      subject: "Know someone who needs a great " + niche.singular + "?",
      body: `<p>Hi [First Name],</p>
<p>Thank you for being a valued client. We love serving you!</p>
<p>If you know anyone who's looking for ${niche.services[0].toLowerCase()} or ${niche.services[1].toLowerCase()}, we'd be grateful if you'd pass along our name.</p>
<div class="highlight">
<p><strong>Our referral reward:</strong></p>
<p>When your friend books, you BOTH get [X% off / free service / gift card]. It's our way of saying thank you.</p>
</div>
<p>Just have them mention your name when they book, or forward this email!</p>
<p>Thanks for your support — it means the world to us.</p>
<p>Best,<br>[Your Name]</p>`,
    },
    {
      name: "Review Request",
      subject: "Quick favor? (Takes 30 seconds)",
      body: `<p>Hi [First Name],</p>
<p>We hope you had a great experience with us!</p>
<p>If you have 30 seconds, a Google review would mean the world to our small business. It helps other people find us and trust that they're in good hands.</p>
<p style="text-align:center"><a href="[GOOGLE REVIEW LINK]" class="cta">Leave a Quick Review →</a></p>
<p>Even a few words and a star rating makes a huge difference. Thank you so much!</p>
<p>Best,<br>[Your Name]<br>[Your ${niche.singular} Name]</p>`,
    },
    {
      name: "Seasonal Promotion",
      subject: `[Season] special at [Your ${niche.singular} Name]`,
      body: `<p>Hi [First Name],</p>
<p>[Season] is here, and we have something special for you!</p>
<h2>Our [Season] Special</h2>
<div class="highlight">
<p><strong>${niche.services[0]}</strong> — [Special pricing or package details]</p>
<p><strong>${niche.services[1]}</strong> — [Special pricing or package details]</p>
<p><strong>Bundle deal:</strong> Get both for [discounted price]</p>
</div>
<p>This special runs from [Start Date] to [End Date]. Appointments are filling up fast!</p>
<p style="text-align:center"><a href="[BOOKING LINK]" class="cta">Book Your [Season] Appointment →</a></p>
<p>Best,<br>[Your Name]</p>`,
    },
    {
      name: "Newsletter Template",
      subject: "[Month] update from [Your " + niche.singular + " Name]",
      body: `<p>Hi [First Name],</p>
<p>Here's what's new at [Your ${niche.singular} Name] this month:</p>
<h2>What's New</h2>
<p>[Share 1-2 updates about your business — new services, team members, achievements]</p>
<h2>Tip of the Month</h2>
<p>[Share a genuinely useful tip related to ${niche.contentPillars[0].toLowerCase()}. This should be something your audience can act on immediately.]</p>
<h2>Spotlight</h2>
<p>[Feature a client success story, team member, or community involvement]</p>
<h2>Special This Month</h2>
<div class="highlight">
<p>[Your monthly promotion or offer — keep it simple and compelling]</p>
</div>
<p style="text-align:center"><a href="[BOOKING LINK]" class="cta">Book Now →</a></p>
<p>Thanks for being part of our community!</p>
<p>Best,<br>[Your Name]</p>`,
    },
  ];
}

// ============================================================
// PRODUCT 3: Business Launch Document Kit
// ============================================================

async function generateInvoiceTemplate(niche: NicheData, dir: string) {
  const filePath = path.join(dir, "Invoice-Template.html");
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body{font-family:-apple-system,sans-serif;color:#1f2937;max-width:800px;margin:0 auto;padding:40px;}
.header{display:flex;justify-content:space-between;border-bottom:3px solid #4f46e5;padding-bottom:20px;margin-bottom:30px;}
.logo{font-size:24px;font-weight:700;color:#1e1b4b;}
.invoice-meta{text-align:right;font-size:14px;color:#6b7280;}
.invoice-meta strong{color:#1f2937;font-size:28px;display:block;margin-bottom:8px;}
table{width:100%;border-collapse:collapse;margin:24px 0;}
th{background:#f3f4f6;text-align:left;padding:12px;font-size:13px;text-transform:uppercase;color:#6b7280;border-bottom:2px solid #e5e7eb;}
td{padding:12px;border-bottom:1px solid #e5e7eb;font-size:14px;}
.total-row td{font-weight:700;font-size:16px;border-top:2px solid #1e1b4b;background:#f9fafb;}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;text-align:center;}
.notes{background:#f9fafb;padding:16px;border-radius:6px;margin-top:24px;font-size:13px;}
@media print{body{padding:20px;}}
</style></head><body>
<div class="header">
<div class="logo">[Your ${niche.singular} Name]</div>
<div class="invoice-meta">
<strong>INVOICE</strong>
Invoice #: [INV-001]<br>
Date: [Date]<br>
Due: [Due Date]
</div>
</div>
<div style="display:flex;justify-content:space-between;margin-bottom:30px;">
<div>
<strong>From:</strong><br>
[Your Business Name]<br>
[Your Address]<br>
[City, State ZIP]<br>
[Phone] · [Email]
</div>
<div style="text-align:right;">
<strong>Bill To:</strong><br>
[Client Name]<br>
[Client Address]<br>
[City, State ZIP]<br>
[Client Email]
</div>
</div>
<table>
<thead><tr><th>Service</th><th>Description</th><th>Qty</th><th style="text-align:right">Rate</th><th style="text-align:right">Amount</th></tr></thead>
<tbody>
<tr><td>${niche.services[0]}</td><td>[Description of work performed]</td><td>1</td><td style="text-align:right">$[X]</td><td style="text-align:right">$[X]</td></tr>
<tr><td>${niche.services[1]}</td><td>[Description of work performed]</td><td>1</td><td style="text-align:right">$[X]</td><td style="text-align:right">$[X]</td></tr>
<tr><td colspan="4" style="text-align:right;font-weight:600">Subtotal</td><td style="text-align:right">$[X]</td></tr>
<tr><td colspan="4" style="text-align:right">Tax ([X]%)</td><td style="text-align:right">$[X]</td></tr>
<tr class="total-row"><td colspan="4" style="text-align:right">TOTAL DUE</td><td style="text-align:right">$[X]</td></tr>
</tbody>
</table>
<div class="notes">
<strong>Payment Terms:</strong> Due within 30 days of invoice date.<br>
<strong>Payment Methods:</strong> Bank transfer, credit card, check, or [payment platform].<br>
<strong>Late Payment:</strong> A fee of 1.5% per month will be applied to overdue balances.
</div>
<div class="footer">
<p>[Your Business Name] · [Address] · [Phone] · [Email]</p>
<p>Thank you for your business!</p>
</div>
</body></html>`;
  fs.writeFileSync(filePath, html);
}

async function generateProposalTemplate(niche: NicheData, dir: string) {
  const filePath = path.join(dir, "Service-Proposal-Template.html");
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
body{font-family:-apple-system,sans-serif;color:#1f2937;max-width:800px;margin:0 auto;padding:40px;line-height:1.7;}
h1{font-size:28px;color:#1e1b4b;border-bottom:3px solid #4f46e5;padding-bottom:12px;}
h2{font-size:18px;color:#312e81;margin-top:30px;}
.highlight{background:#f0f0ff;border-left:4px solid #4f46e5;padding:16px;margin:16px 0;border-radius:0 6px 6px 0;}
.pricing{background:#1e1b4b;color:#fff;padding:24px;border-radius:8px;margin:24px 0;text-align:center;}
.pricing .amount{font-size:36px;font-weight:700;}
.footer{margin-top:40px;padding-top:20px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;}
table{width:100%;border-collapse:collapse;margin:16px 0;}
td{padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:14px;}
td:first-child{font-weight:600;width:40%;}
@media print{body{padding:20px;}}
</style></head><body>
<h1>Service Proposal for [Client Name]</h1>
<p><strong>Prepared by:</strong> [Your Name], [Your ${niche.singular} Name]<br>
<strong>Date:</strong> [Date]<br>
<strong>Valid until:</strong> [Date + 14 days]</p>

<h2>Understanding Your Needs</h2>
<p>Based on our conversation, you're looking for help with:</p>
<div class="highlight">
<ul>
<li>[Specific need #1 — e.g., "${niche.painPoints[0]}"]</li>
<li>[Specific need #2 — e.g., "${niche.painPoints[1]}"]</li>
<li>[Specific need #3]</li>
</ul>
</div>

<h2>Proposed Solution</h2>
<p>Here's what I recommend for [Client Name]:</p>
<table>
<tr><td>${niche.services[0]}</td><td>[Specific description of what this includes and how it addresses their needs]</td></tr>
<tr><td>${niche.services[1]}</td><td>[Specific description of what this includes and how it addresses their needs]</td></tr>
<tr><td>${niche.services[2] || "Additional service"}</td><td>[Specific description of what this includes]</td></tr>
</table>

<h2>Investment</h2>
<div class="pricing">
<p style="margin:0;font-size:14px;opacity:0.8;">Total Investment</p>
<p class="amount">$[Amount]</p>
<p style="margin:0;font-size:14px;opacity:0.8;">[per session / per month / one-time]</p>
</div>
<p><strong>What's included:</strong></p>
<ul>
<li>[Deliverable 1]</li>
<li>[Deliverable 2]</li>
<li>[Deliverable 3]</li>
<li>[Timeline: e.g., "Completed within 2 weeks"]</li>
</ul>

<h2>Why Choose Us</h2>
<ul>
<li>[X] years of experience with ${niche.label.toLowerCase()}</li>
<li>[Number] satisfied clients</li>
<li>[Specific credential, certification, or unique selling point]</li>
<li>100% satisfaction guarantee</li>
</ul>

<h2>Next Steps</h2>
<p>To get started, simply:</p>
<ol>
<li>Reply to this email or call [phone] to accept this proposal</li>
<li>[Complete deposit/booking/onboarding form]</li>
<li>We'll schedule your [first session/kickoff/delivery date]</li>
</ol>
<p>This proposal is valid for 14 days. I'm happy to answer any questions.</p>
<p><strong>[Your Name]</strong><br>[Your ${niche.singular} Name]<br>[Phone] · [Email]</p>
<div class="footer">This proposal is confidential and intended for the named recipient only.</div>
</body></html>`;
  fs.writeFileSync(filePath, html);
}

async function generateContractTemplate(niche: NicheData, dir: string) {
  const filePath = path.join(dir, "Client-Service-Agreement.pdf");
  const doc = await createPDF(filePath);

  pdfTitle(doc, `Client Service Agreement\n${niche.label}`);

  pdfBody(doc, `This Service Agreement ("Agreement") is entered into as of [Date] by and between:\n\n[Your Business Name] ("Service Provider"), located at [Your Address]\nand\n[Client Name] ("Client"), located at [Client Address]`);

  pdfH2(doc, "1. Services");
  pdfBody(doc, `Service Provider agrees to provide the following services to Client:`);
  niche.services.slice(0, 4).forEach((s) => pdfBullet(doc, s + " — [describe scope]"));

  pdfH2(doc, "2. Term");
  pdfBody(doc, "This Agreement begins on [Start Date] and continues for a period of [X months/until project completion]. Either party may terminate with [30 days] written notice.");

  pdfH2(doc, "3. Compensation");
  pdfBody(doc, "Client agrees to pay Service Provider $[Amount] [per session / per month / upon completion]. Payment is due within [30] days of invoice date. Late payments are subject to a 1.5% monthly fee.");

  pdfH2(doc, "4. Client Responsibilities");
  pdfBody(doc, "Client agrees to provide timely access to necessary information, materials, and approvals. Delays caused by Client may extend the project timeline.");

  pdfH2(doc, "5. Cancellation Policy");
  pdfBody(doc, "Cancellations must be made at least [24/48] hours in advance. Late cancellations or no-shows may be subject to a fee of [amount or percentage].");

  pdfH2(doc, "6. Confidentiality");
  pdfBody(doc, "Both parties agree to keep confidential any proprietary information shared during the course of this engagement.");

  pdfH2(doc, "7. Limitation of Liability");
  pdfBody(doc, "Service Provider's total liability shall not exceed the total fees paid under this Agreement.");

  pdfH2(doc, "8. Governing Law");
  pdfBody(doc, "This Agreement shall be governed by the laws of the State of [Your State].");

  doc.moveDown(1);
  pdfBody(doc, "______________________________          ______________________________");
  pdfBody(doc, "[Your Name], Service Provider              [Client Name], Client");
  pdfBody(doc, "Date: _____________                              Date: _____________");

  pdfFooter(doc);
  await finishPDF(doc);
}

// ============================================================
// PRODUCT 4: SEO Starter Toolkit
// ============================================================

function generateSEOKeywordCSV(niche: NicheData): string {
  const rows = ["Keyword,Search Intent,Competition Level,Content Idea,Priority,Content Type,Target Page"];
  niche.seoKeywords.forEach((kw, i) => {
    const priority = i < 3 ? "High" : i < 6 ? "Medium" : "Low";
    const contentType = kw.intent.includes("local") ? "Landing Page" : "Blog Post";
    const targetPage = kw.intent.includes("local") ? "Service page or Google Business" : "Blog";
    const escaped = (s: string) => `"${s.replace(/"/g, '""')}"`;
    rows.push(`${escaped(kw.keyword)},${escaped(kw.intent)},${escaped(kw.difficulty)},${escaped(kw.contentIdea)},${priority},${contentType},${targetPage}`);
  });
  return rows.join("\n");
}

async function generateSEOGuide(niche: NicheData, dir: string) {
  const filePath = path.join(dir, "SEO-Action-Plan.pdf");
  const doc = await createPDF(filePath);

  pdfTitle(doc, `SEO Starter Toolkit\nfor ${niche.label}`);
  pdfBody(doc, `This toolkit gives you everything you need to start ranking on Google for ${niche.label.toLowerCase()}-related searches. No technical background required.`);

  pdfH2(doc, "Step 1: Google Business Profile (Week 1)");
  pdfBody(doc, "Your Google Business Profile is the #1 ranking factor for local searches. Here's your checklist:");
  pdfBullet(doc, "Claim and verify your Google Business Profile");
  pdfBullet(doc, "Add all services: " + niche.services.slice(0, 4).join(", "));
  pdfBullet(doc, "Upload 20+ high-quality photos (interior, exterior, team, work samples)");
  pdfBullet(doc, "Write a keyword-rich business description (250+ words)");
  pdfBullet(doc, "Set accurate hours, phone, website, and service areas");
  pdfBullet(doc, "Post weekly Google Business updates (use your content calendar!)");
  pdfBullet(doc, "Respond to every review within 24 hours");

  pdfH2(doc, "Step 2: Website Optimization (Week 2)");
  pdfBullet(doc, "Homepage title tag: [Primary Service] in [City] | [Business Name]");
  pdfBullet(doc, "Add a unique page for each major service: " + niche.services.slice(0, 3).join(", "));
  pdfBullet(doc, "Include city/neighborhood names naturally in your content");
  pdfBullet(doc, "Add schema markup (LocalBusiness type) to your homepage");
  pdfBullet(doc, "Ensure mobile-friendly design and fast load speed (<3 seconds)");
  pdfBullet(doc, "Add an FAQ section with common questions (see keyword research file)");

  pdfH2(doc, "Step 3: Content Strategy (Ongoing)");
  pdfBody(doc, "Publish 1-2 blog posts per month targeting the keywords in your research file. Focus on:");
  pdfBullet(doc, "Answering questions your customers actually ask");
  pdfBullet(doc, "Long-form guides (1000+ words) with practical advice");
  pdfBullet(doc, "Local content: neighborhood guides, event coverage, community involvement");

  pdfH2(doc, "Step 4: Reviews Strategy");
  pdfBody(doc, "Google reviews directly impact your ranking. Target: 5+ new reviews per month.");
  pdfBullet(doc, "Ask every happy client for a review (in person is best)");
  pdfBullet(doc, "Send a follow-up email with direct Google review link");
  pdfBullet(doc, "Respond to all reviews — positive and negative — professionally");
  pdfBullet(doc, "Never buy fake reviews — Google detects and penalizes this");

  pdfH2(doc, "Step 5: Local Citations");
  pdfBody(doc, "List your business on these directories (ensure name, address, phone are identical everywhere):");
  pdfBullet(doc, "Yelp, Facebook, Apple Maps, Bing Places");
  pdfBullet(doc, "Industry-specific: [relevant directories for " + niche.label.toLowerCase() + "]");
  pdfBullet(doc, "Local: Chamber of Commerce, local business directories");

  pdfH2(doc, "Your Keyword Research");
  pdfBody(doc, "See the included CSV file for your full keyword research. Prioritize high-intent, low-competition keywords first.");

  pdfFooter(doc);
  await finishPDF(doc);
}

// ============================================================
// PRODUCT 5: Client Acquisition Playbook
// ============================================================

async function generateAcquisitionPlaybook(niche: NicheData, dir: string) {
  const filePath = path.join(dir, "Client-Acquisition-Playbook.pdf");
  const doc = await createPDF(filePath);

  pdfTitle(doc, `Client Acquisition Playbook\nfor ${niche.label}`);
  pdfBody(doc, `A step-by-step guide to finding, reaching, and converting new clients for your ${niche.singular}. Every script, template, and strategy has been tested with real businesses.`);

  pdfH2(doc, "Chapter 1: Finding Prospects");
  pdfH3(doc, "Where to find your ideal clients:");
  pdfBullet(doc, "Google Maps — search for businesses in your area that could use your services");
  pdfBullet(doc, "Facebook Groups — join local business owner and community groups");
  pdfBullet(doc, "LinkedIn — connect with local business owners and decision-makers");
  pdfBullet(doc, "Networking events — Chamber of Commerce, BNI groups, industry meetups");
  pdfBullet(doc, "Existing clients — your #1 source of referrals (see referral scripts below)");
  pdfBullet(doc, "Instagram/TikTok — engage with local accounts and potential clients");

  pdfH2(doc, "Chapter 2: Cold Outreach Scripts");
  pdfH3(doc, "Email Outreach Template #1 (The Audit Angle):");
  pdfBody(doc, `Subject: Quick thought about [Their Business Name]\n\nHi [Name],\n\nI was looking at [their business/website/social media] and noticed [specific observation]. ${niche.coldOutreachAngles[0]}\n\nWould it be helpful if I shared a few suggestions? No strings attached.\n\nBest,\n[Your Name]\n[Your Business]`);

  pdfH3(doc, "Email Outreach Template #2 (The Value-First Angle):");
  pdfBody(doc, `Subject: I put together something for [Their Business Name]\n\nHi [Name],\n\n${niche.coldOutreachAngles[1]}\n\nI put together a quick [audit/report/analysis] for [Their Business Name] — no cost, just thought it might be useful.\n\nWant me to send it over?\n\nBest,\n[Your Name]`);

  pdfH3(doc, "DM Script (Instagram/LinkedIn):");
  pdfBody(doc, `Hey [Name]! Love what you're doing with [specific thing about their business]. I work with ${niche.label.toLowerCase()} and had a quick idea that could help with [specific pain point]. Mind if I share?`);

  pdfH2(doc, "Chapter 3: Handling Objections");
  pdfBody(doc, "Every prospect will have concerns. Here's how to handle the most common ones:");
  niche.objections.forEach((obj) => {
    pdfH3(doc, `"${obj.objection}"`);
    pdfBody(doc, `Your response: ${obj.response}`);
  });

  pdfH2(doc, "Chapter 4: Referral System");
  pdfH3(doc, "The Ask (In Person):");
  pdfBody(doc, `"[Client Name], I'm so glad you're happy with [the result]. I'm actually looking to help more [business type] like yours this month. Do you know anyone who might be dealing with [pain point]? I'd love to help them out — and I'll [reward/discount] for you as a thank you."`);

  pdfH3(doc, "The Ask (Email):");
  pdfBody(doc, `Subject: Quick favor?\n\nHi [Client Name],\n\nThank you again for trusting us with your ${niche.services[0].toLowerCase()}. It's been great working with you!\n\nI have a small favor: if you know anyone who could use similar help, would you mind passing along my name? As a thank you, I'll give you [reward] for each referral who becomes a client.\n\nNo pressure at all — I just find that my best clients come from people like you.\n\nBest,\n[Your Name]`);

  pdfH2(doc, "Chapter 5: Follow-Up Framework");
  pdfBody(doc, "Most sales happen on the 5th-12th contact. Here's your follow-up cadence:");
  pdfBullet(doc, "Day 1: Initial outreach (email or DM)");
  pdfBullet(doc, "Day 3: Follow-up if no response (different angle)");
  pdfBullet(doc, "Day 7: Value add — share a helpful tip or resource");
  pdfBullet(doc, "Day 14: Social proof — share a client success story");
  pdfBullet(doc, "Day 21: Final check-in with a soft offer");
  pdfBullet(doc, "Day 30+: Add to monthly newsletter / nurture sequence");
  pdfBody(doc, "Key rule: Every follow-up must add value. Never just say 'checking in.'");

  pdfH2(doc, "Chapter 6: Pricing Your Services");
  pdfBullet(doc, "Research competitors in your area — price within 10-20% of the average");
  pdfBullet(doc, "Offer 3 tiers (Good/Better/Best) — most clients pick the middle");
  pdfBullet(doc, "Never discount your core price — instead, add bonuses to create value");
  pdfBullet(doc, "Create a package/bundle that increases average transaction value");
  pdfBullet(doc, "Test pricing quarterly — small increases (5-10%) rarely lose clients");

  pdfFooter(doc);
  await finishPDF(doc);
}

// ============================================================
// MAIN GENERATOR
// ============================================================

async function generateAllProducts() {
  console.log("🚀 Generating all NicheKit products...\n");
  ensureDir(PRODUCTS_DIR);

  for (const niche of NICHES) {
    console.log(`\n📦 Generating products for: ${niche.label}`);
    const nicheDir = path.join(PRODUCTS_DIR, niche.key);
    ensureDir(nicheDir);

    // Product 1: Content Calendar
    const calDir = path.join(nicheDir, "social-media-calendar");
    ensureDir(calDir);
    console.log("  ✓ Social Media Calendar CSV");
    fs.writeFileSync(path.join(calDir, `90-Day-Content-Calendar-${niche.label.replace(/\s+/g, "-")}.csv`), generateCalendarCSV(niche));
    console.log("  ✓ Calendar Guide PDF");
    await generateCalendarGuide(niche, calDir);

    // Product 2: Email Swipe File
    const emailDir = path.join(nicheDir, "email-swipe-file");
    ensureDir(emailDir);
    const templates = getEmailTemplates(niche);
    templates.forEach((t, i) => {
      const fileName = `${String(i + 1).padStart(2, "0")}-${t.name.replace(/[^a-zA-Z0-9]/g, "-")}.html`;
      fs.writeFileSync(path.join(emailDir, fileName), generateEmailHTML(t, niche));
    });
    console.log(`  ✓ Email Swipe File (${templates.length} templates)`);

    // Product 3: Business Document Kit
    const docDir = path.join(nicheDir, "business-document-kit");
    ensureDir(docDir);
    await generateInvoiceTemplate(niche, docDir);
    await generateProposalTemplate(niche, docDir);
    await generateContractTemplate(niche, docDir);
    console.log("  ✓ Business Document Kit (invoice, proposal, contract)");

    // Product 4: SEO Toolkit
    const seoDir = path.join(nicheDir, "seo-starter-toolkit");
    ensureDir(seoDir);
    fs.writeFileSync(path.join(seoDir, `SEO-Keywords-${niche.label.replace(/\s+/g, "-")}.csv`), generateSEOKeywordCSV(niche));
    await generateSEOGuide(niche, seoDir);
    console.log("  ✓ SEO Starter Toolkit (keywords CSV + action plan)");

    // Product 5: Client Acquisition Playbook
    const acqDir = path.join(nicheDir, "client-acquisition-playbook");
    ensureDir(acqDir);
    await generateAcquisitionPlaybook(niche, acqDir);
    console.log("  ✓ Client Acquisition Playbook");

    // Create ZIP bundles for each product
    const products = [
      { name: "Social-Media-Calendar", dir: calDir },
      { name: "Email-Swipe-File", dir: emailDir },
      { name: "Business-Document-Kit", dir: docDir },
      { name: "SEO-Starter-Toolkit", dir: seoDir },
      { name: "Client-Acquisition-Playbook", dir: acqDir },
    ];

    for (const prod of products) {
      const zipPath = path.join(nicheDir, `${prod.name}-${niche.label.replace(/\s+/g, "-")}.zip`);
      await zipDirectory(prod.dir, zipPath);
    }
    console.log("  ✓ ZIP bundles created");

    // Create complete bundle ZIP
    const bundlePath = path.join(PRODUCTS_DIR, `Complete-Bundle-${niche.label.replace(/\s+/g, "-")}.zip`);
    await zipDirectory(nicheDir, bundlePath);
    console.log("  ✓ Complete bundle ZIP");
  }

  console.log("\n✅ All products generated successfully!");
  console.log(`📁 Output: ${PRODUCTS_DIR}`);

  // Summary
  const totalProducts = NICHES.length * 5;
  const totalBundles = NICHES.length;
  console.log(`\n📊 Summary: ${totalProducts} individual products + ${totalBundles} bundles across ${NICHES.length} niches`);
}

generateAllProducts().catch(console.error);
