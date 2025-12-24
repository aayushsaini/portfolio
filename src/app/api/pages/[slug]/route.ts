import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
    params: Promise<{ slug: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { slug } = await params
        const page = await prisma.pageContent.findUnique({
            where: { pageSlug: slug },
        })
        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 })
        }
        return NextResponse.json(page)
    } catch (error) {
        console.error('Failed to fetch page:', error)
        return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { slug } = await params
        const body = await request.json()
        const page = await prisma.pageContent.upsert({
            where: { pageSlug: slug },
            update: {
                content: JSON.stringify(body.content),
            },
            create: {
                pageSlug: slug,
                content: JSON.stringify(body.content),
            },
        })
        return NextResponse.json(page)
    } catch (error) {
        console.error('Failed to update page:', error)
        return NextResponse.json({ error: 'Failed to update page' }, { status: 500 })
    }
}
