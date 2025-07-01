import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function POST(request: NextRequest){
    try{
        const body = await request.json()

        for(let i = 0 ; i < body.length ; i++){
            const newDate = new Date(body[i].Date)
            newDate.setDate(newDate.getDate() + 1)
            const newdate = newDate.toLocaleString([],{year: 'numeric', month: 'numeric', day: 'numeric'})
            body[i].Date =  newdate
        }

        const newUser = await prisma.practiceLog.createMany({
            data:body,
            skipDuplicates: true
        })

        return NextResponse.json({massage:'Log created successfully'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}