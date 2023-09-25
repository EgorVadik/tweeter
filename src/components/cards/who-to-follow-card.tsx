import Image from 'next/image'
import UserCard from './user-card'

import type { UserToFollow } from '@/types/types'

type WhoToFollowCardProps = {
    user: UserToFollow
}

export default function WhoToFollowCard({ user }: WhoToFollowCardProps) {
    return (
        <>
            <UserCard user={user} followType='Follow' />
            {user.bannerImage && (
                <div className='w-full h-24'>
                    <Image
                        src={user.bannerImage}
                        alt='banner'
                        className='object-cover w-full h-full rounded-lg'
                        width={200}
                        height={100}
                    />
                </div>
            )}
        </>
    )
}
