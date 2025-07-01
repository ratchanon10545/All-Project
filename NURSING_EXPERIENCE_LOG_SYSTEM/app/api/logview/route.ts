import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const getid = searchParams.get('id')
    var id = 0
    if (getid !== null){
        id = parseInt(getid)
    }
    if(id !== 0){
        const log = await prisma.practiceLog.findMany({
            where:{
                Sid : id
            },
            select:{
                id:true,
                Date : true,
                Place : true,
                PlaceOther : true,
                Ward : true,
                WardOther : true,
                Bed : true,
                MainSkill : true,
                SubSkill : true,
                SkillOther : true,
                ApproverName : true,
                Status : true,
                Aid : true
            },
            orderBy:{
                id : 'desc'
            }
            
        })
        return NextResponse.json({log},{status:200})
    }
    else{
        return NextResponse.json({massege:"No id"},{status:500})
    }
    
}