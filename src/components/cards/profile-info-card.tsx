import { User } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatNumber } from '@/lib/helpers'

type ProfileInfoCardProps = {
    user: User & {
        followers: User[]
        following: User[]
    }
}

const FollowCount = ({ count }: { count: number }) => (
    <span className='text-xs text-light-gray space-x-1'>
        <span className='font-semibold text-darker-gray'>
            {formatNumber(count)}
        </span>
        <span>Followers</span>
    </span>
)

export default function ProfileInfoCard({ user }: ProfileInfoCardProps) {
    return (
        <div className='bg-white rounded-xl shadow-card-shadow p-5 max-h-40'>
            <div className='flex items-start gap-7'>
                <div className='bg-white rounded-lg p-1 -translate-y-16 shadow-card-shadow'>
                    <Avatar className='w-36 h-36 rounded-lg'>
                        <AvatarImage
                            className='rounded-lg'
                            src={user.image ?? undefined}
                            alt={user.name}
                        />
                        <AvatarFallback className='text-4xl uppercase rounded-lg'>
                            {user.name.charAt(0)}
                            {user.name.charAt(1)}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-5 items-center text-darker-gray tracking-base'>
                            <span className='text-black font-semibold text-2xl'>
                                {user.name}
                            </span>
                            <FollowCount
                                count={user.followers.length + 12312}
                            />
                            <FollowCount count={user.following.length + 4883} />
                        </div>
                        <Button className='bg-primary-blue text-white px-5 py-2 rounded font-semibold text-sm'>
                            Follow
                        </Button>
                    </div>
                    <p className='mt-3 font-medium text-lg text-light-gray line-clamp-3'>
                        {user.bio ?? 'This user has no bio yet.'}
                    </p>
                </div>
            </div>
        </div>
    )
}
