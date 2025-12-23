import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.SITE_URL || 'https://aayushsaini.com'

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/work`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/journal`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]

    // Dynamic project pages
    const projects = await prisma.project.findMany({
        select: { id: true, updatedAt: true },
    })

    const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
        url: `${baseUrl}/work/${project.id}`,
        lastModified: project.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    // Dynamic blog post pages
    const posts = await prisma.blogPost.findMany({
        select: { id: true, updatedAt: true },
    })

    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/journal/${post.id}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    return [...staticPages, ...projectPages, ...postPages]
}
