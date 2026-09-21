import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";

// Always read fresh data from the database (do not cache at build time)
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const products = await prisma.products.findMany()
        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong', { status: 500 });
    }
}
