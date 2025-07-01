import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const place = await prisma.place.findMany()
    const ward = await prisma.ward.findMany()
    return NextResponse.json({place:place,ward:ward},{status:200})
}