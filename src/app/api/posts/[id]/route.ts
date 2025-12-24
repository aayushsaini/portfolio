import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
    params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const post = await prisma.blogPost.findUnique({
            where: { id },
        })
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }
        return NextResponse.json(post)
    } catch (error) {
        console.error('Failed to fetch post:', error)
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const body = await request.json()
        const post = await prisma.blogPost.update({
            where: { id },
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
        return NextResponse.json(post)
    } catch (error) {
        console.error('Failed to update post:', error)
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        await prisma.blogPost.delete({
            where: { id },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Failed to delete post:', error)
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
    }
}
