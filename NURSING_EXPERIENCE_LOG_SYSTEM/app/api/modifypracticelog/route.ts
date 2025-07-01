import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function PUT(request: NextRequest){
    try{
        const body = await request.json()
        const now = new Date()
           const newLog = await prisma.practiceLog.update({
                where:{
                    id : body.oldid
                },
                data:{
                    id : parseInt(body.id),
                    Sid : parseInt(body.Sid),
                    StudentName : body.StudentName,
                    Date : body.Date,
                    Place : body.Place,
                    PlaceOther: body.PlaceOther,
                    Ward : body.Ward,
                    WardOther : body.WardOther,
                    Bed : body.Bed,
                    MainSkill : body.MainSkill,
                    SubSkill : body.SubSkill,
                    SkillOther : body.SkillOther,
                    ApproverType : body.type,
                    Aid : body.Aid,
                    ApproverName : body.ApproverName,
                    Code : body.Code,
                    Status : body.Status,
                    modifyAt:now
                }   
            })
        
    
        return  NextResponse.json({massage:'Log update successfully'},{status:201})

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}