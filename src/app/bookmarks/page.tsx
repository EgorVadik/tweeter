import BookmarksWrapper from '@/components/wrappers/bookmarks-wrapper'
import { getBookmarkedTweets } from '@/lib/helpers'
import { getServerAuthSession } from '@/server/auth'
import React from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function page() {
    const session = await getServerAuthSession()

    const bookmarkedTweets = await getBookmarkedTweets(session!.user.id, {
        createdAt: 'desc',
    })

    return (
        <BookmarksWrapper
            initialTweets={bookmarkedTweets}
            user={session!.user}
        />
    )
}
