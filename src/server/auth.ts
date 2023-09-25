import {
    type NextAuthOptions,
    type DefaultSession,
    getServerSession,
    User,
} from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/server/db'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string
            email: string
            name: string
            image: string | null
            bannerImage: string | null
            createdAt: Date
        } & DefaultSession['user']
    }
    interface User {
        id: string
        email: string
        name: string
        image: string | null
        bannerImage: string | null
        createdAt: Date
    }
    interface JWT {
        user: {
            id: string
            email: string
            name: string
            image: string | null
            bannerImage: string | null
            createdAt: Date
        } & DefaultSession['user']
    }
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET!,
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    type: 'text',
                },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                })

                if (!user) {
                    throw new Error('Invalid Email')
                }
                const isValid = await compare(
                    credentials?.password!,
                    user.password
                )
                if (!isValid) {
                    throw new Error('Invalid password')
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    bannerImage: user.bannerImage,
                    createdAt: user.createdAt,
                }
            },
        }),
    ],
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update') {
                const tokenUser = token.user as User

                tokenUser.email = session.email
                tokenUser.name = session.name
                tokenUser.image = session.image
                tokenUser.bannerImage = session.bannerImage

                return token
            }
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...(token.user as User),
                },
            }
        },
    },
}

export const getServerAuthSession = async () => {
    return await getServerSession(authOptions)
}
