'use client'

import { ComponentPropsWithoutRef } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'
import { setFollowUser } from '@/lib/api-client'
import { useHover } from '@mantine/hooks'

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
            className='bg-primary-blue text-white px-5 py-2 rounded font-semibold text-sm'
        >
            {followType === 'Unfollow'
                ? hovered
                    ? 'Unfollow'
                    : 'Following'
                : followType}
        </Button>
    )
}