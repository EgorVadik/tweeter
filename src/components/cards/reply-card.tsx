import { Reply } from '@/types/types'
import React from 'react'
import UserAvatar from './user-avatar'
import { formatDate, formatNumber } from '@/lib/helpers'
import { MdFavoriteBorder } from 'react-icons/md'
import Image from 'next/image'

type ReplyCardProps = {
    reply: Reply
    currentUserId: string
}

export default function ReplyCard({ reply, currentUserId }: ReplyCardProps) {
    const isLiked = reply.replyLikes.some(
        (like) => like.userId === currentUserId
    )

    return (
        <>
            <div className='flex gap-3'>
                <UserAvatar
                    name={reply.user.name}
                    image={reply.user.image ?? undefined}
                />
                <div className='w-full flex flex-col gap-2'>
                    <div className='bg-lighter-gray flex flex-col p-3 w-full rounded-lg'>
                        <div className='flex gap-2 items-center'>
                            <span className='text-black tracking-base font-medium'>
                                {reply.user.name}
                            </span>
                            <span className='text-xs text-light-gray'>
                                {formatDate(reply.createdAt)}
                            </span>
                        </div>
                        <p className='text-dark-gray tracking-base mt-3 p-1'>
                            {reply.text}
                        </p>

                        {reply.image && (
                            <div className='mt-3'>
                                <Image
                                    src={reply.image}
                                    alt={reply.text}
                                    className='rounded-lg'
                                    width={500}
                                    height={500}
                                />
                            </div>
                        )}
                    </div>
                    <div className='flex items-center gap-5 text-xs text-gray font-semibold tracking-base'>
                        <button
                            className={`flex items-center gap-1 hover:text-light-red duration-200 ${
                                isLiked ? 'text-light-red' : ''
                            }`}
                        >
                            <MdFavoriteBorder />
                            <span>Liked</span>
                        </button>
                        <span>
                            {formatNumber(reply.replyLikes.length)} Likes
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
