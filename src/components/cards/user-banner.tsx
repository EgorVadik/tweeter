type UserBannerProps = {
    bannerImg: string | null
}

export default function UserBanner({ bannerImg }: UserBannerProps) {
    return (
        <div>
            <div
                className='h-52 bg-gray/50 mx-[calc(-50vw+50%)] w-screen bg-center bg-cover rounded-b'
                style={{
                    backgroundImage: `url(${bannerImg})`,
                }}
            ></div>
        </div>
    )
}
