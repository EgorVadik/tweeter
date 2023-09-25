import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
    const { name, email, bio, bannerImage, image } = await req.json()
    const session = await getServerAuthSession()

    if (!session) {
        return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
    }

    try {
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                name,
                email,
                bio,
                bannerImage,
                image,
            },
        })

        return NextResponse.json({ message: 'updated' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'error' }, { status: 500 })
    }
}
