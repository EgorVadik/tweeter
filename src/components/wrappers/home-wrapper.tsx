'use client'

import React, { useState } from 'react'
import TweetForm from '../forms/tweet-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import TweetCard from '../cards/tweet-card'
import { User as SessionUser } from 'next-auth'
import { HomeTweet } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { getTweets } from '@/lib/api-client'
import { useIntersection } from '@mantine/hooks'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

type HomeWrapperProps = {
    user: SessionUser
    initialTweets: HomeTweet[]
}

export default function HomeWrapper({ user, initialTweets }: HomeWrapperProps) {
    const [tweetForm, setTweetForm] = useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const pathName = usePathname()
    const { data } = useQuery({
        queryKey: ['tweets', pathName],
        queryFn: getTweets,
        initialData: initialTweets as HomeTweet[],
        staleTime: 1000 * 60 * 5,
    })

    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 0,
    })

    return (
        <>
            {entry != null && !entry.isIntersecting && (
                <div className='flex max-w-3xl w-full justify-end'>
                    <Button
                        className='mb-3'
                        onClick={() => setTweetForm((prev) => !prev)}
                    >
                        {tweetForm ? 'Cancel' : 'New Tweet'}
                    </Button>
                </div>
            )}

            {entry != null && !entry.isIntersecting && tweetForm && (
                <div className='mb-3'>
                    <TweetForm user={user} />
                </div>
            )}
            <ScrollArea
                ref={containerRef}
                className={cn(
                    'h-[calc(100vh-110px)] w-full',
                    !entry?.isIntersecting &&
                        tweetForm &&
                        'h-[calc(100vh-350px)]',
                    !entry?.isIntersecting &&
                        !tweetForm &&
                        'h-[calc(100vh-140px)]'
                )}
            >
                <div ref={ref}>
                    <TweetForm user={user} />
                </div>
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
