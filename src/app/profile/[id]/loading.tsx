import Image from 'next/image'

export default function ProfileLoading() {
    return (
        <div className='w-full grid place-content-center'>
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
