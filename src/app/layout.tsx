import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import ClientProviders from '@/components/client-providers'
import NavBar from '@/components/nav/nav-bar'
import React from 'react'
import NavBarMob from '@/components/nav/nav-bar-mob'

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
    modal,
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body
                className={`bg-lighter-gray min-h-screen ${inter.className}`}
                style={{}}
            >
                <ClientProviders>
                    <NavBar />
                    {children}
                    <NavBarMob />
                    {modal}
                    <Toaster />
                </ClientProviders>
            </body>
        </html>
    )
}
