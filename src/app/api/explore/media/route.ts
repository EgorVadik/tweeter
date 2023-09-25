import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'
import { TWEET_OPTIONS } from '@/lib/constants'

export async function GET() {
    const session = await getServerAuthSession()
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    const tweets = await prisma.tweet.findMany({
        where: {
            image: {
                not: null,
            },
        },
        include: {
            ...TWEET_OPTIONS,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return new NextResponse(JSON.stringify({ tweets }), { status: 200 })
}
