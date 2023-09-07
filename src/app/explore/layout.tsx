import SearchBar from '@/components/forms/search-bar'
import ProfileSideNav from '@/components/nav/profile-side-nav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tweeter - Explore',
    description: 'Explore tweets from people around the world and more.',
}

export default function ExploreLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className='container pt-5'>
            <div className='flex lg:flex-row flex-col gap-5'>
                <ProfileSideNav
                    navItems={[
                        { text: 'Top', href: '/explore' },
                        {
                            text: 'Latest',
                            href: '/explore/latest',
                        },
                        { text: 'People', href: '/explore/people' },
                        { text: 'Media', href: '/explore/media' },
                    ]}
                />
                <div className='w-full'>
                    <SearchBar />
                    {children}
                </div>
            </div>
        </main>
    )
}
