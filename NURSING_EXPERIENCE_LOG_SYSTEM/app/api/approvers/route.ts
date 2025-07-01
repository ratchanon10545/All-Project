import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest ) {
    
    const users = await prisma.approver.findMany()
    return NextResponse.json({users},{status:200})
}