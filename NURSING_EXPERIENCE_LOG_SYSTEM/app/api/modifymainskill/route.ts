import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"


export async function PUT(request: NextRequest) {
    try{
        const body = await request.json()
        
        
        const updateuser = await prisma.skills.update({
            where:{
                id : body.oldid
            },
            data:{
                id : parseInt(body.id),
                mainskills : body.mainskills
            }
        })
        
        return NextResponse.json({updateuser},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}