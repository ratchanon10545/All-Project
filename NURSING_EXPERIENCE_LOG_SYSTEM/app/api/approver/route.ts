import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const approver = await prisma.approver.findMany(
        {
            select:{
                id : true,
                name : true,
                type : true
            }
        }
    )
    return NextResponse.json({approver},{status:200})
}