import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest ) {
    
    const mainskills = await prisma.skills.findMany()

    return NextResponse.json({mainskills},{status:200})
}