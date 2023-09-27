'use client'

import React from 'react'
import { formatDate, formatNumber } from '@/lib/helpers'
import { usePathname } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toggleReplyLike } from '@/lib/api-client'
import { useToast } from '../ui/use-toast'

import UserAvatar from './user-avatar'
import { MdFavoriteBorder } from 'react-icons/md'
import Image from 'next/image'

import { AxiosError } from 'axios'
import type { Reply } from '@/types/types'

type ReplyCardProps = {
    reply: Reply
    currentUserId: string
}

export default function ReplyCard({ reply, currentUserId }: ReplyCardProps) {
    const pathName = usePathname()
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const { mutate } = useMutation({
        mutationFn: toggleReplyLike,
        onSuccess: () => {
            queryClient.invalidateQueries(['tweets', pathName], {
                exact: true,
            })
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                switch (err.response?.status) {
                    case 400:
                        toast({
                            title: 'Invalid tweet id',
                            description: 'The tweet id is invalid',
                        })
                        break

                    case 401:
                        toast({
                            title: 'Unauthorized',
                            description: 'You are not authorized',
                        })
                        break

                    case 419:
                        toast({
                            title: 'Already retweeted',
                            description: 'You already retweeted this tweet',
                        })
                        break

                    default:
                        toast({
                            title: 'Error',
                            description: 'Something went wrong',
                        })
                        break
                }
            }
        },
    })

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
                <div className='flex flex-col w-full gap-2'>
                    <div className='flex flex-col w-full p-3 rounded-lg bg-lighter-gray'>
                        <div className='flex items-center gap-2'>
                            <span className='font-medium text-black tracking-base'>
                                {reply.user.name}
                            </span>
                            <span className='text-xs text-light-gray'>
                                {formatDate(reply.createdAt)}
                            </span>
                        </div>
                        <p className='p-1 mt-3 text-dark-gray tracking-base'>
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
                    <div className='flex items-center gap-5 text-xs font-semibold text-gray tracking-base'>
                        <button
                            onClick={() => mutate(reply.id)}
                            className={`flex items-center gap-1 hover:text-light-red duration-200 ${
                                isLiked ? 'text-light-red' : ''
                            }`}
                        >
                            <MdFavoriteBorder />
                            <span>{isLiked ? 'Liked' : 'Like'}</span>
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
