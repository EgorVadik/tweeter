import { getServerAuthSession } from '@/server/auth'
import { getTweets } from '@/lib/helpers'
import { prisma } from '@/server/db'

import HomeWrapper from '@/components/wrappers/home-wrapper'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
    const session = await getServerAuthSession()

    const usersToFollowAsync = prisma.user.findMany({
        where: {
            NOT: {
                id: session!.user.id,
            },
            followers: {
                some: {
                    NOT: {
                        id: session!.user.id,
                    },
                },
            },
        },
        orderBy: {
            followers: {
                _count: 'desc',
            },
        },
        select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            bannerImage: true,
            followersIds: true,
            _count: {
                select: {
                    followers: true,
                },
            },
        },
        take: 3,
    })

    const initialTweetsAsync = getTweets({
        createdAt: 'desc',
    })

    const [usersToFollow, initialTweets] = await Promise.all([
        usersToFollowAsync,
        initialTweetsAsync,
    ])

    return (
        <main className='px-4 pt-5 sm:container'>
            <HomeWrapper
                initialTweets={initialTweets}
                user={session!.user}
                usersToFollow={usersToFollow}
            />
        </main>
    )
}
