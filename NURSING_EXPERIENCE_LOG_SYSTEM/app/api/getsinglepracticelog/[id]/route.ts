import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"


export async function GET(request: NextRequest , {params}:any ) {
    
    const user = await prisma.practiceLog.findUnique({
        where:{
            id : parseInt(params.id)
        }
    })
    
    return NextResponse.json({user},{status:200})
}