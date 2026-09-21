import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
    const supabase = createServerComponentClient({ cookies })

    try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return new NextResponse('Unauthorized', { status: 401 });
        
        const res = await prisma.addresses.findFirst({
            where: { user_id: user.id }
        })
        
        return NextResponse.json(res);
    } catch (error) {
        console.error(error);
        return new NextResponse('Something went wrong', { status: 500 });
    }
}
