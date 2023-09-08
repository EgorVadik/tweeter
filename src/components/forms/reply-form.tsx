'use client'

import { User } from 'next-auth'
import UserAvatar from '../cards/user-avatar'
import { Input } from '../ui/input'
import { MdOutlineImage } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewReplyForm, newReplySchema } from '@/validations/zod-validations'
import UploadBtn from '../buttons/upload-btn'
import { useToast } from '../ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { createReply } from '@/lib/api-client'
import Image from 'next/image'
import { Progress } from '../ui/progress'
import ImagePreviewCard from '../cards/image-preview-card'
import { Loader2 } from 'lucide-react'

type ReplyFormProps = {
    user: User
    commentFocus: boolean
    tweetId: string
}

export default function ReplyForm({
    user,
    commentFocus,
    tweetId,
}: ReplyFormProps) {
    const [initialRender, setInitialRender] = useState(true)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const pathName = usePathname()
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const { register, handleSubmit, reset, setValue, trigger, getValues } =
        useForm<NewReplyForm>({
            resolver: zodResolver(newReplySchema),
            defaultValues: {
                content: '',
                image: null,
            },
        })

    const { mutate, isLoading } = useMutation({
        mutationFn: createReply,
        onSuccess: () => {
            queryClient.invalidateQueries(['tweets', pathName], { exact: true })
            reset()
            setImageUrl(null)
            setUploadProgress(0)
        },
        onError: () => {
            toast({
                title: 'Something went wrong',
                description:
                    'An error occurred while creating your tweet, please try again.',
            })
        },
    })

    useEffect(() => {
        if (initialRender) return
        if (getValues('content').trim() === '') {
            trigger('content', {
                shouldFocus: true,
            })
            return
        }

        handleSubmit(onSubmit)()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentFocus])

    useEffect(() => {
        setInitialRender(false)
    }, [])

    const onSubmit = (data: NewReplyForm) => {
        mutate({ reply: data, tweetId })
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-end gap-3 mt-3 relative'
        >
            <div className='flex w-full gap-3'>
                <UserAvatar name={user.name} image={user.image ?? undefined} />
                <Input
                    className='border-0 bg-lighter-gray focus-visible:ring-0 focus-visible:ring-offset-0'
                    placeholder='Tweet your reply'
                    {...register('content')}
                    disabled={isLoading}
                />

                <div className='absolute right-2 top-2 text-gray cursor-pointer'>
                    <UploadBtn
                        setImageUrl={setImageUrl}
                        setUploadProgress={setUploadProgress}
                        setValue={setValue}
                        toast={toast}
                    />
                </div>
            </div>

            <div>
                <ImagePreviewCard
                    uploadProgress={uploadProgress}
                    imageUrl={imageUrl}
                    setValue={setValue}
                    setImageUrl={setImageUrl}
                />
                {isLoading && <Loader2 className='animate-spin' size={24} />}
            </div>
        </form>
    )
}
