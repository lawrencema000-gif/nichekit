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
    replyTo: process.env.REPLY_TO_EMAIL || "support@nichekit.co",
  });

  if (error) {
    console.error("Email send error:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nichekit.vercel.app").trim();

export function orderConfirmationEmail(data: {
  customerName: string;
  productName: string;
  niche: string;
  orderId: string;
}) {
  const { customerName, productName, niche, orderId } = data;
  const firstName = customerName.split(" ")[0] || "there";

  return {
    subject: `Your NicheKit is ready — download inside`,
    html: `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
body{margin:0;padding:0;background:#F5F0EB;font-family:'DM Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1A1A1A;}
.container{max-width:580px;margin:0 auto;}
.header{background:#1A1A1A;padding:28px 32px;text-align:center;border-radius:12px 12px 0 0;}
.header h1{margin:0;font-size:22px;color:#FDFBF7;font-family:'DM Serif Display',Georgia,serif;font-weight:400;letter-spacing:0.5px;}
.body{background:#FDFBF7;padding:32px;line-height:1.7;font-size:15px;color:#4A4A4A;}
.body h2{color:#1A1A1A;font-size:17px;font-family:'DM Serif Display',Georgia,serif;font-weight:400;margin:24px 0 8px;}
.body a{color:#C45D3E;text-decoration:none;}
.cta{display:inline-block;background:#C45D3E;color:#fff!important;padding:14px 32px;border-radius:100px;text-decoration:none!important;font-weight:600;font-size:15px;margin:20px 0;}
.highlight{background:#F5F0EB;border-left:4px solid #C45D3E;padding:16px;border-radius:0 8px 8px 0;margin:16px 0;color:#1A1A1A;}
.footer{background:#F5F0EB;padding:24px 32px;text-align:center;font-size:12px;color:#8A8A8A;border-radius:0 0 12px 12px;border-top:1px solid #E0D8CE;}
.footer a{color:#C45D3E;text-decoration:none;}
ol{padding-left:20px;}
ol li{margin-bottom:8px;}
</style></head><body>
<div style="padding:20px;background:#F5F0EB;">
<div class="container">
<div class="header"><h1>NicheKit</h1></div>
<div class="body">
<p>Hi ${firstName},</p>
<p>Your purchase is confirmed! Here&rsquo;s what you got:</p>
<div class="highlight">
<strong>${productName}</strong><br>
Niche: ${niche}<br>
Order: #${orderId}
</div>

<h2>How to use your templates</h2>
<ol>
<li><strong>Download</strong> &mdash; Your files should be downloading automatically from LemonSqueezy. Check your downloads folder.</li>
<li><strong>Open</strong> &mdash; CSVs open in Google Sheets or Excel. PDFs open in any browser. HTML files open in any email tool.</li>
<li><strong>Customize</strong> &mdash; Replace all [bracketed text] with your business details.</li>
<li><strong>Launch</strong> &mdash; Start posting, emailing, and marketing!</li>
</ol>

<h2>Need help?</h2>
<p>Just reply to this email. I read every message and typically respond within a few hours.</p>

<p>Thanks for choosing NicheKit. You just saved yourself 40+ hours of marketing work.</p>
<p style="color:#1A1A1A;">&mdash; The NicheKit Team</p>
</div>
<div class="footer">
<p>NicheKit &mdash; Ready-made business templates</p>
<p><a href="${SITE_URL}">Website</a></p>
<p style="font-size:11px;margin-top:12px;">Order #${orderId}</p>
</div>
</div></div></body></html>`,
  };
}
