import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { content, image, tweetId } = (await req.json()) as {
        content: string
        image?: string
        tweetId: string
    }
    const session = await getServerAuthSession()
    if (!session) {
        return new NextResponse('Unauthorized', {
            status: 401,
        })
    }

    try {
        const reply = await prisma.reply.create({
            data: {
                text: content,
                image: image ?? undefined,
                userId: session.user.id,
                tweetId,
            },
        })
        return new NextResponse(JSON.stringify(reply), {
            status: 200,
        })
    } catch (error) {
        return new NextResponse('Something went wrong', {
            status: 500,
        })
    }
}
