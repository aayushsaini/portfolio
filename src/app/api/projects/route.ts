import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { order: 'asc' },
        })
        return NextResponse.json(projects)
    } catch (error) {
        console.error('Failed to fetch projects:', error)
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const project = await prisma.project.create({
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
        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        console.error('Failed to create project:', error)
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
    }
}
