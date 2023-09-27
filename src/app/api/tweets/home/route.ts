import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'
import { getTweets } from '@/lib/helpers'

export async function GET() {
    const session = await getServerAuthSession()

    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const tweets = getTweets({
        createdAt: 'desc',
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
