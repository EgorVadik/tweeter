import { prisma } from '@/server/db'
import { User } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
    tweetImageUpload: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
        .middleware(async ({ req }) => {
            const user = (await getToken({
                req,
            })) as User | null

            console.log({ user })

            if (!user) throw new Error('Unauthorized')
            return { userId: user.id }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // const user = await prisma.user.update({
            //     where: { id: metadata.userId },
            //     data: { image: file.url },
            // })
            console.log({ metadata, file })
        }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter