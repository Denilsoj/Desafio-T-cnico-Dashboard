import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prismaClient";

export async function POST(request: NextRequest) {

    
    const userBodyData = z.object({
        name: z.string({})
        .min(1, {message: 'Mandatory name field'}),
        email: z.string()
        .email({message: 'Wrong email format'}),
        password: z.string()
        .min(3, { message: 'Password field must have at least 3 characters'})
    })
    try {
        const data  = await userBodyData.parse(await request.json());
        const {name, email, password} = data

        const newUser = await prisma.users.create({
            data: {
                name,
                email, 
                password
            }
        });
        return NextResponse.json('User created successfully');
    } catch (error: any) {
        let errorMessage = error.issues ? error.issues.map((e: any) => (e.message)): error 
        if(errorMessage.code === "P2002"){
            errorMessage = "email already exists, try a different one"
        }
        return  await NextResponse.json({errors: errorMessage },{status: 401})
    }   
}

export async function PUT(req: NextRequest) {
    return NextResponse.json('ola mundo')
}

