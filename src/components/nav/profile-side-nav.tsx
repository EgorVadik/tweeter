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
        <div className='bg-white h-fit rounded-lg lg:max-w-xs w-full py-2'>
            <ul className='flex flex-col gap-3'>
                {navItems.map((navItem) => (
                    <ProfileSideNavItem
                        key={navItem.text}
                        text={navItem.text}
                        href={navItem.href}
                    />
                ))}
            </ul>
        </div>
    )
}
