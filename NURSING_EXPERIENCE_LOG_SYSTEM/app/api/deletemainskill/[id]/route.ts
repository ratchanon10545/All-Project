import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export async function DELETE(request: NextRequest, {params} : any) {
    try{
        const deletelog = await prisma.skills.delete({
            where:{
                id : parseInt(params.id)
            },
        })
        return NextResponse.json({deletelog,massage:'success delete'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}