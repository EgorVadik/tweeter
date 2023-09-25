'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useClickOutside } from '@mantine/hooks'
import TweetCard from '@/components/cards/tweet-card'
import { ScrollArea } from '../ui/scroll-area'

import type { User as SessionUser } from 'next-auth'
import type { User } from '@prisma/client'
import type { HomeTweet, PartialUser, ProfileTweet } from '@/types/types'

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
    const ref = useClickOutside<any>(() => router.back())

    return (
        <Dialog open={pathName.includes('/tweet/')}>
            <DialogContent
                ref={ref}
                className='max-w-3xl max-h-[70vh] overflow-hidden'
            >
                <ScrollArea className='h-full max-h-[65vh]'>
                    <TweetCard
                        tweet={tweet}
                        currentUser={currentUser}
                        user={user}
                    />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
