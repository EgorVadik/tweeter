import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const session = await getServerAuthSession()

    if (!session) {
        return new NextResponse(null, {
            status: 401,
        })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')

    try {
        const people = await prisma.user.findMany({
            where: {
                id: {
                    not: session.user.id,
                },
                name: {
                    contains: search!,
                    mode: 'insensitive',
                },
            },
            select: {
                name: true,
                image: true,
                id: true,
                bio: true,
                followersIds: true,
                _count: {
                    select: {
                        followers: true,
                    },
                },
            },
            take: 5,
        })

        return new NextResponse(JSON.stringify(people))
    } catch (error) {
        return new NextResponse(JSON.stringify({ error }), {
            status: 500,
        })
    }
}
