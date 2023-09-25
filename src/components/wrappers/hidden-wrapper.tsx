'use client'

import { usePathname } from 'next/navigation'

export default function HiddenWrapper({
    children,
}: {
    children: React.ReactNode
}) {
    const pathName = usePathname()
    return pathName === '/sign-in' || pathName === '/sign-up' ? null : children
}
