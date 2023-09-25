'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FaUserCircle } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { MdExitToApp } from 'react-icons/md'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import type { User } from 'next-auth'

export default function ProfileDropdown({
    children,
    currentUser,
}: {
    children: React.ReactNode
    currentUser: User
}) {
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className='p-2 rounded-xl'>
                <DropdownMenuItem
                    className='flex items-center gap-2 px-4 py-3 rounded-lg text-dark-gray'
                    onClick={() => router.push(`/profile/${currentUser.id}`)}
                >
                    <FaUserCircle className='text-2xl' />
                    <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className='flex items-center gap-2 px-4 py-3 rounded-lg text-darker-gray'
                    onClick={() => router.push('/profile/edit')}
                >
                    <IoMdSettings className='text-2xl' />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='flex items-center gap-2 px-4 py-3 rounded-lg text-light-red'
                    onClick={async () => await signOut()}
                >
                    <MdExitToApp className='text-2xl' />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
