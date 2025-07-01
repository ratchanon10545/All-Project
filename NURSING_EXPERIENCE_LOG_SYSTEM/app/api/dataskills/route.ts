import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const mainskills = await prisma.skills.findMany()
    const subskills = await prisma.subskills.findMany({select:{id: true,subskill:true,skillsid:true,code:true}})
    return NextResponse.json({main:mainskills,sub:subskills},{status:200})
}