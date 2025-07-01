import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { Status } from "@prisma/client";
import { compare } from "bcrypt";

export async function PUT(request: NextRequest) {
    try{
        const body = await request.json()
        const now = new Date()
        const listId = body.listId
        const checkPin = await prisma.approver.findUnique({
            where:{
                id : parseInt(body.Aid)
            },
            select:{
                Pin:true
            }
        }
        )
        if (checkPin){
            const passwordMatch = await compare(body.Pin, checkPin.Pin)
            if(passwordMatch){
                listId.forEach(async (Id: number) => {
                    const updateApprove = await prisma.practiceLog.update({
                        where:{
                            id : Id
                        },
                        data:{
                            Status : "APPROVED",
                            approvedAt:now
                        }
                    })
                });
                
                return NextResponse.json({message:'Update done'},{status:201});
            }
            else{
                const count = body.count + 1
                return NextResponse.json({message:'รหัสไม่ถูกต้อง',count:count},{status:500});
            }
            
        }
        else{
            return NextResponse.json({message:'ไม่มีข้อมูล'},{status:500});
        }
        

    }
    catch(error){
        return NextResponse.json({error:error,message:'Something went wrong!'},{status:500});
    }
}