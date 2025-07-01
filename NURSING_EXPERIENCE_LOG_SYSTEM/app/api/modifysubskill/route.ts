import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import {hash} from "bcrypt"

export async function PUT(request: NextRequest) {
    try{
        const body = await request.json()
        
        
        const updateuser = await prisma.subskills.update({
            where:{
                id : body.oldid
            },
            data:{
                id : parseInt(body.id),
                subskill : body.subskill,
                reqProgram : parseInt(body.reqProgram),
                reqSubject : parseInt(body.reqSubject),
                code : body.code,
                skillsid : parseInt(body.skillsid)
            }
        })
        
        return NextResponse.json({updateuser},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}