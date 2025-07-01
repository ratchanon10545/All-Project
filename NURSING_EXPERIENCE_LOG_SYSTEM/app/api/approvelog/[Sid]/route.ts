import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"



export async function GET(request:NextRequest, {params} : any) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const Aid : any = searchParams.get('Aid')
    const Sid = params.Sid
    try{
        const log = await prisma.practiceLog.findMany({
            where:{
                Sid : parseInt(Sid),
                Aid : parseInt(Aid),
                Status : "WAIT"
            },
            select:{
                id : true,
                SubSkill:true,
                Date:true,
                Place:true,
                Ward:true,
                ApproverName:true,
                Aid : true
            }
        })
        const datalist : any=[]
        log.forEach(element => {
            datalist.push({
                ...element,
                checked : false
            })
        });
       
        return NextResponse.json({datalist},{status:200})
    }
    catch{
        return NextResponse.json({},{status:500})
    }
    

}