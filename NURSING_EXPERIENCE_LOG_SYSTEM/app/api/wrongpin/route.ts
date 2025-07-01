import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        
        const newUser = await prisma.wrongPin.create({
            data:{
                StudentName : body.StudentName,
                ApproverName : body.ApproverName,
                WrongPin : body.Pin
            }
        })

        return NextResponse.json({newUser, massage:'created successfully'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}