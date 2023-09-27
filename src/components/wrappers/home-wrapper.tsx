'use client'

import dynamic from 'next/dynamic'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getTweets } from '@/lib/api-client'
import { useIntersection } from '@mantine/hooks'
import { cn } from '@/lib/utils'

const TweetCard = dynamic(() => import('../cards/tweet-card'))
const TweetForm = dynamic(() => import('../forms/tweet-form'))
const Button = dynamic(() =>
    import('../ui/button').then((module) => module.Button)
)
const Separator = dynamic(() =>
    import('../ui/separator').then((module) => module.Separator)
)
const WhoToFollowCard = dynamic(() => import('../cards/who-to-follow-card'))
const ScrollArea = dynamic(() =>
    import('../ui/scroll-area').then((module) => module.ScrollArea)
)
const NoData = dynamic(() => import('../cards/no-data'))

import type { User as SessionUser } from 'next-auth'
import type { HomeTweet, UserToFollow } from '@/types/types'

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
    const pathName = usePathname()
    const { data } = useQuery({
        queryKey: ['tweets', pathName],
        queryFn: getTweets,
        initialData: initialTweets as HomeTweet[],
        staleTime: 1000 * 60 * 5,
    })

    const { ref, entry } = useIntersection({
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
