'use client'

import { ComponentPropsWithoutRef } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { setFollowUser } from '@/lib/api-client'
import { useHover } from '@mantine/hooks'

import { Button } from '../ui/button'

type FollowBtnProps = {
    followType: 'Unfollow' | 'Follow'
    uid: string
} & ComponentPropsWithoutRef<'button'>

export default function FollowBtn({
    followType,
    uid,
    ...props
}: FollowBtnProps) {
    const router = useRouter()
    const { toast } = useToast()
    const { hovered, ref } = useHover<HTMLButtonElement>()

    return (
        <Button
            ref={ref}
            {...props}
            onClick={() => setFollowUser(uid, followType, router, toast)}
            className='px-5 py-2 text-sm font-semibold text-white rounded bg-primary-blue'
        >
            {followType === 'Unfollow'
                ? hovered
                    ? 'Unfollow'
                    : 'Following'
                : followType}
        </Button>
    )
}
