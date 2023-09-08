import ExploreWrapper from '@/components/wrappers/explore-wrapper'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import React from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function page() {
    const session = await getServerAuthSession()

    const topTweets = await prisma.tweet.findMany({
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
        orderBy: {
            createdAt: 'desc',
        },
    })

    return <ExploreWrapper initialTweets={topTweets} user={session!.user} />
}
