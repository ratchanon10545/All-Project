import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export async function PUT(request: NextRequest) {
    try{
        const body = await request.json()
        const now = new Date()
        const updatelog = await prisma.practiceLog.update({
            where:{
                id : body.id
            },
            data:{
                Date:body.Date,
                Place : body.place,
                Ward : body.ward,
                Bed : body.Bed,
                MainSkill : body.mainskill,
                SubSkill : body.subskill,
                ApproverType : body.approverType2,
                ApproverName : body.approverName,
                Code : body.code,
                Aid:body.Aid,
                modifyAt:now 
            }
        })
        return NextResponse.json({updatelog},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}