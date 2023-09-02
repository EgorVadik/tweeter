import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(req: Request) {
    const { id } = await req.json()

    if (!id)
        return NextResponse.json(
            { message: 'Missing tweet id' },
            { status: 400 }
        )

    const session = await getServerAuthSession()
    if (!session)
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    try {
        const save = await prisma.savedTweet.create({
            data: {
                tweetId: id,
                userId: session.user.id,
            },
        })

        return NextResponse.json({ save }, { status: 201 })
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                const save = await prisma.savedTweet.delete({
                    where: {
                        userId_tweetId: {
                            tweetId: id,
                            userId: session.user.id,
                        },
                    },
                })
                return NextResponse.json({ save }, { status: 200 })
            }
        }

        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}