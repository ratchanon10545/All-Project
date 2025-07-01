import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        
        const newUser = await prisma.skills.createMany({
            data:body,
            skipDuplicates: true
        })

        return NextResponse.json({massage:'approver created successfully'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}