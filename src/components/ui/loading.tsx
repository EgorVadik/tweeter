import Image from 'next/image'

export default function Loading() {
    return (
        <div className='grid w-full min-h-screen place-content-center'>
            <Image
                src={'/tweeter.svg'}
                width={300}
                height={300}
                alt='Tweeter'
                className='animate-bounce h-[200px] w-[200px] sm:h-[300px] sm:w-[300px]'
            />
        </div>
    )
}
