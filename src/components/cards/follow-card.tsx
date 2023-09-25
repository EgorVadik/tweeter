import { Button } from '../ui/button'
import UserAvatar from './user-avatar'
import { setFollowUser } from '@/lib/api-client'
import { useHover } from '@mantine/hooks'

import type { User } from 'next-auth'
import type { FollowUser } from '@/types/types'

type FollowCardProps = {
    user: FollowUser
    currentUser: User
    router: any
    toast: any
}

export default function FollowCard({
    user,
    currentUser,
    router,
    toast,
}: FollowCardProps) {
    const followType = user.followersIds.includes(currentUser.id)
        ? 'Unfollow'
        : 'Follow'
    const { hovered, ref } = useHover<HTMLButtonElement>()

    return (
        <>
            <div className='flex justify-between first:mt-5'>
                <div className='flex items-center gap-3'>
                    <UserAvatar name={user.name} image={user.image ?? ''} />
                    <div className=''>
                        <h4 className='text-lg font-semibold text-black tracking-base '>
                            {user.name}
                        </h4>
                        <p className='text-xs text-light-gray tracking-base'>
                            {user.followersIds.length} followers
                        </p>
                    </div>
                </div>

                <Button
                    ref={ref}
                    className='px-5 py-2 text-sm font-semibold text-white rounded bg-primary-blue'
                    onClick={() =>
                        setFollowUser(user.id, followType, router, toast)
                    }
                >
                    {user.id === currentUser.id
                        ? 'Profile'
                        : followType === 'Unfollow'
                        ? hovered
                            ? 'Unfollow'
                            : 'Following'
                        : followType}
                </Button>
            </div>
            <p className='mt-3 text-sm font-medium text-light-gray tracking-base'>
                {user.bio ?? user.id === currentUser.id
                    ? 'You have no bio yet. Start editing your profile now'
                    : 'This user has no bio yet.'}
            </p>
        </>
    )
}
