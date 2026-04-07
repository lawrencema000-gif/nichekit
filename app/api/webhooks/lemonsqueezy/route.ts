import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail, orderConfirmationEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") || "";
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || "";

  if (secret && signature) {
    const valid = verifySignature(rawBody, signature, secret);
    if (!valid) {
      console.error("Invalid LemonSqueezy webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = event.meta?.event_name;
  const data = event.data;

  console.log(`[LemonSqueezy] Event: ${eventName}, Order: ${data?.id}`);

  switch (eventName) {
    case "order_created": {
      const attrs = data?.attributes;
      if (!attrs) break;

      const customerEmail = attrs.user_email;
      const customerName = attrs.user_name || attrs.user_email?.split("@")[0] || "Customer";
      const orderId = String(data.id);
      const productName = attrs.first_order_item?.product_name || "NicheKit Bundle";
      const variantName = attrs.first_order_item?.variant_name || "";

      // Extract niche from variant name or product name
      const niche = variantName || productName;

      if (customerEmail) {
        try {
          const email = orderConfirmationEmail({
            customerName,
            productName,
            niche,
            orderId,
          });
          await sendEmail({
            to: customerEmail,
            subject: email.subject,
            html: email.html,
          });
          console.log(`[LemonSqueezy] Confirmation email sent to ${customerEmail}`);
        } catch (err) {
          console.error("[LemonSqueezy] Failed to send confirmation email:", err);
        }
      }

      console.log(`[LemonSqueezy] Order #${orderId}: ${productName} (${niche}) — ${customerEmail}`);
      break;
    }

    case "order_refunded": {
      const attrs = data?.attributes;
      console.log(`[LemonSqueezy] Refund: Order #${data?.id} — ${attrs?.user_email}`);
      break;
    }

    case "subscription_created":
    case "subscription_updated":
    case "subscription_cancelled": {
      // Future: if we add subscription products
      console.log(`[LemonSqueezy] Subscription event: ${eventName}`);
      break;
    }

    default:
      console.log(`[LemonSqueezy] Unhandled event: ${eventName}`);
  }

  return NextResponse.json({ received: true });
}
