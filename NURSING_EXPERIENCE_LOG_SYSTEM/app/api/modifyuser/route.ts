import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import {hash} from "bcrypt"

export async function PUT(request: NextRequest) {
    try{
        const body = await request.json()
        
        if(body.newpassword === ''){
            var hashPassword = body.password
        }
        else{
            hashPassword = await hash(body.newpassword, 10)
            
        }
        
        const updateuser = await prisma.test.update({
            where:{
                id : body.oldid
            },
            data:{
                id : parseInt(body.id),
                name : body.name,
                email : body.email,
                password : hashPassword,
                role : body.role
            }
        })
        const {password:newUserPassword, ...rest} = updateuser;
        return NextResponse.json({rest},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}