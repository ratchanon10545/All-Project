import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";
import {hash} from "bcrypt"

export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        
        for(let i = 0 ; i < body.length ; i++){
            const hashPassword = await hash(body[i].password.toString(), 10)
            body[i].password =  hashPassword
            body[i].id = parseInt(body[i].id)
        }
 
        const newUser = await prisma.test.createMany({
            data:body,
            skipDuplicates: true
        })
        

        return NextResponse.json({massage:'User created successfully'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}