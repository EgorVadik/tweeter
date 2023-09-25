import { IoMdPersonAdd } from 'react-icons/io'
import UserAvatar from './user-avatar'
import { PartialUser, UserToFollow } from '@/types/types'
import { formatNumber } from '@/lib/helpers'
import Image from 'next/image'

type WhoToFollowCardProps = {
    user: UserToFollow
}

export default function WhoToFollowCard({ user }: WhoToFollowCardProps) {
    const handleFollow = () => {}

    return (
        <>
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
                <button
                    onClick={handleFollow}
                    className='flex items-center gap-2 px-4 py-1 ml-4 text-xs font-medium text-white rounded tracking-base bg-primary-blue'
                >
                    <IoMdPersonAdd size={14} />
                    Follow
                </button>
            </div>
            <p className='py-3 text-sm font-medium text-light-gray tracking-base'>
                {user.bio ?? 'This user has no bio yet.'}
            </p>
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
