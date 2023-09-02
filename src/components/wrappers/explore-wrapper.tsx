import React from 'react'
import { HomeTweet } from '@/types/types'
import { User as SessionUser } from 'next-auth'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import TweetCard from '../cards/tweet-card'

type ExploreWrapperProps = {
    user: SessionUser
    initialTweets: HomeTweet[]
}

export default function ExploreWrapper({
    initialTweets,
    user,
}: ExploreWrapperProps) {
    return (
        <>
            <ScrollArea
                className={cn('h-[calc(100vh-155px)] w-full rounded-lg')}
            >
                {initialTweets?.map((tweet) => (
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
