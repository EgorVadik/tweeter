import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { id, followType } = await req.json()
    const session = await getServerAuthSession()
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 })
    }

    try {
        if (followType === 'Unfollow') {
            const followersIds = await prisma.user.findUnique({
                where: { id },
                select: { followersIds: true, followingIds: true },
            })

            await prisma.user.update({
                where: { id },
                data: {
                    followersIds: {
                        set: followersIds?.followersIds.filter(
                            (followerId) => followerId !== session.user.id
                        ),
                    },
                },
            })

            await prisma.user.update({
                where: { id: session.user.id },
                data: {
                    followingIds: {
                        set: followersIds?.followingIds.filter(
                            (followingId) => followingId !== id
                        ),
                    },
                },
            })
        } else {
            await prisma.user.update({
                where: { id },
                data: {
                    followersIds: {
                        push: session.user.id,
                    },
                },
            })

            await prisma.user.update({
                where: { id: session.user.id },
                data: {
                    followingIds: {
                        push: id,
                    },
                },
            })
        }

        return new NextResponse('done', { status: 201 })
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}
