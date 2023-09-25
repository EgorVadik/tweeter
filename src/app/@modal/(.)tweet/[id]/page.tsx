import TweetDialog from '@/components/dialogs/tweet-dialog'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { redirect } from 'next/navigation'

export default async function page({
    params: { id },
}: {
    params: { id: string }
}) {
    const session = await getServerAuthSession()
    const tweet = await prisma.tweet.findUnique({
        where: {
            id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    followersIds: true,
                },
            },
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
                    image: true,
                    replyLikes: {
                        select: {
                            userId: true,
                        },
                    },
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
    })

    if (!tweet) {
        return redirect('/')
    }

    return (
        <TweetDialog
            tweet={tweet}
            currentUser={session!.user}
            user={tweet?.user!}
        />
    )
}
