import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function GET() {
    const session = await getServerAuthSession()
    if (!session) {
        return NextResponse.redirect('/login')
    }

    const tweets = await prisma.tweet.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
            likes: {
                select: {
                    userId: true,
                },
                where: {
                    userId: session.user.id,
                },
            },
            retweets: {
                select: {
                    userId: true,
                },
            },
            replies: {
                select: {
                    id: true,
                    text: true,
                    createdAt: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 2,
            },
            savedTweets: {
                select: {
                    userId: true,
                },
            },
            _count: {
                select: {
                    replies: true,
                },
            },
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
        return NextResponse.redirect('/login')
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