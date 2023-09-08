import { getBookmarkedTweets } from '@/lib/helpers'
import { getServerAuthSession } from '@/server/auth'
import { NextResponse } from 'next/server'

export async function GET() {
    const session = await getServerAuthSession()
    if (!session) return new NextResponse('Unauthorized', { status: 401 })

    const bookmarkedTweets = await getBookmarkedTweets(session.user.id, {
        createdAt: 'desc',
    })

    return new NextResponse(JSON.stringify({ bookmarkedTweets }), {
        status: 200,
    })
}
