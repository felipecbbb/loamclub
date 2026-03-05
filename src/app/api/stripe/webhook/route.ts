import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SubscriptionPlan, SubscriptionStatus } from "@/types/database";
import Stripe from "stripe";

function getSubscriptionData(subscription: Stripe.Subscription) {
  const item = subscription.items.data[0];
  const priceId = item.price.id;
  const plan: SubscriptionPlan =
    priceId === process.env.STRIPE_PRICE_PLUS ? "plus" : "base";

  return {
    stripe_subscription_id: subscription.id,
    stripe_price_id: priceId,
    plan,
    status: subscription.status as SubscriptionStatus,
    current_period_start: new Date(
      item.current_period_start * 1000
    ).toISOString(),
    current_period_end: new Date(
      item.current_period_end * 1000
    ).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
  };
}

function getSubscriptionIdFromInvoice(
  invoice: Stripe.Invoice
): string | null {
  const details = invoice.parent?.subscription_details;
  if (!details) return null;
  return typeof details.subscription === "string"
    ? details.subscription
    : details.subscription?.id ?? null;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createAdminClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription" || !session.subscription) break;

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        const customerId = subscription.customer as string;
        const supabaseUserId = session.metadata?.supabase_user_id;

        if (supabaseUserId) {
          await supabase
            .from("profiles")
            .update({ stripe_customer_id: customerId })
            .eq("id", supabaseUserId);
        }

        await supabase.from("subscriptions").upsert(
          {
            user_id: supabaseUserId!,
            ...getSubscriptionData(subscription),
          },
          { onConflict: "stripe_subscription_id" }
        );
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = getSubscriptionIdFromInvoice(invoice);
        if (!subId) break;

        const subscription = await stripe.subscriptions.retrieve(subId);
        const data = getSubscriptionData(subscription);

        await supabase
          .from("subscriptions")
          .update({
            status: "active",
            current_period_start: data.current_period_start,
            current_period_end: data.current_period_end,
          })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId = getSubscriptionIdFromInvoice(invoice);
        if (!subId) break;

        await supabase
          .from("subscriptions")
          .update({ status: "past_due" })
          .eq("stripe_subscription_id", subId);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        await supabase
          .from("subscriptions")
          .update(getSubscriptionData(subscription))
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await supabase
          .from("subscriptions")
          .update({ status: "canceled" })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }
    }
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
