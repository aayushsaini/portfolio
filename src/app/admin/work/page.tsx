import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { DeleteProjectButton } from './delete-button'

async function getProjects() {
    try {
        return await prisma.project.findMany({
            orderBy: { order: 'asc' },
        })
    } catch {
        return []
    }
}

export default async function AdminWorkPage() {
    const projects = await getProjects()

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                        Work / Projects
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                        Manage your portfolio projects
                    </p>
                </div>
                <Link
                    href="/admin/work/new"
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Project
                </Link>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden">
                {projects.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-zinc-500">No projects yet. Add your first project!</p>
                    </div>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-200 dark:border-white/10">
                                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-500">
                                    Title
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-500">
                                    Category
                                </th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-500">
                                    Timeline
                                </th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr
                                    key={project.id}
                                    className="border-b border-zinc-100 dark:border-white/5 last:border-0"
                                >
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-zinc-900 dark:text-white">
                                            {project.title}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                        {project.category}
                                    </td>
                                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                        {project.timeline || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/work/${project.id}/edit`}
                                                className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <DeleteProjectButton id={project.id} />
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
