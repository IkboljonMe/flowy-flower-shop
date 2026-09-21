import Stripe from "stripe";
import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const productIds = (body.products || []).map((prod) => Number(prod.id));
    if (productIds.some((id) => !Number.isInteger(id))) {
      return new NextResponse("Product not found", { status: 400 });
    }

    // Never trust the price from the browser. Get the real prices from the database.
    const products = await prisma.products.findMany({
      where: { id: { in: productIds } },
    });

    let amount = 0;
    for (const id of productIds) {
      const product = products.find((prod) => prod.id === id);
      if (!product) {
        return new NextResponse("Product not found", { status: 400 });
      }
      amount += product.price;
    }

    if (amount <= 0) {
      return new NextResponse("Cart is empty", { status: 400 });
    }

    // Stripe metadata values can be at most 500 characters
    const productIdsText = productIds.join(",");
    if (productIdsText.length > 500) {
      return new NextResponse("Too many items in the cart", { status: 400 });
    }

    const stripe = new Stripe(process.env.STRIPE_SK_KEY || "");

    const res = await stripe.paymentIntents.create({
      amount: amount,
      currency: "pln",
      automatic_payment_methods: { enabled: true },
      metadata: {
        user_id: user.id,
        product_ids: productIdsText,
      },
    });

    return NextResponse.json({ client_secret: res.client_secret });
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
