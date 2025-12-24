import { prisma } from '@/lib/prisma'
import { Briefcase, BookOpen, FileText } from 'lucide-react'
import Link from 'next/link'

// Force dynamic rendering - don't cache this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getStats() {
    try {
        const [projectCount, postCount, pageCount] = await Promise.all([
            prisma.project.count(),
            prisma.blogPost.count(),
            prisma.pageContent.count(),
        ])
        return { projectCount, postCount, pageCount }
    } catch {
        return { projectCount: 0, postCount: 0, pageCount: 0 }
    }
}

export default async function AdminDashboard() {
    const { projectCount, postCount, pageCount } = await getStats()

    const stats = [
        {
            label: 'Projects',
            count: projectCount,
            icon: Briefcase,
            href: '/admin/work',
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            label: 'Journal Posts',
            count: postCount,
            icon: BookOpen,
            href: '/admin/journal',
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
        },
        {
            label: 'Pages',
            count: pageCount,
            icon: FileText,
            href: '/admin/pages',
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-500/10',
        },
    ]

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                    Dashboard
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                    Welcome to your portfolio CMS
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Link key={stat.label} href={stat.href}>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-zinc-500 text-sm">{stat.label}</p>
                                    <p className="text-4xl font-bold text-zinc-900 dark:text-white mt-1">
                                        {stat.count}
                                    </p>
                                </div>
                                <div
                                    className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center`}
                                >
                                    <stat.icon className={`w-7 h-7 ${stat.color}`} />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                    Quick Actions
                </h2>
                <div className="flex gap-4">
                    <Link
                        href="/admin/work/new"
                        className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                    >
                        Add Project
                    </Link>
                    <Link
                        href="/admin/journal/new"
                        className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                        Add Journal Post
                    </Link>
                </div>
            </div>
        </div>
    )
}
