'use client'

import dynamic from 'next/dynamic'

import React from 'react'
import { cn } from '@/lib/utils'

const TweetCard = dynamic(() => import('../cards/tweet-card'))
const ScrollArea = dynamic(() =>
    import('../ui/scroll-area').then((module) => module.ScrollArea)
)
const NoData = dynamic(() => import('../cards/no-data'))

import type { ProfileTweet } from '@/types/types'
import type { User as UserType } from '@prisma/client'
import type { User as SessionUser } from 'next-auth'

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
                className={cn(
                    'sm:pb-0 pb-14 h-[calc(100vh-155px)] lg:max-w-3xl grow rounded-lg'
                )}
                onScroll={handleScroll}
            >
                {initialTweets.length > 0 ? (
                    initialTweets?.map((tweet) => (
                        <TweetCard
                            key={tweet.id}
                            tweet={tweet}
                            user={tweetUser}
                            currentUser={currentUser}
                        />
                    ))
                ) : (
                    <NoData
                        title={`${tweetUser.name} hasn't Tweeted yet`}
                        subtitle="When they do, it'll show up here."
                    />
                )}
            </ScrollArea>
        </>
    )
}
