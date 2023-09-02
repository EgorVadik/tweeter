import ProfileSideNav from '@/components/nav/profile-side-nav'
import ExploreWrapper from '@/components/wrappers/explore-wrapper'
import { getTweets } from '@/lib/helpers'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import React from 'react'

export default async function page() {
    const session = await getServerAuthSession()

    // const topTweets = await prisma.tweet.findMany({
    //     include: {
    //         user: {
    //             select: {
    //                 id: true,
    //                 name: true,
    //                 image: true,
    //                 followersIds: true,
    //             },
    //         },
    //         likes: {
    //             select: {
    //                 userId: true,
    //             },
    //         },
    //         retweets: {
    //             select: {
    //                 userId: true,
    //             },
    //         },
    //         replies: {
    //             select: {
    //                 id: true,
    //                 text: true,
    //                 createdAt: true,
    //                 user: {
    //                     select: {
    //                         id: true,
    //                         name: true,
    //                         image: true,
    //                     },
    //                 },
    //             },
    //             orderBy: {
    //                 createdAt: 'desc',
    //             },
    //             take: 2,
    //         },
    //         savedTweets: {
    //             select: {
    //                 userId: true,
    //             },
    //         },
    //     },
    //     orderBy: {
    //         createdAt: 'desc',
    //     },
    // })

    const latestTweets = await getTweets({
        createdAt: 'desc',
    })

    return <ExploreWrapper initialTweets={latestTweets} user={session!.user} />
}
