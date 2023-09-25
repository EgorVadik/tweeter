'use client'

import Image from 'next/image'
import { useState } from 'react'
import EditInput from './edit-input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserEdit, UserEditSchema } from '@/validations/zod-validations'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'
import axios, { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { UploadDropzone } from '@/utils/uploadthing'

type EditProfileProps = {
    user: any
}

export default function EditProfile({ user }: EditProfileProps) {
    const { register, handleSubmit } = useForm<UserEdit>({
        resolver: zodResolver(UserEditSchema),
    })
    const { toast } = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [profileImage, setProfileImage] = useState(user.image ?? '')
    const [bannerImage, setBannerImage] = useState(user.banner ?? '')

    const onSubmit = async (data: UserEdit) => {
        setLoading(true)
        try {
            const res = await axios.put('/api/user/edit', data)
            if (res.status === 200) {
                toast({
                    title: 'Success',
                    description: 'Your profile has been updated',
                })
                router.push('/profile')
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

                if (error.response?.status === 400) {
                    toast({
                        title: 'Error',
                        description: 'Something went wrong',
                    })
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full space-y-3'>
            <Link href='..' className='flex items-center gap-2'>
                <FaArrowLeft />
                Back
            </Link>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='px-10 py-5 border border-light-gray rounded-xl'
            >
                <div>
                    <h2 className='text-2xl tracking-[-0.84px]'>
                        Edit Profile
                    </h2>
                </div>
                <div className='flex items-center justify-center gap-4 my-7'>
                    <UploadDropzone
                        endpoint='editProfileImages'
                        onClientUploadComplete={(res) => {
                            if (!res) return
                            setProfileImage(res[0].url)
                        }}
                        className='py-3 border-light-gray bg-[url()]'
                        appearance={{
                            uploadIcon: {
                                visibility: 'hidden',
                            },
                        }}
                        content={{
                            label: 'Upload Profile Image',
                            allowedContent: 'Max 4MB',
                        }}
                        config={{
                            mode: 'auto',
                        }}
                    />
                    <UploadDropzone
                        endpoint='editProfileImages'
                        onClientUploadComplete={(res) => {
                            if (!res) return
                            setBannerImage(res[0].url)
                        }}
                        className='py-3 border-light-gray'
                        content={{
                            label: 'Upload Profile Banner',
                            allowedContent: 'Max 4MB',
                        }}
                        config={{
                            mode: 'auto',
                        }}
                    />
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
