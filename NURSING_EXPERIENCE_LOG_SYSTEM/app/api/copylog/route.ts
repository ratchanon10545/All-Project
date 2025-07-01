import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        
        const newLog = await prisma.practiceLog.create({
                data:{
                    Sid : body.Sid,
                    StudentName : body.Sname,
                    Date : body.Date,
                    Place : body.Place,
                    Ward : body.Ward,
                    Bed : body.Bed,
                    MainSkill : body.MainSkill,
                    SubSkill : body.SubSkill,
                    SkillOther : body.SkillOther,
                    ApproverType : body.ApproverType,
                    Aid : body.Aid,
                    ApproverName : body.ApproverName,
                    Code : body.Code
                }   
            })
        
    
        return  NextResponse.json({massage:'Log created successfully'},{status:201})

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}