import { formatNumber } from '@/lib/helpers'
import { prisma } from '@/server/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import UserBanner from './user-banner'
import FollowDialog from '../dialogs/follow-dialog'
import FollowBtn from '../buttons/follow-btn'

import type { FollowUser } from '@/types/types'
import type { User } from 'next-auth'

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
    <span className='space-x-1 text-xs text-light-gray'>
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
        <Link href={'/profile/edit'}>
            <Button className='px-5 py-2 text-sm font-semibold text-white rounded bg-primary-blue'>
                Edit profile
            </Button>
        </Link>
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
            <div className='bg-white rounded-xl shadow-card-shadow p-5 md:max-h-40 max-h-72 -translate-y-12 max-w-[1108px] mx-auto'>
                <div className='flex flex-col items-center md:flex-row md:items-start gap-7'>
                    <div className='relative p-1 -translate-y-32 bg-white rounded-lg md:-translate-y-16 shadow-card-shadow'>
                        <Avatar className='rounded-lg w-36 h-36'>
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
                        <div className='flex flex-col items-center justify-between md:flex-row'>
                            <div className='flex flex-col items-center gap-1 md:flex-row md:gap-5 text-darker-gray tracking-base'>
                                <span className='max-w-[230px] sm:max-w-xs text-2xl font-semibold text-black truncate'>
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
                            <div className='hidden md:block'>
                                <FollowBtnWrapper
                                    id={id}
                                    currentUserId={currentUser.id}
                                    user={user}
                                />
                            </div>
                        </div>
                        <p
                            className='mt-3 text-lg font-medium text-center text-light-gray line-clamp-3 md:text-left'
                            style={{
                                // @ts-ignore
                                textWrap: 'balance',
                            }}
                        >
                            {user.bio == null
                                ? id === currentUser.id
                                    ? 'You have no bio yet. Start editing your profile now.'
                                    : 'This user has no bio yet.'
                                : user.bio}
                        </p>
                        <div className='flex justify-center mt-3 md:hidden'>
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
