import ProfileSideNavItem from './profile-side-nav-item'

export default function ProfileSideNav() {
    return (
        <div className='bg-white h-fit rounded-lg xl:max-w-sm lg:max-w-xs 2md:max-w-[200px] w-full py-2'>
            <ul className='flex flex-col gap-3'>
                <ProfileSideNavItem text='Tweets' href='/profile/tweets' />
                <ProfileSideNavItem
                    text='Tweets & replies'
                    href='/profile/tweets-with-replies'
                />
                <ProfileSideNavItem text='Media' href='/profile/media' />
                <ProfileSideNavItem text='Likes' href='/profile/likes' />
            </ul>
        </div>
    )
}
