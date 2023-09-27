import { getTweets } from '@/lib/helpers'
import { getServerAuthSession } from '@/server/auth'
import React from 'react'

import ExploreWrapper from '@/components/wrappers/explore-wrapper'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function page() {
    const session = await getServerAuthSession()

    const latestTweets = await getTweets({
        createdAt: 'desc',
    })

    return <ExploreWrapper initialTweets={latestTweets} user={session!.user} />
}
