import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function GET() {
    const session = await getServerAuthSession()
    if (!session) return new NextResponse('Unauthorized', { status: 401 })

    const bookmarkedTweets = await prisma.savedTweet.findMany({
        where: {
            userId: session!.user.id,
            tweet: {
                image: {
                    not: null,
                },
            },
        },
        include: {
            tweet: {
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
                            image: true,
                            replyLikes: {
                                select: {
                                    userId: true,
                                },
                            },
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
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return new NextResponse(JSON.stringify({ bookmarkedTweets }), {
        status: 200,
    })
}
