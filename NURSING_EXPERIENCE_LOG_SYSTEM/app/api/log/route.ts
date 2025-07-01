import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";
import {hash} from "bcrypt"
import { brotliDecompress } from "zlib";



interface Props{
    Sid : number,
    SName : string,
    formData : any
    mainskillName : string
    subskillName : string
    type : string
}
export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        
           const newLog = await prisma.practiceLog.create({
                data:{
                    Sid : body.Sid,
                    StudentName : body.SName,
                    Date : body.Date,
                    Place : body.Place,
                    PlaceOther: body.PlaceOther,
                    Ward : body.Ward,
                    WardOther : body.WardOther,
                    Bed : body.Bed,
                    MainSkill : body.mainskillName,
                    SubSkill : body.subskillName,
                    SkillOther : body.SkillOther,
                    ApproverType : body.type,
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