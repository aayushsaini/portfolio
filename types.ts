export interface Project {
  id: string
  title: string
  category: string
  image: string
  description: string
  technologies: string[]
  role?: string
  timeline?: string
  challenge?: string
  solution?: string
  impact?: string
  link?: string
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
