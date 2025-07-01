import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        const {mainskills} = body
        
        
        const newMainskills = await prisma.skills.create({
           data:{
                mainskills
           }
        })
        

        return NextResponse.json({Mainskills: newMainskills, massage:'Mainskills created successfully'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}