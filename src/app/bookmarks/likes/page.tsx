import React from 'react'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { TWEET_OPTIONS } from '@/lib/constants'

import BookmarksWrapper from '@/components/wrappers/bookmarks-wrapper'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function page() {
    const session = await getServerAuthSession()

    const bookmarkedTweets = await prisma.savedTweet.findMany({
        where: {
            userId: session!.user.id,
            tweet: {
                likes: {
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
