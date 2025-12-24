import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { JournalClient } from '@/components/journal-client'
import { BLOG_POSTS } from '@/lib/constants'
import { BlogPost } from '@/types'

export const metadata: Metadata = {
    title: 'Journal',
    description:
        'Thoughts on React optimization, Agentic AI workflows, and Cloud-Native architecture.',
    openGraph: {
        title: 'Engineering Journal | Aayush Saini',
        description:
            'Thoughts on React optimization, Agentic AI workflows, and Cloud-Native architecture.',
    },
}

async function getPosts(): Promise<BlogPost[]> {
    try {
        const dbPosts = await prisma.blogPost.findMany({
            orderBy: { order: 'asc' },
        })

        if (dbPosts.length === 0) {
            return BLOG_POSTS
        }

        return dbPosts.map((post) => ({
            ...post,
            tags: JSON.parse(post.tags),
        }))
    } catch {
        return BLOG_POSTS
    }
}

export default async function JournalPage() {
    const posts = await getPosts()

    return <JournalClient posts={posts} />
}
