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
        <main className='container pt-5'>
            <div className='flex gap-5'>
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
