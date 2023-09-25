import ProfileSideNav from '@/components/nav/profile-side-nav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tweeter - Bookmarks',
    description: 'Tweeter Bookmarks page',
}

export default function BookmarksLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className='px-4 pt-5 sm:container'>
            <div className='flex flex-col gap-5 lg:flex-row'>
                <ProfileSideNav
                    navItems={[
                        { text: 'Top', href: '/bookmarks' },
                        {
                            text: 'Tweets & replies',
                            href: '/bookmarks/tweets-and-replies',
                        },
                        { text: 'Media', href: '/bookmarks/media' },
                        { text: 'Likes', href: '/bookmarks/likes' },
                    ]}
                />
                {children}
            </div>
        </main>
    )
}
