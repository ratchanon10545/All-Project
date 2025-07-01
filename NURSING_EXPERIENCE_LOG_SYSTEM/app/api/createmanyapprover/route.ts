import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";
import {hash} from "bcrypt"

export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        
        for(let i = 0 ; i < body.length ; i++){
            const hashPassword = await hash(body[i].Pin.toString(), 10)
            body[i].Pin =  hashPassword
        }
 
        const newUser = await prisma.approver.createMany({
            data:body,
            skipDuplicates: true
        })

        return NextResponse.json({massage:'approver created successfully'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}