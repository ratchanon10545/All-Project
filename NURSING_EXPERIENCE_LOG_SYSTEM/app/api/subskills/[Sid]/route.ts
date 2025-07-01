import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { listClasses } from "@mui/material";
import { string } from "zod";
import { TEMPORARY_REDIRECT_STATUS } from "next/dist/shared/lib/constants";

interface Index{
    code: any;
}

export async function GET(request: NextRequest , {params}:any) {
    
    const subskills = await prisma.subskills.findMany({
        select:{
            subskill:true,
            reqSubject:true,
            reqProgram:true,
            code : true
        }
    })
    const countlist : any =[]
    const obj : any = {}
    const list = []
    

    for(let i = 0 ; i < subskills.length; i++){
        const temp : Index = subskills[i]
        countlist.push({
            code : temp.code
        })
        obj[temp.code] = 0
    }

    const elements = await prisma.practiceLog.findMany({
        where:{
            Code : countlist.code,
            Status : "APPROVED",
            Sid:parseInt(params.Sid)
        },
        select:{
            Code:true
        }
    });
    
    elements.forEach((element)=>{
        for(const j in obj){
            if(j === element.Code){
                obj[j] += 1
                break
            }
        }
    })
    
    return NextResponse.json({subskills,count:[obj]},{status:200})
}