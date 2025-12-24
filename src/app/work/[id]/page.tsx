import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { ProjectDetail } from '@/components/project-detail'
import { ProjectSchema } from '@/components/structured-data'
import { PROJECTS } from '@/lib/constants'
import { Project } from '@/types'

interface PageProps {
    params: Promise<{ id: string }>
}

async function getProject(id: string): Promise<Project | null> {
    try {
        const dbProject = await prisma.project.findUnique({
            where: { id },
        })

        if (dbProject) {
            return {
                ...dbProject,
                technologies: JSON.parse(dbProject.technologies),
            }
        }

        // Fallback to constants
        return PROJECTS.find((p) => p.id === id) || null
    } catch {
        return PROJECTS.find((p) => p.id === id) || null
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const project = await getProject(id)

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: `${project.title} | Aayush Saini`,
            description: project.description,
            images: [project.image],
        },
    }
}

export async function generateStaticParams() {
    try {
        const projects = await prisma.project.findMany({
            select: { id: true },
        })

        if (projects.length === 0) {
            return PROJECTS.map((p) => ({ id: p.id }))
        }

        return projects.map((p) => ({ id: p.id }))
    } catch {
        return PROJECTS.map((p) => ({ id: p.id }))
    }
}

export default async function ProjectPage({ params }: PageProps) {
    const { id } = await params
    const project = await getProject(id)

    if (!project) {
        notFound()
    }

    const baseUrl = process.env.SITE_URL || 'https://aayushsaini.com'

    return (
        <>
            <ProjectSchema project={project} url={`${baseUrl}/work/${project.id}`} />
            <div className="pt-20">
                <ProjectDetail project={project} />
            </div>
        </>
    )
}
