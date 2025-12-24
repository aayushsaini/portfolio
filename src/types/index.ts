export interface Project {
    id: string
    title: string
    category: string
    image: string
    description: string
    technologies: string[]
    role?: string | null
    timeline?: string | null
    challenge?: string | null
    solution?: string | null
    impact?: string | null
    link?: string | null
    order?: number
}

export interface BlogPost {
    id: string
    title: string
    excerpt: string
    content: string
    date: string
    readTime: string
    image: string
    tags: string[]
    order?: number
}

export interface PageContent {
    id: string
    pageSlug: string
    content: Record<string, unknown>
}

export interface ChatMessage {
    id: string
    role: 'user' | 'model'
    text: string
    isError?: boolean
}

export enum Section {
    HOME = 'home',
    PROJECTS = 'projects',
    BLOG = 'blog',
    ABOUT = 'about',
    CONTACT = 'contact',
}
