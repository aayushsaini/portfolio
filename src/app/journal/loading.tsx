'use client'

import { motion } from 'framer-motion'

function BlogPostSkeleton() {
    return (
        <div className="group relative flex gap-8 p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/5">
            {/* Image skeleton */}
            <div className="hidden md:block w-48 h-32 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse flex-shrink-0" />

            <div className="flex-1">
                {/* Date & Read time */}
                <div className="flex gap-4 mb-3">
                    <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                </div>
                {/* Title */}
                <div className="h-6 w-64 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-3" />
                {/* Excerpt */}
                <div className="space-y-2 mb-4">
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                </div>
                {/* Tags */}
                <div className="flex gap-2">
                    <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
                    <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
                </div>
            </div>
        </div>
    )
}

export default function JournalLoading() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                    Engineering Journal
                </h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-light">
                    Thoughts on React optimization, Agentic AI workflows, and Cloud-Native
                    architecture.
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
            >
                {[1, 2, 3].map((i) => (
                    <BlogPostSkeleton key={i} />
                ))}
            </motion.div>
        </div>
    )
}
