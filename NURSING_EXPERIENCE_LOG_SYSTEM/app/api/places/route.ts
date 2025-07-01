import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const place = await prisma.place.findMany()

    return NextResponse.json({place},{status:200})
}