import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { HomeClient } from '@/components/home-client'
import { WebsiteSchema, PersonSchema } from '@/components/structured-data'
import { HERO_TITLE, HERO_SUBTITLE, PROJECTS } from '@/lib/constants'
import { Project } from '@/types'

export const metadata: Metadata = {
    title: 'Aayush Saini | Software Engineer',
    description:
        'Software Engineer at BCG specializing in Agentic AI, High-Performance React Architectures, and Cloud-Native Solutions.',
}

async function getHomeData() {
    try {
        const pageContent = await prisma.pageContent.findUnique({
            where: { pageSlug: 'home' },
        })

        const projects = await prisma.project.findMany({
            orderBy: { order: 'asc' },
            take: 1,
        })

        let heroData = { heroTitle: HERO_TITLE, heroSubtitle: HERO_SUBTITLE }
        if (pageContent) {
            const content = JSON.parse(pageContent.content)
            heroData = {
                heroTitle: content.heroTitle || HERO_TITLE,
                heroSubtitle: content.heroSubtitle || HERO_SUBTITLE,
            }
        }

        let featuredProject: Project = PROJECTS[0]
        if (projects.length > 0) {
            const project = projects[0]
            featuredProject = {
                ...project,
                technologies: JSON.parse(project.technologies),
            }
        }

        return { ...heroData, featuredProject }
    } catch {
        return {
            heroTitle: HERO_TITLE,
            heroSubtitle: HERO_SUBTITLE,
            featuredProject: PROJECTS[0],
        }
    }
}

export default async function HomePage() {
    const { heroTitle, heroSubtitle, featuredProject } = await getHomeData()
    const baseUrl = process.env.SITE_URL || 'https://aayushsaini.com'

    return (
        <>
            <WebsiteSchema url={baseUrl} />
            <PersonSchema url={baseUrl} />
            <HomeClient
                heroTitle={heroTitle}
                heroSubtitle={heroSubtitle}
                featuredProject={featuredProject}
            />
        </>
    )
}
