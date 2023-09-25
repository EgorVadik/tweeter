'use client'

import { useState } from 'react'
import EditInput from './edit-input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaArrowLeft } from 'react-icons/fa'
import axios, { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { UploadDropzone } from '@/utils/uploadthing'
import { useSession } from 'next-auth/react'

import type { UserEdit as UserType } from '@/types/types'
import { type UserEdit, UserEditSchema } from '@/validations/zod-validations'

type EditProfileProps = {
    user: UserType
}

export default function EditProfile({ user }: EditProfileProps) {
    const { register, handleSubmit, setValue } = useForm<UserEdit>({
        resolver: zodResolver(UserEditSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            bio: user.bio ?? undefined,
            image: user.image ?? undefined,
            bannerImage: user.bannerImage ?? undefined,
        },
    })
    const { toast } = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [profileImage, setProfileImage] = useState(user.image ?? '')
    const [bannerImage, setBannerImage] = useState(user.bannerImage ?? '')
    const { update } = useSession()

    const onSubmit = async (data: UserEdit) => {
        setLoading(true)
        try {
            const res = await axios.put('/api/profile/edit', data)
            if (res.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Your profile has been updated',
                })

                const newSession = await update({
                    name: data.name,
                    email: data.email,
                    image: data.image,
                    bannerImage: data.bannerImage,
                })

                router.back()
                router.refresh()
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    toast({
                        title: 'Error',
                        description: 'You are not authorized',
                    })
                }

                toast({
                    title: 'Error',
                    description: 'Something went wrong',
                })
            }
        } finally {
            setLoading(false)
        }
    }

    const handleImageUpload = (url: string) => {
        setProfileImage(url)
        setValue('image', url)
    }

    const handleBannerUpload = (url: string) => {
        setBannerImage(url)
        setValue('bannerImage', url)
    }

    return (
        <div className='w-full mb-10 space-y-3 sm:mb-0'>
            <button onClick={router.back} className='flex items-center gap-2'>
                <FaArrowLeft />
                Back
            </button>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='px-3 py-5 border sm:px-10 border-light-gray rounded-xl'
            >
                <div>
                    <h2 className='text-2xl tracking-[-0.84px]'>
                        Edit Profile
                    </h2>
                </div>
                <div className='flex items-center justify-center gap-4 my-7'>
                    {UploadImage(
                        profileImage,
                        handleImageUpload,
                        'Upload Profile Image'
                    )}
                    {UploadImage(
                        bannerImage,
                        handleBannerUpload,
                        'Upload Banner Image'
                    )}
                </div>
                <div className='space-y-5'>
                    <EditInput
                        label='name'
                        placeholder='Enter your name...'
                        value={user.name ?? ''}
                        register={register}
                        name='Name'
                        type='text'
                    />
                    <EditInput
                        label='bio'
                        placeholder='Enter your bio...'
                        value={user.bio ?? ''}
                        register={register}
                        name='Bio'
                        type='text'
                    />
                    <EditInput
                        label='email'
                        placeholder='Enter your email...'
                        value={user.email}
                        register={register}
                        name='Email'
                        type='email'
                    />
                </div>
                <div className='flex justify-end w-full pt-5'>
                    <Button className='px-3 py-2 rounded-lg' disabled={loading}>
                        {loading ? 'Loading...' : 'Save'}
                    </Button>
                </div>
            </form>
        </div>
    )
}

function UploadImage(
    profileImage: string,
    setImage: (url: string) => void,
    label: string
) {
    return (
        <UploadDropzone
            data-img={profileImage}
            endpoint='editProfileImages'
            onClientUploadComplete={(res) => {
                if (!res) return
                setImage(res[0].url)
            }}
            className='w-48 h-48 py-3 bg-center bg-cover cursor-pointer border-light-gray sm:whitespace-nowrap'
            appearance={{
                container: {
                    backgroundImage: `url("${profileImage}")`,
                },
                uploadIcon: {
                    visibility: 'hidden',
                },
                allowedContent: {
                    display: profileImage ? 'none' : 'block',
                },
                label: {
                    display: profileImage ? 'none' : 'block',
                },
            }}
            content={{
                label,
                allowedContent: 'Max 4MB',
            }}
            config={{
                mode: 'auto',
            }}
        />
    )
}
