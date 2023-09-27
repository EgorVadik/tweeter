import React from 'react'
import { getTweets } from '@/lib/helpers'
import { getServerAuthSession } from '@/server/auth'

import ExploreWrapper from '@/components/wrappers/explore-wrapper'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function page() {
    const session = await getServerAuthSession()

    const topTweets = await getTweets({
        likes: {
            _count: 'desc',
        },
    })

    return <ExploreWrapper initialTweets={topTweets} user={session!.user} />
}
