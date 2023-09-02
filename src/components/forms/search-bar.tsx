import React from 'react'
import { Input } from '../ui/input'
import { AiOutlineSearch } from 'react-icons/ai'
import { Button } from '../ui/button'

export default function SearchBar() {
    return (
        <div className='relative mb-5'>
            <AiOutlineSearch className='absolute -translate-y-1/2 top-1/2 left-3 text-lg text-light-gray' />
            <Input
                className='bg-white border-0 px-10 py-6 focus-visible:ring-0 focus-visible:ring-offset-0'
                placeholder='Search'
            />
            <Button
                size={'lg'}
                className='absolute top-1/2 right-3 transform -translate-y-1/2 bg-primary-blue h-9'
            >
                Search
            </Button>
        </div>
    )
}
