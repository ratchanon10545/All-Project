import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

interface Props{
    Sid : number
}

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const getid = searchParams.get('id')
    const getSid = searchParams.get('Sid')
    var id = 0
    var Sid = 0
    if (getid !== null){
        id = parseInt(getid)
    }
    if (getSid !== null){
        Sid = parseInt(getSid)
    }
    if(id !== 0){
        const log = await prisma.practiceLog.findMany({
            where:{
                id : id,
                Sid : Sid,
                Status : "WAIT"
            },
            select:{
                id:true,
                Sid : true,
                Date : true,
                Place : true,
                Ward : true,
                Bed : true,
                MainSkill : true,
                SubSkill : true,
                SkillOther : true,
                ApproverType : true,
                ApproverName : true,
                Aid : true,
                Code : true
            }
        })
        
        return NextResponse.json({log},{status:200})
    }
    else{
        return NextResponse.json({massege:"No id"},{status:500})
    }
    
}