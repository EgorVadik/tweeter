import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'
import { TWEET_OPTIONS } from '@/lib/constants'

export async function GET() {
    const session = await getServerAuthSession()
    if (!session) return new NextResponse('Unauthorized', { status: 401 })

    const bookmarkedTweets = await prisma.savedTweet.findMany({
        where: {
            userId: session!.user.id,
            tweet: {
                replies: {
                    some: {
                        userId: session!.user.id,
                    },
                },
            },
        },
        include: {
            tweet: {
                include: {
                    ...TWEET_OPTIONS,
                    // savedTweets: {
                    //     select: {
                    //         userId: true,
                    //     },
                    // },
                    // _count: {
                    //     select: {
                    //         replies: true,
                    //     },
                    // },
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
