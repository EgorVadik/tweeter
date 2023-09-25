import { getTweets } from '@/lib/helpers'
import { getServerAuthSession } from '@/server/auth'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const session = await getServerAuthSession()
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const tweets = await getTweets({
        createdAt: 'desc',
    })

    return new NextResponse(
        JSON.stringify({
            tweets,
        }),
        {
            status: 200,
        }
    )
}
