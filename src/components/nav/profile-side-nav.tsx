import ProfileSideNavItem from './profile-side-nav-item'

type NavItem = {
    text: string
    href: string
}

type ProfileSideNavProps = {
    navItems: NavItem[]
}

export default function ProfileSideNav({ navItems }: ProfileSideNavProps) {
    return (
        <div className='bg-white h-fit rounded-lg xl:max-w-sm lg:max-w-xs 2md:max-w-[200px] w-full py-2'>
            <ul className='flex flex-col gap-3'>
                {navItems.map((navItem) => (
                    <ProfileSideNavItem
                        key={navItem.text}
                        text={navItem.text}
                        href={navItem.href}
                    />
                ))}

                {/* <ProfileSideNavItem text='Tweets' href='/profile/tweets' />
                <ProfileSideNavItem
                    text='Tweets & replies'
                    href='/profile/tweets-with-replies'
                />
                <ProfileSideNavItem text='Media' href='/profile/media' />
                <ProfileSideNavItem text='Likes' href='/profile/likes' /> */}
            </ul>
        </div>
    )
}
