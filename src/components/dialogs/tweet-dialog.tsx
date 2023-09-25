'use client'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useClickOutside } from '@mantine/hooks'
import TweetCard from '@/components/cards/tweet-card'
import { HomeTweet, PartialUser, ProfileTweet } from '@/types/types'
import { User as SessionUser } from 'next-auth'
import { User } from '@prisma/client'
import { ScrollArea } from '../ui/scroll-area'

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
    const ref = useClickOutside<HTMLDivElement>(() => router.back())

    return (
        <Dialog open>
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
