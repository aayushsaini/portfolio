import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (
                    credentials?.username === process.env.ADMIN_USERNAME &&
                    credentials?.password === process.env.ADMIN_PASSWORD
                ) {
                    return {
                        id: '1',
                        name: 'Admin',
                        email: 'admin@example.com',
                        role: 'admin',
                    }
                }
                return null
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as { role?: string }).role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as { role?: string }).role = token.role as string
            }
            return session
        },
    },
    session: {
        strategy: 'jwt',
    },
})
