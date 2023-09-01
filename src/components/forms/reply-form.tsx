'use client'

import { User } from 'next-auth'
import UserAvatar from '../cards/user-avatar'
import { Input } from '../ui/input'
import { MdOutlineImage } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'

type ReplyFormProps = {
    user: User
    commentFocus: boolean
}

export default function ReplyForm({ user, commentFocus }: ReplyFormProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [initialRender, setInitialRender] = useState(true)

    useEffect(() => {
        if (initialRender) return
        if (!inputRef.current) return

        inputRef.current.focus()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentFocus])

    useEffect(() => {
        setInitialRender(false)
    }, [])

    return (
        <div className='flex items-center gap-3 mt-3 relative'>
            <UserAvatar name={user.name} image={user.image ?? undefined} />
            <Input
                ref={inputRef}
                className='border-0 bg-lighter-gray focus-visible:ring-0 focus-visible:ring-offset-0'
                placeholder='Tweet your reply'
            />
            <label
                htmlFor='reply-image'
                className='absolute right-2 top-2 text-gray cursor-pointer'
            >
                <MdOutlineImage size={20} />
                <input id='reply-image' type='file' className='sr-only' />
            </label>
        </div>
    )
}
