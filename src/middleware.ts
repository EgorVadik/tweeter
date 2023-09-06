import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const token = await getToken({ req })
    const isAuth = !!token
    const pathName = req.nextUrl.pathname

    if (
        (pathName === '/' ||
            pathName.includes('/profile') ||
            pathName.includes('/bookmarks') ||
            pathName.includes('/explore')) &&
        !isAuth
    ) {
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    if ((pathName === '/sign-in' || pathName === '/sign-up') && isAuth) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/sign-up',
        '/profile/:path*',
        '/bookmarks/:path*',
        '/explore/:path*',
    ],
}
