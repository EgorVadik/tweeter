import { getTweets } from '@/lib/helpers'
import { getServerAuthSession } from '@/server/auth'
import { NextResponse } from 'next/server'

export async function GET() {
    const session = await getServerAuthSession()
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const tweets = await getTweets({
        likes: {
            _count: 'desc',
        },
    })

    return new NextResponse(JSON.stringify({ tweets }), { status: 200 })
}
