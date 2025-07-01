import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";
import {hash} from "bcrypt"

export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        const {name,type,Pin} = body
        
        const hashPassword = await hash(Pin, 10)
        const newApprover = await prisma.approver.create({
           data:{
            name,
            type : parseInt(type),
            Pin : hashPassword
           }
        })
        const {Pin:newApproverPin, ...rest} = newApprover;

        return NextResponse.json({user: rest, massage:'Approver created successfully'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}