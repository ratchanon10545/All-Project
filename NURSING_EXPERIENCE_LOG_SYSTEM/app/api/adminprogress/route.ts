import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

// export const revalidate = 100
export const dynamic = 'force-dynamic';

export async function GET() {
    const user = await prisma.test.findMany({
        where : {
            role : "STUDENT"
        },
        select:{
            id : true,
            name : true,
            practicelog : {
                where : {
                    Status : "APPROVED",
                },
                select : {
                    Code : true
                }
            }
        }
    })
    const subskills = await prisma.subskills.findMany({
        select:{
            subskill:true,
            reqSubject:true,
            reqProgram:true,
            code : true
        }
    })

    const listuser= []
    const value : any= {}

    for(let i = 0 ; i < subskills.length; i++){
        const temp : any = subskills[i]
        value[temp.code] = 0
    }
    const length = Object.keys(value).length
    const percentperskill = 100/length
    let allvalue = 0

    for(let i = 0; i < user.length ; i++){
        const obj : any = {}
        for(let i = 0 ; i < subskills.length; i++){
            const temp : any = subskills[i]
            obj[temp.code] = 0
        }
        const usersingle = user[i]
        const temp = usersingle.practicelog
        temp.forEach((x: { Code: string; }) => {
            for(const j in obj){
                if(j === x.Code){
                    obj[j] += 1
                    break
                }
            }
        })
        const id = user[i].id
        const name = user[i].name
        listuser.push(
            {
                id,
                name,
                count : obj
            }
        )
        for(let i = 0 ; i < subskills.length; i++){
            const temp : any = subskills[i]
            if(obj[temp.code] >= temp.reqProgram){
                allvalue += percentperskill/user.length
            }
        }
        
    }
    
    return NextResponse.json({listuser , subskills ,allvalue},{status:200})
}
