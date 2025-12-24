import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { WorkClient } from '@/components/work-client'
import { PROJECTS } from '@/lib/constants'
import { Project } from '@/types'

export const metadata: Metadata = {
    title: 'Work',
    description:
        'A collection of projects focusing on high-performance enterprise applications and advanced AI integration.',
    openGraph: {
        title: 'Work | Aayush Saini',
        description:
            'A collection of projects focusing on high-performance enterprise applications and advanced AI integration.',
    },
}

// Revalidate every 60 seconds (ISR) - fast navigation with fresh-ish data
export const revalidate = 60

async function getProjects(): Promise<Project[]> {
    try {
        const dbProjects = await prisma.project.findMany({
            orderBy: { order: 'asc' },
        })

        if (dbProjects.length === 0) {
            return PROJECTS
        }

        return dbProjects.map((project) => ({
            ...project,
            technologies: JSON.parse(project.technologies),
        }))
    } catch {
        return PROJECTS
    }
}

export default async function WorkPage() {
    const projects = await getProjects()

    return <WorkClient projects={projects} />
}
