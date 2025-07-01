import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const ward = await prisma.ward.findMany()

    return NextResponse.json({ward},{status:200})
}