import { Project, BlogPost } from '@/types'

interface WebsiteSchemaProps {
    url: string
}

export function WebsiteSchema({ url }: WebsiteSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Aayush Saini',
        url: url,
        description:
            'Software Engineer at BCG specializing in Agentic AI, High-Performance React Architectures, and Cloud-Native Solutions.',
        author: {
            '@type': 'Person',
            name: 'Aayush Saini',
            jobTitle: 'Software Engineer',
            worksFor: {
                '@type': 'Organization',
                name: 'Boston Consulting Group',
            },
        },
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface PersonSchemaProps {
    url: string
}

export function PersonSchema({ url }: PersonSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Aayush Saini',
        url: url,
        jobTitle: 'Software Engineer',
        worksFor: {
            '@type': 'Organization',
            name: 'Boston Consulting Group',
        },
        sameAs: [
            'https://github.com/aayush-saini',
            'https://www.linkedin.com/in/aayush-saini',
        ],
        knowsAbout: [
            'React',
            'TypeScript',
            'Next.js',
            'Agentic AI',
            'LangChain',
            'Azure',
            'Python',
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface ArticleSchemaProps {
    post: BlogPost
    url: string
}

export function ArticleSchema({ post, url }: ArticleSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        author: {
            '@type': 'Person',
            name: 'Aayush Saini',
        },
        publisher: {
            '@type': 'Person',
            name: 'Aayush Saini',
        },
        datePublished: post.date,
        url: url,
        keywords: post.tags.join(', '),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}

interface ProjectSchemaProps {
    project: Project
    url: string
}

export function ProjectSchema({ project, url }: ProjectSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        image: project.image,
        author: {
            '@type': 'Person',
            name: 'Aayush Saini',
        },
        url: url,
        keywords: project.technologies.join(', '),
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
