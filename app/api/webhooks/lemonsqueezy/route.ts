import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail, orderConfirmationEmail } from "@/lib/email";
import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(rawBody).digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
  } catch {
    return false;
  }
}

function detectPlan(productName: string, variantName: string): string {
  const combined = `${productName} ${variantName}`.toLowerCase();
  if (combined.includes("lifetime")) return "lifetime";
  if (combined.includes("pro")) return "pro";
  if (combined.includes("starter")) return "starter";
  return "starter";
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") || "";
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    console.error("[LemonSqueezy] LEMON_SQUEEZY_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  if (!signature || !verifySignature(rawBody, signature, secret)) {
    console.error("[LemonSqueezy] Invalid webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventName = event.meta?.event_name;
  const data = event.data;
  const attrs = data?.attributes;
  const supabase = createAdminClient();

  console.log(`[LemonSqueezy] Event: ${eventName}, ID: ${data?.id}`);

  switch (eventName) {
    case "order_created": {
      if (!attrs) break;

      const customerEmail = attrs.user_email;
      const customerName = attrs.user_name || customerEmail?.split("@")[0] || "Customer";
      const orderId = String(data.id);
      const productName = attrs.first_order_item?.product_name || "NicheKit";
      const variantName = attrs.first_order_item?.variant_name || "";
      const amountCents = attrs.total || 0;

      // Store order
      await supabase.from("orders").insert({
        lemon_order_id: orderId,
        customer_email: customerEmail,
        product_name: productName,
        variant_name: variantName,
        amount_cents: amountCents,
      });

      // Send confirmation email
      if (customerEmail) {
        try {
          const email = orderConfirmationEmail({
            customerName,
            productName,
            niche: variantName || productName,
            orderId,
          });
          await sendEmail({ to: customerEmail, subject: email.subject, html: email.html });
          console.log(`[LemonSqueezy] Confirmation sent to ${customerEmail}`);
        } catch (err) {
          console.error("[LemonSqueezy] Email failed:", err);
        }
      }

      console.log(`[LemonSqueezy] Order #${orderId}: ${productName} — ${customerEmail}`);
      break;
    }

    case "subscription_created": {
      if (!attrs) break;

      const customerEmail = attrs.user_email;
      const productName = attrs.product_name || "";
      const variantName = attrs.variant_name || "";
      const plan = detectPlan(productName, variantName);
      const customerId = String(attrs.customer_id);
      const subscriptionId = String(data.id);

      // Find user by email and update their plan
      const { data: profiles } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("email", customerEmail)
        .limit(1);

      if (profiles && profiles.length > 0) {
        await supabase.from("user_profiles").update({
          plan,
          lemon_customer_id: customerId,
          lemon_subscription_id: subscriptionId,
          subscription_status: "active",
          consultation_credits: plan === "pro" ? 1 : 0,
          updated_at: new Date().toISOString(),
        }).eq("id", profiles[0].id);

        console.log(`[LemonSqueezy] Subscription activated: ${customerEmail} → ${plan}`);
      } else {
        // Store orphaned subscription for manual recovery
        await supabase.from("orders").insert({
          lemon_order_id: `orphan_sub_${subscriptionId}`,
          customer_email: customerEmail || "unknown",
          product_name: `Orphaned subscription: ${productName} (${plan})`,
          variant_name: variantName,
          amount_cents: 0,
          status: "pending",
        });
        console.warn(`[LemonSqueezy] ORPHANED: No user for ${customerEmail} — sub ${subscriptionId} stored for recovery`);
      }

      break;
    }

    case "subscription_updated": {
      if (!attrs) break;

      const subscriptionId = String(data.id);
      const status = attrs.status; // active, past_due, cancelled, expired
      const endsAt = attrs.ends_at || attrs.renews_at;

      const mappedStatus = status === "active" ? "active"
        : status === "past_due" ? "past_due"
        : status === "cancelled" || status === "expired" ? "cancelled"
        : "inactive";

      // Reset consultation credits on renewal (status goes back to active)
      const creditReset = status === "active" ? { consultation_credits: 1 } : {};

      await supabase.from("user_profiles").update({
        subscription_status: mappedStatus,
        subscription_ends_at: endsAt,
        ...creditReset,
        updated_at: new Date().toISOString(),
      }).eq("lemon_subscription_id", subscriptionId);

      console.log(`[LemonSqueezy] Subscription ${subscriptionId} → ${mappedStatus}`);
      break;
    }

    case "subscription_cancelled": {
      const subscriptionId = String(data?.id);

      await supabase.from("user_profiles").update({
        subscription_status: "cancelled",
        updated_at: new Date().toISOString(),
      }).eq("lemon_subscription_id", subscriptionId);

      console.log(`[LemonSqueezy] Subscription cancelled: ${subscriptionId}`);
      break;
    }

    case "subscription_expired": {
      const subscriptionId = String(data?.id);

      await supabase.from("user_profiles").update({
        plan: "free",
        subscription_status: "inactive",
        lemon_subscription_id: null,
        consultation_credits: 0,
        updated_at: new Date().toISOString(),
      }).eq("lemon_subscription_id", subscriptionId);

      console.log(`[LemonSqueezy] Subscription expired: ${subscriptionId} → free`);
      break;
    }

    case "subscription_paused": {
      const subscriptionId = String(data?.id);
      await supabase.from("user_profiles").update({
        subscription_status: "inactive",
        updated_at: new Date().toISOString(),
      }).eq("lemon_subscription_id", subscriptionId);
      console.log(`[LemonSqueezy] Subscription paused: ${subscriptionId}`);
      break;
    }

    case "subscription_resumed": {
      const subscriptionId = String(data?.id);
      await supabase.from("user_profiles").update({
        subscription_status: "active",
        updated_at: new Date().toISOString(),
      }).eq("lemon_subscription_id", subscriptionId);
      console.log(`[LemonSqueezy] Subscription resumed: ${subscriptionId}`);
      break;
    }

    case "order_refunded": {
      const orderId = String(data?.id);
      await supabase.from("orders").update({ status: "refunded" }).eq("lemon_order_id", orderId);
      console.log(`[LemonSqueezy] Refund: Order #${orderId}`);
      break;
    }

    default:
      console.log(`[LemonSqueezy] Unhandled event: ${eventName}`);
  }

  return NextResponse.json({ received: true });
}
