import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import {hash} from "bcrypt"

export async function PUT(request: NextRequest) {
    try{
        const body = await request.json()
        
        if(body.newPin === ''){
            var hashPassword = body.Pin
        }
        else{
            hashPassword = await hash(body.newPin, 10)
            
        }
        
        const updateuser = await prisma.approver.update({
            where:{
                id : body.oldid
            },
            data:{
                id : parseInt(body.id),
                name : body.name,
                type : parseInt(body.type),
                Pin : hashPassword,
            }
        })
        const {Pin:newUserPassword, ...rest} = updateuser;
        return NextResponse.json({rest},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}