'use client'

import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation'
import { useClickOutside } from '@mantine/hooks'

const TweetCard = dynamic(() => import('../cards/tweet-card'))
const Dialog = dynamic(() =>
    import('@/components/ui/dialog').then((module) => module.Dialog)
)
const DialogContent = dynamic(() =>
    import('@/components/ui/dialog').then((module) => module.DialogContent)
)
const ScrollArea = dynamic(() =>
    import('@/components/ui/scroll-area').then((module) => module.ScrollArea)
)

import type { User as SessionUser } from 'next-auth'
import type { User } from '@prisma/client'
import type { HomeTweet, PartialUser, ProfileTweet } from '@/types/types'
import React, { LegacyRef } from 'react'

type TweetDialogProps = {
    tweet: HomeTweet | ProfileTweet
    currentUser: SessionUser
    user: PartialUser | User
}

export default function TweetDialog({
    tweet,
    currentUser,
    user,
}: TweetDialogProps) {
    const router = useRouter()
    const pathName = usePathname()
    const ref = useClickOutside<HTMLDivElement>(() =>
        router.back()
    ) as LegacyRef<HTMLDivElement>

    return (
        <Dialog open={pathName.includes('/tweet/')}>
            <DialogContent className='max-w-3xl max-h-[70vh] overflow-hidden p-0'>
                <div ref={ref} className='p-6'>
                    <ScrollArea className='h-full max-h-[65vh]'>
                        <TweetCard
                            tweet={tweet}
                            currentUser={currentUser}
                            user={user}
                        />
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}
