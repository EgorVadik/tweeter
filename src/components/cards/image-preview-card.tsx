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
                    <span className='absolute z-10 text-sm text-black -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
                        {uploadProgress}%
                    </span>
                    <Progress value={uploadProgress} />
                </div>
            )}
            {imageUrl !== null && (
                <div className='relative h-24 mb-2 group w-28'>
                    <Image
                        src={imageUrl}
                        alt='tweet image'
                        className='object-cover w-full h-full rounded-xl'
                        height={100}
                        width={100}
                    />

                    <div className='absolute inset-0 duration-300 opacity-0 group-hover:opacity-100 bg-black/60 rounded-xl'>
                        <button
                            type='button'
                            className='absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
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
