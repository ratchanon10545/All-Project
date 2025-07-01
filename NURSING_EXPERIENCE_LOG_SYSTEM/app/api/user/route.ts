import { NextRequest,NextResponse } from "next/server";
import prisma from "@/prisma/client";
import {hash} from "bcrypt"

export async function POST(request: NextRequest){
    try{
        const body = await request.json()
        const {id,email, name, password,type} = body

        const existingEmail = await prisma.test.findUnique({
            where:{
                email : email
            }
        });
        if (existingEmail){
            return NextResponse.json({user: null, massage:"User with this email already exists"},{status:409})
        }
        
        const hashPassword = await hash(password, 10)
        const newUser = await prisma.test.create({
            data:{
                id,
                name,
                email,
                password: hashPassword
            }
        })
        const {password:newUserPassword, ...rest} = newUser;

        return NextResponse.json({user: rest, massage:'User created successfully'},{status:201});

    }
    catch(error){
        return NextResponse.json({error:error,massage:'Something went wrong!'},{status:500});
    }
}