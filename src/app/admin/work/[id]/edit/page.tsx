import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProjectForm } from '../../project-form'

interface PageProps {
    params: Promise<{ id: string }>
}

async function getProject(id: string) {
    try {
        return await prisma.project.findUnique({
            where: { id },
        })
    } catch {
        return null
    }
}

export default async function EditProjectPage({ params }: PageProps) {
    const { id } = await params
    const project = await getProject(id)

    if (!project) {
        notFound()
    }

    const initialData = {
        title: project.title,
        category: project.category,
        image: project.image,
        description: project.description,
        technologies: JSON.parse(project.technologies).join(', '),
        role: project.role || '',
        timeline: project.timeline || '',
        challenge: project.challenge || '',
        solution: project.solution || '',
        impact: project.impact || '',
        link: project.link || '',
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
                Edit Project
            </h1>
            <ProjectForm initialData={initialData} projectId={id} />
        </div>
    )
}
