import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus, Edit } from 'lucide-react'
import { DeletePostButton } from './delete-button'

// Force dynamic rendering - don't cache this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getPosts() {
    try {
        return await prisma.blogPost.findMany({
            orderBy: { order: 'asc' },
        })
    } catch {
        return []
    }
}

export default async function AdminJournalPage() {
    const posts = await getPosts()

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                        Journal Posts
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                        Manage your blog posts
                    </p>
                </div>
                <Link
                    href="/admin/journal/new"
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Post
                </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden">
                {posts.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-zinc-500">No posts yet. Write your first article!</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-white/10">
                                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-500">
                                    Title
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-500">
                                    Date
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-500">
                                    Read Time
                                </th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr
                                    key={post.id}
                                    className="border-b border-zinc-100 dark:border-white/5 last:border-0"
                                >
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-zinc-900 dark:text-white">
                                            {post.title}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                        {post.date}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                        {post.readTime}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/journal/${post.id}/edit`}
                                                className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <DeletePostButton id={post.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
