'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import dynamic from 'next/dynamic'
import { EditorCodePreview } from '@/components/mermaid-preview'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface ProjectFormData {
    title: string
    category: string
    image: string
    description: string
    technologies: string
    role: string
    timeline: string
    challenge: string
    solution: string
    impact: string
    link: string
}

interface ProjectFormProps {
    initialData?: ProjectFormData
    projectId?: string
}

export function ProjectForm({ initialData, projectId }: ProjectFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<ProjectFormData>(
        initialData || {
            title: '',
            category: '',
            image: '',
            description: '',
            technologies: '',
            role: '',
            timeline: '',
            challenge: '',
            solution: '',
            impact: '',
            link: '',
        }
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = projectId ? `/api/projects/${projectId}` : '/api/projects'
            const method = projectId ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    technologies: formData.technologies.split(',').map((t) => t.trim()),
                }),
            })

            if (res.ok) {
                router.push('/admin/work')
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
                    href="/admin/work"
                    className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    {loading ? 'Saving...' : 'Save Project'}
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-8 space-y-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
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
                            Category *
                        </label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="e.g., BCG • Engineering"
                            required
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
                            Technologies (comma-separated) *
                        </label>
                        <input
                            type="text"
                            value={formData.technologies}
                            onChange={(e) =>
                                setFormData({ ...formData, technologies: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="React, TypeScript, Python"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Role
                        </label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                            Timeline
                        </label>
                        <input
                            type="text"
                            value={formData.timeline}
                            onChange={(e) =>
                                setFormData({ ...formData, timeline: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            placeholder="2023 - Present"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Project Link (optional)
                    </label>
                    <input
                        type="url"
                        value={formData.link}
                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Short Description *
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        rows={3}
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        required
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-8 space-y-6">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    Project Story (Markdown)
                </h2>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        The Challenge
                    </label>
                    <div data-color-mode="dark">
                        <MDEditor
                            value={formData.challenge}
                            onChange={(val) =>
                                setFormData({ ...formData, challenge: val || '' })
                            }
                            height={200}
                            previewOptions={{
                                components: {
                                    code: EditorCodePreview as React.ComponentType<React.HTMLAttributes<HTMLElement>>,
                                },
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        The Solution
                    </label>
                    <div data-color-mode="dark">
                        <MDEditor
                            value={formData.solution}
                            onChange={(val) =>
                                setFormData({ ...formData, solution: val || '' })
                            }
                            height={200}
                            previewOptions={{
                                components: {
                                    code: EditorCodePreview as React.ComponentType<React.HTMLAttributes<HTMLElement>>,
                                },
                            }}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Key Impact
                    </label>
                    <div data-color-mode="dark">
                        <MDEditor
                            value={formData.impact}
                            onChange={(val) => setFormData({ ...formData, impact: val || '' })}
                            height={200}
                            previewOptions={{
                                components: {
                                    code: EditorCodePreview as React.ComponentType<React.HTMLAttributes<HTMLElement>>,
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}
