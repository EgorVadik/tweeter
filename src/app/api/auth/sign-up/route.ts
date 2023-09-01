import { prisma } from '@/server/db'
import { signUpSchema } from '@/validations/zod-validations'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { hash } from 'bcrypt'
import { NextResponse, NextRequest } from 'next/server'
import { ZodError } from 'zod'

export async function POST(req: Request) {
    const { name, email, password } = await req.json()

    try {
        const validData = signUpSchema.parse({
            name,
            email,
            password,
        })
        const newUser = await prisma.user.create({
            data: {
                name: validData.name,
                email: validData.email,
                password: await hash(validData.password, 11),
            },
        })

        return new Response(JSON.stringify({ newUser }), { status: 201 })
    } catch (error) {
        if (error instanceof ZodError) {
            return new Response(error.message, { status: 400 })
        }
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return new Response('Email already exists', { status: 409 })
            }
        }

        return new Response(JSON.stringify(error), { status: 500 })
    }
}
