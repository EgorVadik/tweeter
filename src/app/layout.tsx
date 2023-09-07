import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import ClientProviders from '@/components/client-providers'
import NavBar from '@/components/nav/nav-bar'
import ProfileSideNav from '@/components/nav/profile-side-nav'
import SearchBar from '@/components/forms/search-bar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Tweeter - Home',
    description:
        'Tweeter is a (twitter clone) social media platform where you can share your thoughts with the world and connect with people. Sign up now and start tweeting from today.',
    viewport: {
        width: 'device-width',
        initialScale: 1,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className={`bg-lighter-gray min-h-screen ${inter.className}`}>
                <ClientProviders>
                    <NavBar />
                    {children}
                    <Toaster />
                </ClientProviders>
            </body>
        </html>
    )
}
