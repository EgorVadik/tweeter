import ProfileWrapper from '@/components/wrappers/profile-wrapper'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { redirect } from 'next/navigation'

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
            followers: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    bio: true,
                },
            },
            following: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    bio: true,
                },
            },
            tweets: {
                where: {
                    replies: {
                        some: {
                            userId: id,
                        },
                    },
                },
                include: {
                    likes: {
                        select: {
                            userId: true,
                        },
                    },
                    retweets: {
                        select: {
                            userId: true,
                        },
                    },
                    replies: {
                        select: {
                            id: true,
                            text: true,
                            createdAt: true,
                            user: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        take: 2,
                    },
                    savedTweets: {
                        select: {
                            userId: true,
                        },
                    },
                    _count: {
                        select: {
                            replies: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            },
        },
    })

    if (!user) return redirect('/')

    return (
        <ProfileWrapper
            initialTweets={user.tweets}
            tweetUser={user}
            currentUser={currentUser?.user!}
        />
    )
}