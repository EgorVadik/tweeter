'use client'

import { formatDate, formatNumber } from '@/lib/helpers'
import { Tweet } from '@prisma/client'
import Image from 'next/image'
import TweetActionBtn from '@/components/buttons/tweet-action-btn'
import { Separator } from '@/components/ui/separator'
import UserAvatar from './user-avatar'
import {
    MdOutlineModeComment,
    MdLoop,
    MdFavoriteBorder,
    MdBookmarkBorder,
} from 'react-icons/md'
import ReplyForm from '../forms/reply-form'
import { HomeTweet, PartialUser } from '@/types/types'
import { User } from 'next-auth'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { handleTweetActions } from '@/lib/api-client'
import { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

type TweetCardProps = {
    tweet: HomeTweet
    user: PartialUser
    currentUser: User
}

export default function TweetCard({
    tweet,
    user,
    currentUser,
}: TweetCardProps) {
    const [commentFocus, setCommentFocus] = useState(false)
    const { toast } = useToast()

    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation({
        mutationFn: handleTweetActions,
        onSuccess: () => {
            queryClient.invalidateQueries(['tweets'], { exact: true })
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

    const userIn = (data: { userId: string }[]) =>
        data.find((retweet) => retweet.userId === currentUser.id) !== undefined

    return (
        <div className='bg-white max-w-3xl shadow-card-shadow rounded-lg p-4 my-5 first:mt-0 last:mb-0'>
            <div className='flex items-center gap-2'>
                <UserAvatar name={user.name} image={user.image ?? undefined} />
                <div className='flex flex-col'>
                    <span className='text-black tracking-base font-medium'>
                        {user.name}
                    </span>
                    <span className='text-xs text-light-gray'>
                        {formatDate(tweet.createdAt)}
                    </span>
                </div>
            </div>
            <p className='text-dark-gray tracking-base mt-3'>{tweet.text}</p>
            {tweet.image && (
                <div className='mt-3'>
                    <Image
                        src={tweet.image}
                        alt={tweet.text}
                        width={500}
                        height={500}
                        className='rounded-md w-fit max-h-80 object-cover mx-auto'
                    />
                </div>
            )}

            <div className='flex items-center justify-end gap-4 text-xs font-medium tracking-base my-3 text-gray'>
                <p>
                    {formatNumber(tweet.replies.length)} <span>Replies</span>
                </p>

                <p>
                    {formatNumber(tweet.retweets.length)} <span>Retweets</span>
                </p>

                <p>
                    {formatNumber(tweet.savedTweets.length)} <span>Saved</span>
                </p>
            </div>

            <Separator className='bg-lighter-gray' />
            <div className='flex items-center justify-evenly py-1'>
                <TweetActionBtn
                    onClick={() => setCommentFocus((prev) => !prev)}
                >
                    <MdOutlineModeComment className='text-xl' />
                    Comment
                </TweetActionBtn>
                <TweetActionBtn
                    onClick={() => mutate({ id: tweet.id, action: 'retweet' })}
                    className={`${
                        userIn(tweet.retweets) && 'text-light-green'
                    }`}
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className='animate-spin text-xl' />}
                    <MdLoop className='text-xl' />
                    Retweet
                </TweetActionBtn>
                <TweetActionBtn
                    onClick={() => mutate({ id: tweet.id, action: 'like' })}
                    className={`${userIn(tweet.likes) && 'text-light-red'}`}
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className='animate-spin text-xl' />}
                    <MdFavoriteBorder className='text-xl' />
                    Like
                </TweetActionBtn>
                <TweetActionBtn
                    onClick={() => mutate({ id: tweet.id, action: 'save' })}
                    className={`${
                        userIn(tweet.savedTweets) && 'text-secondary-blue'
                    }`}
                >
                    {isLoading && <Loader2 className='animate-spin text-xl' />}
                    <MdBookmarkBorder className='text-xl' />
                    Save
                </TweetActionBtn>
            </div>
            <Separator className='bg-lighter-gray' />

            <ReplyForm commentFocus={commentFocus} user={currentUser} />
        </div>
    )
}
