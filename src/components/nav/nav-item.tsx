'use client'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

import Link from 'next/link'

type Props = {
    href: string
    text: string
}

function CurrentlyOn({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                `absolute right-0 left-0 bottom-0 bg-primary-blue h-[6px] rounded-t`,
                className
            )}
        />
    )
}

export default function NavItem({ href, text }: Props) {
    const pathname = usePathname()

    const isCurrentlyOn =
        pathname === href ||
        (href === '/explore' && pathname.includes('/explore')) ||
        (href === '/bookmarks' && pathname.includes('/bookmarks'))

    return (
        <Link
            href={href}
            className={cn(
                `tracking-base font-sm text-light-gray font-medium group hover:text-primary-blue duration-300`,
                isCurrentlyOn && 'text-primary-blue font-semibold'
            )}
        >
            <li className='relative px-5 py-5'>
                {text}
                {isCurrentlyOn && <CurrentlyOn />}
                <CurrentlyOn className='duration-300 opacity-0 group-hover:opacity-100' />
            </li>
        </Link>
    )
}
