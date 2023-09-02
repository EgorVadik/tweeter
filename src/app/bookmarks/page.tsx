import BookmarksWrapper from '@/components/wrappers/bookmarks-wrapper'
import ExploreWrapper from '@/components/wrappers/explore-wrapper'
import { getBookmarkedTweets, getTweets } from '@/lib/helpers'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import React from 'react'

export default async function page() {
    const session = await getServerAuthSession()

    // const bookmarkedTweets = await prisma.savedTweet.findMany({
    //     where: {
    //         userId: session!.user.id,
    //     },
    //     include: {
    //         tweet: {
    //             include: {
    //                 user: {
    //                     select: {
    //                         id: true,
    //                         name: true,
    //                         image: true,
    //                         followersIds: true,
    //                     },
    //                 },
    //                 likes: {
    //                     select: {
    //                         userId: true,
    //                     },
    //                 },
    //                 retweets: {
    //                     select: {
    //                         userId: true,
    //                     },
    //                 },
    //                 replies: {
    //                     select: {
    //                         id: true,
    //                         text: true,
    //                         createdAt: true,
    //                         user: {
    //                             select: {
    //                                 id: true,
    //                                 name: true,
    //                                 image: true,
    //                             },
    //                         },
    //                     },
    //                     orderBy: {
    //                         createdAt: 'desc',
    //                     },
    //                     take: 2,
    //                 },
    //                 savedTweets: {
    //                     select: {
    //                         userId: true,
    //                     },
    //                 },
    //             },
    //         },
    //     },
    //     orderBy: {
    //         createdAt: 'desc',
    //     },
    // })

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
