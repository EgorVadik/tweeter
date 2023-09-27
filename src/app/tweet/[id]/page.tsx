import dynamic from 'next/dynamic'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { redirect } from 'next/navigation'

import { ScrollArea } from '@/components/ui/scroll-area'
const TweetCard = dynamic(() => import('@/components/cards/tweet-card'))

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
        <main className='px-4 pt-5 sm:container'>
            <ScrollArea className='sm:pb-0 pb-8 h-[calc(100vh-110px)] lg:max-w-3xl w-full rounded-lg mx-auto'>
                <TweetCard
                    tweet={tweet}
                    currentUser={session?.user!}
                    user={tweet.user}
                />
            </ScrollArea>
        </main>
    )
}
