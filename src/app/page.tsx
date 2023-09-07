import { getServerAuthSession } from '@/server/auth'
import HomeWrapper from '@/components/wrappers/home-wrapper'
import { getTweets } from '@/lib/helpers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
    const session = await getServerAuthSession()

    const initialTweets = await getTweets({
        createdAt: 'desc',
    })

    return (
        <main className='container pt-5'>
            <HomeWrapper initialTweets={initialTweets} user={session!.user} />
        </main>
    )
}
