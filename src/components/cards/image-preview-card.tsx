import React from 'react'
import { Progress } from '../ui/progress'
import Image from 'next/image'
import { BiTrash } from 'react-icons/bi'

type ImagePreviewCardProps = {
    uploadProgress: number
    imageUrl: string | null
    setValue: (field: 'image', value: any, options?: any) => void
    setImageUrl: React.Dispatch<React.SetStateAction<string | null>>
}

export default function ImagePreviewCard({
    uploadProgress,
    imageUrl,
    setValue,
    setImageUrl,
}: ImagePreviewCardProps) {
    return (
        <>
            {uploadProgress > 0 && (
                <div className='relative w-28'>
                    <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black z-10 text-sm'>
                        {uploadProgress}%
                    </span>
                    <Progress value={uploadProgress} />
                </div>
            )}
            {imageUrl !== null && (
                <div className='group relative h-24 w-28 mb-2'>
                    <Image
                        src={imageUrl}
                        alt='tweet image'
                        className='w-full h-full object-cover rounded-xl'
                        height={100}
                        width={100}
                    />

                    <div className='opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/60 rounded-xl duration-300'>
                        <button
                            type='button'
                            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                            onClick={() => {
                                setImageUrl(null)
                                setValue('image', null)
                            }}
                        >
                            <BiTrash className='text-light-red' size={24} />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
