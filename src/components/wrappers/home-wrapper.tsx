'use client'

import React, { useState } from 'react'
import TweetForm from '../forms/tweet-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import TweetCard from '../cards/tweet-card'
import { User as SessionUser } from 'next-auth'
import { HomeTweet, UserToFollow } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { getTweets } from '@/lib/api-client'
import { useIntersection } from '@mantine/hooks'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Separator } from '../ui/separator'
import WhoToFollowCard from '../cards/who-to-follow-card'

type HomeWrapperProps = {
    user: SessionUser
    initialTweets: HomeTweet[]
    usersToFollow: UserToFollow[]
}

export default function HomeWrapper({
    user,
    initialTweets,
    usersToFollow,
}: HomeWrapperProps) {
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
        <div className='flex flex-col-reverse items-center justify-center gap-5 lg:items-start lg:flex-row'>
            <div className='w-full max-w-3xl'>
                {entry != null && !entry.isIntersecting && (
                    <div className='flex justify-end w-full max-w-3xl'>
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
                        'sm:pb-0 pb-8 h-[calc(100vh-110px)] lg:max-w-3xl w-full rounded-lg',
                        !entry?.isIntersecting &&
                            tweetForm &&
                            'pb-6 h-[calc(100vh-350px)]',
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
            </div>
            <div className='w-full max-w-3xl lg:max-w-xs'>
                <div className='p-3 bg-white rounded-xl'>
                    <p>Who to follow</p>
                    <Separator className='mt-1 mb-3' />
                    {usersToFollow.map((user) => (
                        <React.Fragment key={user.id}>
                            <WhoToFollowCard user={user} />
                            <Separator className='my-3 last:hidden' />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}
