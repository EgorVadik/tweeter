import ProfileInfoCard from '@/components/cards/profile-info-card'
import ProfileSideNav from '@/components/nav/profile-side-nav'
import { getServerAuthSession } from '@/server/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Tweeter - Profile',
    description: 'Tweeter Profile Page',
}

export default async function ProfileLayout({
    params: { id },
    children,
}: {
    children: React.ReactNode
    params: { id: string }
}) {
    const session = await getServerAuthSession()

    return (
        <main className='px-4 sm:container'>
            <ProfileInfoCard id={id} currentUser={session!.user} />
            <div className='flex flex-col justify-center gap-5 lg:flex-row'>
                <ProfileSideNav
                    navItems={[
                        { text: 'tweets', href: `/profile/${id}` },
                        {
                            text: 'Tweets & replies',
                            href: `/profile/${id}/tweets-and-replies`,
                        },
                        { text: 'Media', href: `/profile/${id}/media` },
                        { text: 'Likes', href: `/profile/${id}/likes` },
                    ]}
                />
                {children}
            </div>
        </main>
    )
}
