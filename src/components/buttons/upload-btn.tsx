import { UploadDropzone } from '@/utils/uploadthing'
import React from 'react'
import { MdOutlineImage } from 'react-icons/md'

type UploadBtnProps = {
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>
    setImageUrl: React.Dispatch<React.SetStateAction<string | null>>
    setValue: (name: 'image', value: string) => void
    toast: any
}

export default function UploadBtn({
    setUploadProgress,
    setImageUrl,
    setValue,
    toast,
}: UploadBtnProps) {
    return (
        <UploadDropzone
            content={{
                uploadIcon: (
                    <MdOutlineImage className='cursor-pointer' size={24} />
                ),
            }}
            appearance={{
                button: {
                    display: 'none',
                },
                allowedContent: {
                    display: 'none',
                },
                label: {
                    display: 'none',
                },
            }}
            className='w-fit outline-none ring-0 ring-offset-0 p-0 border-0 m-0'
            endpoint='tweetImageUpload'
            onClientUploadComplete={(data) => {
                setUploadProgress(0)
                setImageUrl(data![0].url)
                setValue('image', data![0].url)
            }}
            onUploadProgress={(progress) => {
                setUploadProgress(progress)
            }}
            onUploadError={() => {
                setUploadProgress(0)
                toast({
                    title: 'Something went wrong',
                    description:
                        'An error occurred while uploading your image, please try again.',
                })
            }}
            onUploadBegin={() => {
                setUploadProgress(0)
                setImageUrl(null)
            }}
            config={{
                mode: 'auto',
            }}
        />
    )
}
