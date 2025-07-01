import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const practiceLog = await prisma.practiceLog.findMany()
    return NextResponse.json({practiceLog},{status:200})
}