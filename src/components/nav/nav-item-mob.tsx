'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
    children: React.ReactNode
    href: string
}

function CurrentlyOn({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                `absolute right-0 left-0 -bottom-[6px] bg-primary-blue h-[3px] rounded-t`,
                className
            )}
        />
    )
}

export default function NavItemMob({ children, href }: Props) {
    const pathname = usePathname()

    const isCurrentlyOn =
        pathname === href ||
        (href === '/explore' && pathname.includes('/explore')) ||
        (href === '/bookmarks' && pathname.includes('/bookmarks'))

    return (
        <Link
            href={href}
            className={cn(
                'relative flex items-center justify-center w-full py-2 mx-4 duration-300 rounded-lg hover:bg-lighter-gray',
                isCurrentlyOn ? 'text-primary-blue' : 'text-light-gray'
            )}
        >
            {children}
            {isCurrentlyOn && <CurrentlyOn />}
        </Link>
    )
}
