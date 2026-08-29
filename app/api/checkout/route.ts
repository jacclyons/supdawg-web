import { NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import type { CartItem } from "@/lib/cart-store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!isStripeConfigured) {
    return NextResponse.json(
      { error: "Stripe isn't set up yet. Add STRIPE_SECRET_KEY to .env.local to enable checkout." },
      { status: 503 }
    );
  }

  const { items } = (await req.json()) as { items: CartItem[] };
  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: items.map((i) => ({
      quantity: i.quantity,
      price_data: {
        currency: "usd",
        unit_amount: i.price_cents,
        product_data: { name: i.name, images: [i.image_url] },
      },
    })),
    success_url: `${origin}/?checkout=success`,
    cancel_url: `${origin}/?checkout=cancelled`,
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
  });

  return NextResponse.json({ url: session.url });
}
