import React from 'react'
import { UseFormRegister } from 'react-hook-form'

import { Input } from '../ui/input'

import type { UserEdit } from '@/validations/zod-validations'

type InputProps = {
    register: UseFormRegister<UserEdit>
    label: 'email' | 'name' | 'bio'
    type: string
    placeholder: string
    name: string
    value?: string
}

export default function EditInput({
    register,
    label,
    type,
    placeholder,
    value,
    name,
}: InputProps) {
    return (
        <div className='space-y-2'>
            <label htmlFor={label}>{name}</label>
            {label === 'bio' ? (
                <textarea
                    id={label}
                    {...register(label)}
                    defaultValue={value}
                    placeholder={placeholder}
                    className='w-full p-4 border rounded-lg resize-none border-lighter-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2'
                />
            ) : (
                <Input
                    id={label}
                    {...register(label)}
                    type={type}
                    defaultValue={value}
                    placeholder={placeholder}
                    className='w-full p-4 border rounded-lg border-lighter-gray'
                />
            )}
        </div>
    )
}
