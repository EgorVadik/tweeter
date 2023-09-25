import BookmarksWrapper from '@/components/wrappers/bookmarks-wrapper'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import React from 'react'
import { TWEET_OPTIONS } from '@/lib/constants'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function page() {
    const session = await getServerAuthSession()

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

    return (
        <BookmarksWrapper
            initialTweets={bookmarkedTweets}
            user={session!.user}
        />
    )
}
