'use client'
import { ProfileTweet } from '@/types/types'
import { User as UserType } from '@prisma/client'
import { User as SessionUser } from 'next-auth'
import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import TweetCard from '../cards/tweet-card'
import { cn } from '@/lib/utils'

type ProfileWrapperProps = {
    initialTweets: ProfileTweet[]
    currentUser: SessionUser
    tweetUser: UserType
}

export default function ProfileWrapper({
    initialTweets,
    currentUser,
    tweetUser,
}: ProfileWrapperProps) {
    const scrollAreaRef = React.useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        const mainContainer = document.querySelector('main')
        // @ts-ignore
        mainContainer?.scrollTo({
            top: scrollAreaRef.current?.scrollTop,
        })
    }

    return (
        <>
            <ScrollArea
                ref={scrollAreaRef}
                className={cn('h-[calc(100vh-155px)] w-full rounded-lg')}
                onScroll={handleScroll}
            >
                {initialTweets?.map((tweet) => (
                    <TweetCard
                        key={tweet.id}
                        tweet={tweet}
                        user={tweetUser}
                        currentUser={currentUser}
                    />
                ))}
            </ScrollArea>
        </>
    )
}
