'use client'

import dynamic from 'next/dynamic'

import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getBookmarks } from '@/lib/api-client'

const TweetCard = dynamic(() => import('../cards/tweet-card'))
const ScrollArea = dynamic(() =>
    import('../ui/scroll-area').then((module) => module.ScrollArea)
)
const NoData = dynamic(() => import('../cards/no-data'))

import type { User } from 'next-auth'
import type { BookmarkedTweet } from '@/types/types'

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
                {data.length > 0 ? (
                    data?.map((tweet) => (
                        <TweetCard
                            key={tweet.id}
                            tweet={tweet.tweet}
                            user={tweet.tweet.user}
                            currentUser={user}
                        />
                    ))
                ) : (
                    <NoData
                        title="You haven't added any Tweets to your Bookmarks yet"
                        subtitle="When you do, they'll show up here."
                    />
                )}
            </ScrollArea>
        </>
    )
}
