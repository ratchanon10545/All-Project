import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        const {subskill,reqSubject,reqProgram,code,skillsid} = body
        console.log(body)
        const newSubskill = await prisma.subskills.create({
            data:{
                subskill,
                reqSubject : parseInt(reqSubject),
                reqProgram : parseInt(reqProgram),
                code,
                skillsid : parseInt(skillsid)
            }
        }) 
        

        return NextResponse.json({Subskill:newSubskill, massage:'Subskill created successfully'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}