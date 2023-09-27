import { getBookmarkedTweets } from '@/lib/helpers'
import { getServerAuthSession } from '@/server/auth'

import BookmarksWrapper from '@/components/wrappers/bookmarks-wrapper'

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
