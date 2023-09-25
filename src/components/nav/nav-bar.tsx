import React from 'react'
import Image from 'next/image'
import { getServerAuthSession } from '@/server/auth'
import NavItem from './nav-item'
import { ChevronDown } from 'lucide-react'
import ProfileDropdown from '../dropdowns/profile-dropdown'
import Link from 'next/link'
import UserAvatar from '../cards/user-avatar'

export default async function NavBar() {
    const session = await getServerAuthSession()

    return (
        <nav className='flex items-center justify-between px-3 py-2 bg-white sm:justify-around sm:px-0 sm:py-0'>
            <Link href='/'>
                <Image
                    src={'/tweeter.svg'}
                    alt='tweeter logo'
                    height={30}
                    width={130}
                />
            </Link>
            <ul className='items-center hidden gap-10 sm:flex'>
                <NavItem href='/' text='Home' />
                <NavItem href='/explore' text='Explore' />
                <NavItem href='/bookmarks' text='Bookmarks' />
            </ul>
            <div>
                {session && (
                    <ProfileDropdown currentUser={session.user}>
                        <button className='flex items-center gap-2 rounded-md group'>
                            <UserAvatar
                                name={session.user.name}
                                image={session.user.image ?? undefined}
                            />
                            <span className='hidden sm:inline'>
                                {session.user.name}
                            </span>
                            <ChevronDown
                                size={15}
                                className='hidden ml-2 duration-200 group-aria-expanded:-rotate-180 sm:inline'
                            />
                        </button>
                    </ProfileDropdown>
                )}
            </div>
        </nav>
    )
}
