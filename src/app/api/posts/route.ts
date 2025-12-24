import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(posts)
    } catch (error) {
        console.error('Failed to fetch posts:', error)
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const post = await prisma.blogPost.create({
            data: {
                title: body.title,
                excerpt: body.excerpt,
                content: body.content,
                date: body.date,
                readTime: body.readTime,
                image: body.image,
                tags: JSON.stringify(body.tags),
            },
        })
        return NextResponse.json(post, { status: 201 })
    } catch (error) {
        console.error('Failed to create post:', error)
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }
}
