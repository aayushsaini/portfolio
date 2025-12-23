import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ResumeButton } from '@/components/layout/resume-button'
import { ScrollToTop } from '@/components/scroll-to-top'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    metadataBase: new URL(process.env.SITE_URL || 'https://aayushsaini.com'),
    title: {
        default: 'Aayush Saini | Software Engineer',
        template: '%s | Aayush Saini',
    },
    description:
        'Software Engineer at BCG specializing in Agentic AI, High-Performance React Architectures, and Cloud-Native Solutions.',
    keywords: [
        'Software Engineer',
        'React',
        'Next.js',
        'TypeScript',
        'AI',
        'Agentic AI',
        'LangChain',
        'Azure',
        'Full Stack Developer',
        'BCG',
        'Boston Consulting Group',
    ],
    authors: [{ name: 'Aayush Saini' }],
    creator: 'Aayush Saini',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'Aayush Saini',
        title: 'Aayush Saini | Software Engineer',
        description:
            'Software Engineer at BCG specializing in Agentic AI, High-Performance React Architectures, and Cloud-Native Solutions.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Aayush Saini - Software Engineer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Aayush Saini | Software Engineer',
        description:
            'Software Engineer at BCG specializing in Agentic AI, High-Performance React Architectures, and Cloud-Native Solutions.',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider>
                    <ScrollToTop />
                    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white selection:bg-blue-500/30 transition-colors duration-300">
                        <Header />
                        <main className="min-h-screen">{children}</main>
                        <Footer />
                        <ResumeButton />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
