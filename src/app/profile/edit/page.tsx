import EditProfile from '@/components/forms/edit-profile-form'
import { getServerAuthSession } from '@/server/auth'
import { prisma } from '@/server/db'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function page() {
    const session = await getServerAuthSession()
    if (!session) redirect('/sign-in')

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            bio: true,
            email: true,
            id: true,
            image: true,
            name: true,
            bannerImage: true,
        },
    })
    if (!user) return redirect('/sign-in')

    return (
        <main className='flex flex-col items-center justify-center max-w-3xl min-h-screen p-5 m-auto'>
            <EditProfile user={user} />
        </main>
    )
}
