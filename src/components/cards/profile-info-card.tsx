import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { formatNumber } from '@/lib/helpers'
import { prisma } from '@/server/db'
import { redirect } from 'next/navigation'
import UserBanner from './user-banner'
import { User } from 'next-auth'
import FollowDialog from '../dialogs/follow-dialog'
import FollowBtn from '../buttons/follow-btn'
import { FollowUser } from '@/types/types'

type ProfileInfoCardProps = {
    currentUser: User
    id: string
}

type WrapperProps = {
    id: string
    currentUserId: string
}

const FollowCount = ({
    count,
    followType,
}: {
    count: number
    followType: 'Following' | 'Followers'
}) => (
    <span className='text-xs text-light-gray space-x-1'>
        <span className='font-semibold text-darker-gray'>
            {formatNumber(count)}
        </span>
        <span>{followType}</span>
    </span>
)

const FollowBtnWrapper = ({
    id,
    currentUserId,
    user,
}: {
    user: FollowUser
} & WrapperProps) => {
    return id === currentUserId ? (
        <Button className='bg-primary-blue text-white px-5 py-2 rounded font-semibold text-sm'>
            Edit profile
        </Button>
    ) : (
        <FollowBtn
            followType={
                user.followersIds.includes(currentUserId)
                    ? 'Unfollow'
                    : 'Follow'
            }
            uid={user.id}
        />
    )
}

export default async function ProfileInfoCard({
    id,
    currentUser,
}: ProfileInfoCardProps) {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            followers: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    bio: true,
                    followersIds: true,
                },
            },
            following: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    bio: true,
                    followersIds: true,
                },
            },
        },
    })

    // @ts-ignore
    delete user?.password

    if (!user) {
        return redirect('/')
    }

    return (
        <>
            <UserBanner bannerImg={user.bannerImage} />
            <div className='bg-white rounded-xl shadow-card-shadow p-5 md:max-h-40 max-h-72 -translate-y-12 max-w-[1108px]'>
                <div className='flex md:flex-row flex-col md:items-start items-center gap-7'>
                    <div className='bg-white rounded-lg p-1 md:-translate-y-16 -translate-y-32 shadow-card-shadow relative'>
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
                    <div className='w-full md:translate-y-0 -translate-y-[9.5rem]'>
                        <div className='flex md:flex-row flex-col justify-between items-center'>
                            <div className='flex md:flex-row flex-col md:gap-5 gap-1 items-center text-darker-gray tracking-base'>
                                <span className='text-black font-semibold text-2xl'>
                                    {user.name}
                                </span>
                                <div className='flex gap-5'>
                                    <FollowDialog
                                        followType='followers'
                                        userName={user.name}
                                        isDisabled={user.followers.length === 0}
                                        follows={user.followers}
                                        currentUser={currentUser}
                                    >
                                        <FollowCount
                                            count={user.followers.length}
                                            followType='Followers'
                                        />
                                    </FollowDialog>

                                    <FollowDialog
                                        followType='following'
                                        userName={user.name}
                                        isDisabled={user.following.length === 0}
                                        follows={user.following}
                                        currentUser={currentUser}
                                    >
                                        <FollowCount
                                            count={user.following.length}
                                            followType='Following'
                                        />
                                    </FollowDialog>
                                </div>
                            </div>
                            <div className='md:block hidden'>
                                <FollowBtnWrapper
                                    id={id}
                                    currentUserId={currentUser.id}
                                    user={user}
                                />
                            </div>
                        </div>
                        <p
                            className='mt-3 font-medium text-lg text-light-gray line-clamp-3 text-center md:text-left '
                            style={{
                                // @ts-ignore
                                textWrap: 'balance',
                            }}
                        >
                            {user.bio ?? id === currentUser.id
                                ? 'You have no bio yet. Start editing your profile now.'
                                : 'This user has no bio yet.'}
                        </p>
                        <div className='md:hidden flex justify-center mt-3'>
                            <FollowBtnWrapper
                                id={id}
                                currentUserId={currentUser.id}
                                user={user}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
