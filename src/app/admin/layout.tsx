'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
    LayoutDashboard,
    Briefcase,
    BookOpen,
    FileText,
    LogOut,
    Home,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/work', label: 'Work', icon: Briefcase },
    { href: '/admin/journal', label: 'Journal', icon: BookOpen },
    { href: '/admin/pages', label: 'Pages', icon: FileText },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()

    // Don't show layout on login page
    if (pathname === '/admin/login') {
        return <>{children}</>
    }

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin'
        return pathname.startsWith(href)
    }

    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 pt-20">
            <div className="flex">
                {/* Sidebar */}
                <aside className="fixed left-0 top-20 bottom-0 w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-white/10 p-6">
                    <div className="flex flex-col h-full">
                        <nav className="space-y-2 flex-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                                        isActive(item.href)
                                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <div className="space-y-2 pt-6 border-t border-zinc-200 dark:border-white/10">
                            <Link
                                href="/"
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                            >
                                <Home className="w-5 h-5" />
                                View Site
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 ml-64 p-8">{children}</main>
            </div>
        </div>
    )
}
