'use client'

import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { Fragment } from 'react'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '../ui/separator'
import FollowCard from '../cards/follow-card'

import type { FollowUser } from '@/types/types'
import type { User } from 'next-auth'

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
            <DialogContent className='max-w-2xl '>
                <DialogHeader>
                    <DialogTitle className='text-xs font-medium text-darker-gray tracking-base'>
                        {followType === 'following'
                            ? `${userName} is following`
                            : `${userName}'s followers`}
                    </DialogTitle>
                    <Separator />
                    {follows.map((user) => (
                        <Fragment key={user.id}>
                            <FollowCard
                                user={user}
                                currentUser={currentUser}
                                router={router}
                                toast={toast}
                            />
                            <Separator className='my-5 last:hidden' />
                        </Fragment>
                    ))}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
