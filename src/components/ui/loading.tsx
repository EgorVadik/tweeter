import Image from 'next/image'

export default function Loading() {
    return (
        <div className='min-h-screen w-full grid place-content-center'>
            <Image
                src={'/tweeter.svg'}
                width={300}
                height={300}
                alt='Tweeter'
                className='animate-bounce'
            />
        </div>
    )
}
