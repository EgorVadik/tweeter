'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

    return (
        <Link
            href={href}
            className={cn(
                `tracking-base font-sm text-light-gray font-medium group hover:text-primary-blue duration-300`,
                pathname === href && 'text-primary-blue font-semibold'
            )}
        >
            <li className='px-5 relative py-5'>
                {text}
                {pathname === href && <CurrentlyOn />}
                <CurrentlyOn className='opacity-0 group-hover:opacity-100 duration-300' />
            </li>
        </Link>
    )
}
