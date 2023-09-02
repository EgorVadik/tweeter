import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import HomeWrapper from '@/components/wrappers/home-wrapper'
import { getTweets } from '@/lib/helpers'

export default async function Home() {
    const session = await getServerAuthSession()
    // const initialTweets = await prisma.tweet.findMany({
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
    //             where: {
    //                 userId: session!.user.id,
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

    const initialTweets = await getTweets({
        createdAt: 'desc',
    })

    return (
        <>
            <main className='container pt-5'>
                <HomeWrapper
                    initialTweets={initialTweets}
                    user={session!.user}
                />
            </main>
        </>
    )
}
