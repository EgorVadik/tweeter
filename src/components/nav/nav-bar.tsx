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
        <nav className='flex items-center justify-around bg-white'>
            <Link href='/'>
                <Image
                    src={'/tweeter.svg'}
                    alt='tweeter logo'
                    height={30}
                    width={130}
                />
            </Link>
            <ul className='flex items-center gap-10'>
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
                            <span>{session.user.name}</span>
                            <ChevronDown
                                size={15}
                                className='ml-2 group-aria-expanded:-rotate-180 duration-200'
                            />
                        </button>
                    </ProfileDropdown>
                )}
            </div>
        </nav>
    )
}
