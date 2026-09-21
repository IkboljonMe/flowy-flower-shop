import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";

// Always read fresh data from the database (do not cache at build time)
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const productsCount = await prisma.products.count();
        // Pick a start so we still get 5 products near the end of the list
        const skip = Math.floor(Math.random() * Math.max(productsCount - 5, 0));
        const products = await prisma.products.findMany({
            take: 5,
            skip: skip,
            orderBy: { id: 'asc' },
        })
        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong', { status: 500 });
    }
}
