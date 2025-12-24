'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import dynamic from 'next/dynamic'
import { EditorCodePreview } from '@/components/mermaid-preview'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface PostFormData {
    title: string
    excerpt: string
    content: string
    date: string
    readTime: string
    image: string
    tags: string
}

interface PostFormProps {
    initialData?: PostFormData
    postId?: string
}

export function PostForm({ initialData, postId }: PostFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<PostFormData>(
        initialData || {
            title: '',
            excerpt: '',
            content: '',
            date: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }),
            readTime: '5 min read',
            image: '',
            tags: '',
        }
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = postId ? `/api/posts/${postId}` : '/api/posts'
            const method = postId ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map((t) => t.trim()),
                }),
            })

            if (res.ok) {
                router.push('/admin/journal')
                router.refresh()
            }
        } catch (error) {
            console.error('Failed to save:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/journal"
                    className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Posts
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    {loading ? 'Saving...' : 'Save Post'}
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-8 space-y-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    Post Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Date
                        </label>
                        <input
                            type="text"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="Dec 24, 2024"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Read Time
                        </label>
                        <input
                            type="text"
                            value={formData.readTime}
                            onChange={(e) =>
                                setFormData({ ...formData, readTime: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="5 min read"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Image URL *
                        </label>
                        <input
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Tags (comma-separated)
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="AI, React, Cloud"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Excerpt *
                    </label>
                    <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        required
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-8 space-y-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    Content (Markdown)
                </h2>

                <div data-color-mode="dark">
                    <MDEditor
                        value={formData.content}
                        onChange={(val) => setFormData({ ...formData, content: val || '' })}
                        height={400}
                        previewOptions={{
                            components: {
                                code: EditorCodePreview as React.ComponentType<React.HTMLAttributes<HTMLElement>>,
                            },
                        }}
                    />
                </div>
            </div>
        </form>
    )
}
