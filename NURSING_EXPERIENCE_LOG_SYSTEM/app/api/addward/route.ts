import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        const {ward,placeid} = body
    
        const newWard = await prisma.ward.create({
            data:{
                ward,
                placeid:parseInt(placeid)
            }
        }) 
        

        return NextResponse.json({ward:newWard, massage:'Ward created successfully'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}