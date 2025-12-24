import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteParams {
    params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const project = await prisma.project.findUnique({
            where: { id },
        })
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 })
        }
        return NextResponse.json(project)
    } catch (error) {
        console.error('Failed to fetch project:', error)
        return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        const body = await request.json()
        const project = await prisma.project.update({
            where: { id },
            data: {
                title: body.title,
                category: body.category,
                image: body.image,
                description: body.description,
                technologies: JSON.stringify(body.technologies),
                role: body.role || null,
                timeline: body.timeline || null,
                challenge: body.challenge || null,
                solution: body.solution || null,
                impact: body.impact || null,
                link: body.link || null,
            },
        })
        return NextResponse.json(project)
    } catch (error) {
        console.error('Failed to update project:', error)
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params
        await prisma.project.delete({
            where: { id },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Failed to delete project:', error)
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
    }
}
