'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'

import Link from 'next/link'

type ProfileSideNavItemProps = {
    text: string
    href: string
}

function CurrentlyOn({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                `absolute top-0 left-0 bottom-0 bg-primary-blue w-1 rounded-r`,
                className
            )}
        />
    )
}

export default function ProfileSideNavItem({
    text,
    href,
}: ProfileSideNavItemProps) {
    const pathName = usePathname()

    return (
        <>
            <Link
                href={href}
                className={cn(
                    'px-4 py-2 font-semibold text-sm text-light-gray tracking-base hover:text-primary-blue duration-300 relative group',
                    pathName === href && 'text-primary-blue'
                )}
            >
                <li>
                    {pathName === href && <CurrentlyOn />}
                    <CurrentlyOn className='duration-300 opacity-0 group-hover:opacity-100' />
                    {text}
                </li>
            </Link>
        </>
    )
}
