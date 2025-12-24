import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { BlogPostDetail } from '@/components/blog-post-detail'
import { ArticleSchema } from '@/components/structured-data'
import { BLOG_POSTS } from '@/lib/constants'
import { BlogPost } from '@/types'

interface PageProps {
    params: Promise<{ id: string }>
}

async function getPost(id: string): Promise<BlogPost | null> {
    try {
        const dbPost = await prisma.blogPost.findUnique({
            where: { id },
        })

        if (dbPost) {
            return {
                ...dbPost,
                tags: JSON.parse(dbPost.tags),
            }
        }

        // Fallback to constants
        return BLOG_POSTS.find((p) => p.id === id) || null
    } catch {
        return BLOG_POSTS.find((p) => p.id === id) || null
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params
    const post = await getPost(id)

    if (!post) {
        return {
            title: 'Post Not Found',
        }
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            type: 'article',
            title: `${post.title} | Aayush Saini`,
            description: post.excerpt,
            images: [post.image],
            publishedTime: post.date,
        },
    }
}

export async function generateStaticParams() {
    try {
        const posts = await prisma.blogPost.findMany({
            select: { id: true },
        })

        if (posts.length === 0) {
            return BLOG_POSTS.map((p) => ({ id: p.id }))
        }

        return posts.map((p) => ({ id: p.id }))
    } catch {
        return BLOG_POSTS.map((p) => ({ id: p.id }))
    }
}

export default async function BlogPostPage({ params }: PageProps) {
    const { id } = await params
    const post = await getPost(id)

    if (!post) {
        notFound()
    }

    const baseUrl = process.env.SITE_URL || 'https://aayushsaini.com'

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <ArticleSchema post={post} url={`${baseUrl}/journal/${post.id}`} />
            <BlogPostDetail post={post} />
        </div>
    )
}
