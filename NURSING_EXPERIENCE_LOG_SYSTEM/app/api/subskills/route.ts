import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"


interface Index{
    code: any;
}

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest ) {
    
    const subskills = await prisma.subskills.findMany({
        select:{
            id : true,
            subskill:true,
            reqSubject:true,
            reqProgram:true,
            code : true,
            skillsid:true
        }
    })
    
    return NextResponse.json({subskills},{status:200})
}