import { cn } from '@/lib/utils'
import React from 'react'

type TweetActionBtnProps = {
    children: React.ReactNode
    className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function TweetActionBtn({
    children,
    className,
    ...props
}: TweetActionBtnProps) {
    return (
        <button
            className={cn(
                'flex items-center justify-center gap-3 py-3 hover:bg-lighter-gray w-full rounded-lg',
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
