import { BookmarkedTweet } from '@/types/types'
import { User } from 'next-auth'
import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import TweetCard from '../cards/tweet-card'
import { cn } from '@/lib/utils'

type BookmarksWrapperProps = {
    initialTweets: BookmarkedTweet[]
    user: User
}

export default function BookmarksWrapper({
    initialTweets,
    user,
}: BookmarksWrapperProps) {
    return (
        <>
            <ScrollArea
                className={cn('h-[calc(100vh-155px)] w-full rounded-lg')}
            >
                {initialTweets?.map((tweet) => (
                    <TweetCard
                        key={tweet.id}
                        tweet={tweet.tweet}
                        user={tweet.tweet.user}
                        currentUser={user}
                    />
                ))}
            </ScrollArea>
        </>
    )
}
