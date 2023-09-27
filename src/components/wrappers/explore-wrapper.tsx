'use client'

import dynamic from 'next/dynamic'

import React from 'react'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getExplore } from '@/lib/api-client'
import { usePathname } from 'next/navigation'

const TweetCard = dynamic(() => import('../cards/tweet-card'))
const ScrollArea = dynamic(() =>
    import('../ui/scroll-area').then((module) => module.ScrollArea)
)
const NoData = dynamic(() => import('../cards/no-data'))

import type { User as SessionUser } from 'next-auth'
import type { HomeTweet } from '@/types/types'

type ExploreWrapperProps = {
    user: SessionUser
    initialTweets: HomeTweet[]
}

export default function ExploreWrapper({
    initialTweets,
    user,
}: ExploreWrapperProps) {
    const pathName = usePathname()
    const { data } = useQuery({
        queryKey: ['tweets', pathName],
        queryFn:
            pathName === '/explore'
                ? () => getExplore()
                : pathName === '/explore/latest'
                ? () => getExplore('latest')
                : pathName === '/explore/people'
                ? () => getExplore('people')
                : pathName === '/explore/media'
                ? () => getExplore('media')
                : () => getExplore(),
        initialData: initialTweets as HomeTweet[],
        staleTime: 1000 * 60 * 5,
    })

    return (
        <>
            <ScrollArea
                className={cn(
                    'sm:pb-0 pb-14 h-[calc(100vh-155px)] lg:max-w-3xl grow rounded-lg'
                )}
            >
                {data.length > 0 ? (
                    data?.map((tweet) => (
                        <TweetCard
                            key={tweet.id}
                            tweet={tweet}
                            user={tweet.user}
                            currentUser={user}
                        />
                    ))
                ) : (
                    <NoData
                        title='Nothing to see here — yet'
                        subtitle="When there is, it'll show up here."
                    />
                )}
            </ScrollArea>
        </>
    )
}
