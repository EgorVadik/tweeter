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

export default function ProfileDropdown({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className='rounded-xl p-2'>
                <DropdownMenuItem className='flex gap-2 items-center text-dark-gray px-4 py-3 rounded-lg'>
                    <FaUserCircle className='text-2xl' />
                    <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className='flex gap-2 items-center text-darker-gray px-4 py-3 rounded-lg'>
                    <IoMdSettings className='text-2xl' />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='flex gap-2 items-center text-light-red px-4 py-3 rounded-lg'
                    onClick={async () => await signOut()}
                >
                    <MdExitToApp className='text-2xl' />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
