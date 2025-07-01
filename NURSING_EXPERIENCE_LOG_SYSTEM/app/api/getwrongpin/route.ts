import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export const dynamic = 'force-dynamic';

export async function GET() {
    
    const users= await prisma.wrongPin.findMany()
    
    return NextResponse.json({users},{status:200})
}