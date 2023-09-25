import WhoToFollowCard from '@/components/cards/who-to-follow-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import React from 'react'

export default async function page() {
    const session = await getServerAuthSession()

    const people = await prisma.user.findMany({
        where: {
            id: {
                not: session?.user.id,
            },
        },
        select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            bannerImage: true,
            followersIds: true,
            _count: {
                select: {
                    followers: true,
                },
            },
        },
        orderBy: {
            followers: {
                _count: 'desc',
            },
        },
    })

    return (
        <ScrollArea
            className={cn(
                'p-3 mb-16 sm:mb-0 h-[calc(100vh-160px)] lg:max-w-3xl grow rounded-lg bg-white'
            )}
        >
            {people.map((user) => (
                <React.Fragment key={user.id}>
                    <WhoToFollowCard user={user} />
                    <Separator className='mb-3 last:hidden' />
                </React.Fragment>
            ))}
        </ScrollArea>
    )
}
