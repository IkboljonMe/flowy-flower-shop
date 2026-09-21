import Stripe from "stripe";
import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
    const supabase = createServerComponentClient({ cookies })

    try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return new NextResponse('Unauthorized', { status: 401 });

        const body = await req.json();
        if (!body.stripe_id) return new NextResponse('Missing payment id', { status: 400 });

        // Check with Stripe that this payment is real, paid and belongs to this user
        const stripe = new Stripe(process.env.STRIPE_SK_KEY || "");
        const paymentIntent = await stripe.paymentIntents.retrieve(String(body.stripe_id));

        if (paymentIntent.status !== 'succeeded' || paymentIntent.metadata.user_id !== user.id) {
            return new NextResponse('Payment not valid', { status: 400 });
        }

        const existingOrder = await prisma.orders.findFirst({
            where: { stripe_id: paymentIntent.id }
        })
        if (existingOrder) {
            return new NextResponse('Order already exists', { status: 409 });
        }

        // Products and total come from the payment, not from the browser
        const productIds = paymentIntent.metadata.product_ids.split(',').map(Number);

        await prisma.orders.create({
            data: {
                user_id: user.id,
                stripe_id: paymentIntent.id,
                name: body.name,
                address: body.address,
                zipcode: body.zipcode,
                city: body.city,
                country: body.country,
                total: paymentIntent.amount,
                orderItem: {
                    create: productIds.map(id => ({ product_id: id }))
                }
            }
        })

        return NextResponse.json('Order Complete', { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong', { status: 500 });
    }
}
