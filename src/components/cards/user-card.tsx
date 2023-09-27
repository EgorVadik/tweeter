'use client'

import React from 'react'
import Link from 'next/link'
import { useHover } from '@mantine/hooks'
import { setFollowUser } from '@/lib/api-client'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

import UserAvatar from './user-avatar'
import { IoMdPersonAdd } from 'react-icons/io'
import { formatNumber } from '@/lib/helpers'
import { Button } from '../ui/button'

import type { UserSearch } from '@/types/types'

type UserCardProps = {
    user: UserSearch
    followType: 'Unfollow' | 'Follow'
}

export default function UserCard({ user, followType }: UserCardProps) {
    const { hovered, ref } = useHover<HTMLButtonElement>()
    const router = useRouter()
    const { toast } = useToast()

    return (
        <Link href={`/profile/${user.id}`}>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <UserAvatar
                        image={user.image ?? undefined}
                        name={user.name}
                    />
                    <div>
                        <p className='font-medium tracking-base'>{user.name}</p>
                        <p className='text-xs text-light-gray'>
                            {formatNumber(user._count.followers)} followers
                        </p>
                    </div>
                </div>
                <Button
                    ref={ref}
                    className='flex items-center gap-2 px-4 py-[6px] ml-4 text-xs font-medium text-white rounded tracking-base bg-primary-blue h-fit'
                    onClick={(e) => {
                        e.preventDefault()
                        setFollowUser(user.id, followType, router, toast)
                    }}
                >
                    <IoMdPersonAdd size={14} />
                    {followType === 'Unfollow'
                        ? hovered
                            ? 'Unfollow'
                            : 'Following'
                        : followType}
                </Button>
            </div>
            <p className='py-3 text-sm font-medium text-light-gray tracking-base'>
                {user.bio ?? 'This user has no bio yet.'}
            </p>
        </Link>
    )
}
