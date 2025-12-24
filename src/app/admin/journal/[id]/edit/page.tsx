import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { PostForm } from '../../post-form'

interface PageProps {
    params: Promise<{ id: string }>
}

async function getPost(id: string) {
    try {
        return await prisma.blogPost.findUnique({
            where: { id },
        })
    } catch {
        return null
    }
}

export default async function EditPostPage({ params }: PageProps) {
    const { id } = await params
    const post = await getPost(id)

    if (!post) {
        notFound()
    }

    const initialData = {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        date: post.date,
        readTime: post.readTime,
        image: post.image,
        tags: JSON.parse(post.tags).join(', '),
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
                Edit Post
            </h1>
            <PostForm initialData={initialData} postId={id} />
        </div>
    )
}
