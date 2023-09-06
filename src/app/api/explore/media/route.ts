import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {
    const session = await getServerAuthSession()
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const tweets = await prisma.tweet.findMany({
        where: {
            image: {
                not: null,
            },
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    followersIds: true,
                },
            },
            likes: {
                select: {
                    userId: true,
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

    return new NextResponse(JSON.stringify({ tweets }), { status: 200 })
}
