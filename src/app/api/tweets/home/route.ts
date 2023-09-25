import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'
import { TWEET_OPTIONS } from '@/lib/constants'

export async function GET() {
    const session = await getServerAuthSession()

    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const tweets = await prisma.tweet.findMany({
        include: {
            ...TWEET_OPTIONS,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return new NextResponse(
        JSON.stringify({
            tweets,
        }),
        {
            status: 200,
        }
    )
}

export async function POST(req: Request) {
    const { content, image, replyPrivate } = (await req.json()) as {
        content: string
        image?: string
        replyPrivate: boolean
    }
    const session = await getServerAuthSession()
    if (!session) {
        return new NextResponse('Unauthorized', {
            status: 401,
        })
    }

    const tweet = await prisma.tweet.create({
        data: {
            text: content,
            image: image ?? undefined,
            replyPrivate,
            userId: session.user.id,
        },
    })

    return NextResponse.json({ tweet }, { status: 201 })
}
