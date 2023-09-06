'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '../ui/separator'
import FollowCard from '../cards/follow-card'
import { FollowUser } from '@/types/types'
import { User } from 'next-auth'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'

type FollowDialogProps = {
    children: React.ReactNode
    followType: 'followers' | 'following'
    userName: string
    isDisabled: boolean
    follows: FollowUser[]
    currentUser: User
}

export default function FollowDialog({
    followType,
    children,
    userName,
    isDisabled,
    follows,
    currentUser,
}: FollowDialogProps) {
    const router = useRouter()
    const { toast } = useToast()

    return (
        <Dialog>
            <DialogTrigger
                disabled={isDisabled}
                className='disabled:cursor-not-allowed'
            >
                {children}
            </DialogTrigger>
            <DialogContent className=' max-w-2xl'>
                <DialogHeader>
                    <DialogTitle className='text-xs font-medium text-darker-gray tracking-base'>
                        {followType === 'following'
                            ? `${userName} is following`
                            : `${userName}'s followers`}
                    </DialogTitle>
                    <Separator />
                    <DialogDescription>
                        {follows.map((user) => (
                            <>
                                <FollowCard
                                    key={user.id}
                                    user={user}
                                    currentUser={currentUser}
                                    router={router}
                                    toast={toast}
                                />
                                <Separator className='last:hidden my-5' />
                            </>
                        ))}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
