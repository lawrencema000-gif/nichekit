import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
}) {
  const from = process.env.EMAIL_FROM || "NicheKit <onboarding@resend.dev>";
  const { data, error } = await getResend().emails.send({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    replyTo: "support@nichekit.co",
  });

  if (error) {
    console.error("Email send error:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

export function orderConfirmationEmail(data: {
  customerName: string;
  productName: string;
  niche: string;
  orderId: string;
}) {
  const { customerName, productName, niche, orderId } = data;
  const firstName = customerName.split(" ")[0] || "there";

  return {
    subject: `Your NicheKit is ready! Download inside`,
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
body{margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#e5e7eb;}
.container{max-width:600px;margin:0 auto;}
.header{background:linear-gradient(135deg,#1e1b4b,#312e81);padding:32px;text-align:center;border-radius:12px 12px 0 0;}
.header h1{margin:0;font-size:24px;color:#fff;}
.header .accent{color:#818cf8;}
.body{background:#1a1a2e;padding:32px;line-height:1.7;font-size:15px;}
.body h2{color:#fff;font-size:18px;margin:20px 0 8px;}
.cta{display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;margin:20px 0;}
.highlight{background:#1e1b4b;border-left:4px solid #6366f1;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;}
.footer{background:#111827;padding:24px 32px;text-align:center;font-size:12px;color:#6b7280;border-radius:0 0 12px 12px;}
.footer a{color:#818cf8;text-decoration:none;}
</style></head><body>
<div style="padding:20px;background:#0a0a0f;">
<div class="container">
<div class="header"><h1>Niche<span class="accent">Kit</span></h1></div>
<div class="body">
<p>Hi ${firstName},</p>
<p>Your purchase is confirmed! Here's what you got:</p>
<div class="highlight">
<strong>${productName}</strong><br>
Niche: ${niche}<br>
Order: #${orderId}
</div>

<h2>How to use your templates</h2>
<ol>
<li><strong>Download</strong> — Your files should be downloading automatically from LemonSqueezy. Check your downloads folder.</li>
<li><strong>Open</strong> — CSVs open in Google Sheets or Excel. PDFs open in any browser. HTML files open in any email tool.</li>
<li><strong>Customize</strong> — Replace all [bracketed text] with your business details.</li>
<li><strong>Launch</strong> — Start posting, emailing, and marketing!</li>
</ol>

<h2>Need help?</h2>
<p>Just reply to this email. I read every message and typically respond within a few hours.</p>

<p>Thanks for choosing NicheKit. You just saved yourself 40+ hours of marketing work.</p>
<p>— The NicheKit Team</p>
</div>
<div class="footer">
<p>NicheKit — Ready-made business templates</p>
<p><a href="https://nichekit.vercel.app">Website</a></p>
<p style="font-size:11px;margin-top:12px;">Order #${orderId}</p>
</div>
</div></div></body></html>`,
  };
}
