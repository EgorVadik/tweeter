type UserBannerProps = {
    bannerImg: string | null
}

export default function UserBanner({ bannerImg }: UserBannerProps) {
    return (
        <div>
            {bannerImg == null ? (
                <div
                    className='h-52 bg-gray-200 mx-[calc(-50vw+50%)] w-screen bg-center bg-cover'
                    style={{
                        backgroundImage: `url(https://media.istockphoto.com/id/1476161157/photo/blank-vertical-advertising-banners-on-street-lampposts-double-hanging-posters-by-the-road.jpg?s=612x612&w=is&k=20&c=T81dyvhzv11NblMWP2cjp7ShO0QLc4vXPArSzkjGSSo=)`,
                    }}
                ></div>
            ) : (
                <div
                    className='h-52 bg-gray-200 mx-[calc(-50vw+50%)] w-screen bg-center bg-cover rounded-b'
                    style={{
                        backgroundImage: `url(${bannerImg})`,
                    }}
                ></div>
            )}
        </div>
    )
}
