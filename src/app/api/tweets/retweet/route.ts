import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

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
        const retweet = await prisma.retweet.create({
            data: {
                tweetId: id,
                userId: session.user.id,
            },
        })

        return NextResponse.json({ retweet }, { status: 201 })
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return NextResponse.json(
                    {
                        message: 'You already retweeted this tweet',
                    },
                    { status: 419 }
                )
            }
        }

        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}
