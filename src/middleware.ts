import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isLoginPage = req.nextUrl.pathname === '/admin/login'

    if (isAdminRoute && !isLoginPage && !isLoggedIn) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    if (isLoginPage && isLoggedIn) {
        return NextResponse.redirect(new URL('/admin', req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ['/admin/:path*'],
}
