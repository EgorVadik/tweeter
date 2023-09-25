'use client'

import { BookmarkedTweet } from '@/types/types'
import { User } from 'next-auth'
import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import TweetCard from '../cards/tweet-card'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getBookmarks } from '@/lib/api-client'

type BookmarksWrapperProps = {
    initialTweets: BookmarkedTweet[]
    user: User
}

export default function BookmarksWrapper({
    initialTweets,
    user,
}: BookmarksWrapperProps) {
    const pathName = usePathname()
    const { data } = useQuery({
        queryKey: ['tweets', pathName],
        queryFn:
            pathName === '/bookmarks'
                ? () => getBookmarks()
                : pathName === '/bookmarks/likes'
                ? () => getBookmarks('likes')
                : pathName === '/bookmarks/tweets-and-replies'
                ? () => getBookmarks('tweets-and-replies')
                : pathName === '/bookmarks/media'
                ? () => getBookmarks('media')
                : () => getBookmarks(),
        initialData: initialTweets as BookmarkedTweet[],
        staleTime: 1000 * 60 * 5,
    })

    return (
        <>
            <ScrollArea
                className={cn(
                    'sm:pb-0 pb-14 h-[calc(100vh-100px)] lg:max-w-3xl w-full rounded-lg'
                )}
            >
                {data?.map((tweet) => (
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
