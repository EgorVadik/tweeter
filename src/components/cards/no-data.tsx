import React from 'react'

type NoDataProps = {
    title: string
    subtitle: string
}

export default function NoData({ title, subtitle }: NoDataProps) {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <div className='flex flex-col items-center justify-center gap-2'>
                <div className='flex items-center justify-center w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-800'>
                    <svg
                        className='w-8 h-8 text-stone-300 dark:text-stone-700'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                    >
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4Z'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M12 6C8.686 6 6 8.686 6 12C6 15.314 8.686 18 12 18C15.314 18 18 15.314 18 12C18 8.686 15.314 6 12 6ZM12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8Z'
                        />
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M12 10C11.448 10 11 10.448 11 11V13C11 13.552 11.448 14 12 14C12.552 14 13 13.552 13 13V11C13 10.448 12.552 10 12 10Z'
                        />
                    </svg>
                </div>
                <div className='flex flex-col items-center justify-center w-full'>
                    <h2 className='text-xl font-bold text-center text-stone-900 dark:text-stone-100'>
                        {title}
                    </h2>
                    <p className='text-sm text-center text-stone-500 dark:text-stone-400'>
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    )
}
