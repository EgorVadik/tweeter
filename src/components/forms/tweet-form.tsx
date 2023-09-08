'use client'

import { Separator } from '@/components/ui/separator'
import { User } from 'next-auth'
import { MdPublic, MdPeople } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import PrivateReplyDropdown from '@/components/dropdowns/private-reply-dropdown'
import UserAvatar from '@/components/cards/user-avatar'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTweet } from '@/lib/api-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewTweetForm, newTweetSchema } from '@/validations/zod-validations'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import UploadBtn from '../buttons/upload-btn'
import ImagePreviewCard from '../cards/image-preview-card'

type TweetFormProps = {
    user: User
}

export default function TweetForm({ user }: TweetFormProps) {
    const pathName = usePathname()
    const [privateReply, setPrivateReply] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const { toast } = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<NewTweetForm>({
        resolver: zodResolver(newTweetSchema),
        defaultValues: {
            content: '',
            image: null,
            replyPrivate: false,
        },
    })

    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation({
        mutationFn: createTweet,
        onSuccess: () => {
            queryClient.invalidateQueries(['tweets', pathName], { exact: true })
            reset()
            setImageUrl(null)
            setUploadProgress(0)
            setPrivateReply(false)
        },
        onError: () => {
            toast({
                title: 'Something went wrong',
                description:
                    'An error occurred while creating your tweet, please try again.',
            })
        },
    })

    const onSubmit = (data: NewTweetForm) => {
        mutate(data)
    }

    const handlePrivateReply = (val: boolean) => {
        setPrivateReply(val)
    }

    useEffect(() => {
        if (errors.content?.message?.includes('2000')) {
            toast({
                title: 'Tweet is too long',
                description: 'Tweet must be less than 2000 characters',
            })
        }
    }, [errors.content?.message, toast])

    useEffect(() => {
        setValue('replyPrivate', privateReply)
    }, [privateReply, setValue])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-3 bg-white rounded-xl shadow-card-shadow p-3 lg:max-w-3xl w-full'
        >
            <p className='tracking-base font-semibold text-xs text-dark-gray'>
                Tweet something
            </p>
            <Separator />
            <div className='flex items-centers'>
                <UserAvatar name={user.name} image={user.image ?? undefined} />
                <div className='px-3 py-1 w-full font-medium tracking-base text-dark-gray'>
                    <div className='flex items-center gap-2'>
                        <textarea
                            className='w-full resize-none bg-transparent outline-none'
                            placeholder="What's happening?"
                            rows={3}
                            {...register('content')}
                        />
                        <ImagePreviewCard
                            uploadProgress={uploadProgress}
                            imageUrl={imageUrl}
                            setValue={setValue}
                            setImageUrl={setImageUrl}
                        />
                    </div>
                    <div className='flex items-center justify-between text-primary-blue'>
                        <div className='flex items-center gap-2'>
                            <UploadBtn
                                setUploadProgress={setUploadProgress}
                                setImageUrl={setImageUrl}
                                setValue={setValue}
                                toast={toast}
                            />

                            <PrivateReplyDropdown
                                setPrivateReply={handlePrivateReply}
                            >
                                <button
                                    type='button'
                                    className='flex items-center gap-2'
                                >
                                    {privateReply ? (
                                        <>
                                            <MdPeople size={24} />
                                            <span>Only people you follow</span>
                                        </>
                                    ) : (
                                        <>
                                            <MdPublic size={24} />
                                            <span>Everyone can reply</span>
                                        </>
                                    )}
                                </button>
                            </PrivateReplyDropdown>
                        </div>
                        <Button
                            disabled={isLoading}
                            className='bg-primary-blue hover:bg-primary-blue/80 px-8'
                        >
                            {isLoading && (
                                <Loader2
                                    className='mr-2 animate-spin'
                                    size={24}
                                />
                            )}
                            Tweet
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
