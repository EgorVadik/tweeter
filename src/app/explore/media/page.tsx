import ExploreWrapper from '@/components/wrappers/explore-wrapper'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import React from 'react'
import { TWEET_OPTIONS } from '@/lib/constants'

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
            ...TWEET_OPTIONS,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return <ExploreWrapper initialTweets={topTweets} user={session!.user} />
}
