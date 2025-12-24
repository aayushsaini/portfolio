'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/types'
import { ArrowLeft, Share2, Clock, Calendar } from 'lucide-react'

interface BlogPostDetailProps {
    post: BlogPost
}

export function BlogPostDetail({ post }: BlogPostDetailProps) {
    return (
        <div className="animate-fade-in-up">
            <Link
                href="/journal"
                className="mb-8 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 w-fit"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Articles
            </Link>

            <article className="max-w-3xl mx-auto">
                <header className="mb-12 text-center">
                    <div className="flex justify-center gap-4 text-sm text-zinc-500 mb-6 font-medium tracking-wide">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" /> {post.readTime}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight tracking-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full border border-zinc-300 dark:border-white/10 bg-zinc-100 dark:bg-white/5 text-xs text-zinc-600 dark:text-zinc-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-zinc-200 dark:border-white/5 relative">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="prose prose-lg max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {post.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-6 text-lg">
                            {paragraph}
                        </p>
                    ))}
                </div>

                <hr className="my-12 border-zinc-200 dark:border-white/10" />

                <div className="flex justify-between items-center">
                    <div className="text-zinc-500 text-sm">Thanks for reading.</div>
                    <button className="p-3 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </article>
        </div>
    )
}
