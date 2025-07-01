import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        const {Place} = body
        
        
        const newPlace = await prisma.place.create({
           data:{
            Place
           }
        })
        

        return NextResponse.json({Place: newPlace, massage:'Place created successfully'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}