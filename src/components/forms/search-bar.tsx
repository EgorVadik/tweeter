'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button } from '../ui/button'
import { useDebouncedState } from '@mantine/hooks'
import axios from 'axios'
import UserCard from '../cards/user-card'
import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { useSession } from 'next-auth/react'

import type { UserSearch } from '@/types/types'

export default function SearchBar() {
    const { data: userSession } = useSession()
    const [search, setSearch] = useDebouncedState('', 500)
    const [people, setPeople] = useState<UserSearch[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (search.trim() === '') return setPeople([])

        const getPeople = async () => {
            setLoading(true)
            const data = await axios.get('/api/search', {
                params: { search },
            })
            setPeople(data.data)
            setLoading(false)
        }

        getPeople()
    }, [search])

    return (
        <>
            <div
                className={cn(
                    'relative lg:max-w-3xl',
                    search.trim() === '' && 'mb-5'
                )}
            >
                <AiOutlineSearch className='absolute text-lg -translate-y-1/2 top-1/2 left-3 text-light-gray' />
                <Input
                    className={cn(
                        'px-10 py-6 bg-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0',
                        search.trim() !== '' && 'rounded-b-none'
                    )}
                    placeholder='Search'
                    onChange={(e) => setSearch(e.currentTarget.value)}
                />
                <Button
                    size={'lg'}
                    className='absolute transform -translate-y-1/2 top-1/2 right-3 bg-primary-blue h-9'
                >
                    Search
                </Button>
            </div>
            {search.trim() === '' ? null : people.length > 0 ? (
                <div className='left-0 right-0 z-20 p-3 bg-white rounded-b-md -bottom-[42px] mb-5 lg:max-w-3xl border-t border-gray/60'>
                    {people.map((user) => (
                        <React.Fragment key={user.id}>
                            <UserCard
                                user={user}
                                followType={
                                    user.followersIds?.includes(
                                        userSession?.user.id ?? ''
                                    )
                                        ? 'Unfollow'
                                        : 'Follow'
                                }
                            />
                            <Separator className='mb-3 last:hidden' />
                        </React.Fragment>
                    ))}
                </div>
            ) : loading ? null : (
                <div className='left-0 right-0 z-20 p-3 bg-white rounded-b-md border-t border-gray/60 -bottom-[42px] mb-5 lg:max-w-3xl'>
                    <p className='text-sm font-medium text-center text-light-gray tracking-base'>
                        No results found. for {`'${search}'`}
                    </p>
                </div>
            )}
        </>
    )
}
