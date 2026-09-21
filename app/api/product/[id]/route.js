import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    try {
        const { id } = context.params    
        const product = await prisma.products.findFirst({
            where: { id: Number(id) || 0 }
        })

        if (!product) return new NextResponse('Product not found', { status: 404 });

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong', { status: 500 });
    }
}
