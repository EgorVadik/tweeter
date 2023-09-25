'use client'

import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import TweetCard from '../cards/tweet-card'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { getExplore } from '@/lib/api-client'

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
                {data?.map((tweet) => (
                    <TweetCard
                        key={tweet.id}
                        tweet={tweet}
                        user={tweet.user}
                        currentUser={user}
                    />
                ))}
            </ScrollArea>
        </>
    )
}
