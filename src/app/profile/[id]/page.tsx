import React from 'react'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { redirect } from 'next/navigation'
import { PROFILE_TWEETS_OPTIONS } from '@/lib/constants'

import ProfileWrapper from '@/components/wrappers/profile-wrapper'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function page({
    params: { id },
}: {
    params: { id: string }
}) {
    const currentUser = await getServerAuthSession()
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            tweets: {
                include: {
                    ...PROFILE_TWEETS_OPTIONS,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    })

    // @ts-ignore
    delete user?.password

    if (!user) {
        return redirect('/')
    }

    return (
        <ProfileWrapper
            initialTweets={user?.tweets}
            tweetUser={user}
            currentUser={currentUser?.user!}
        />
    )
}
