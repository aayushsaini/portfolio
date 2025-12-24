'use client'

import { motion } from 'framer-motion'

function ProjectCardSkeleton() {
    return (
        <div className="group relative bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10">
            {/* Image skeleton */}
            <div className="relative h-64 overflow-hidden bg-zinc-200 dark:bg-zinc-800 animate-pulse" />

            {/* Content skeleton */}
            <div className="p-8">
                {/* Category */}
                <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-4" />
                {/* Title */}
                <div className="h-7 w-48 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-4" />
                {/* Description */}
                <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                </div>
                {/* Technologies */}
                <div className="flex gap-2">
                    <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
                    <div className="h-6 w-20 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
                    <div className="h-6 w-14 bg-zinc-200 dark:bg-zinc-700 rounded-full animate-pulse" />
                </div>
            </div>
        </div>
    )
}

export default function WorkLoading() {
    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                    Selected Work
                </h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-light">
                    A collection of projects focusing on high-performance enterprise
                    applications and advanced AI integration.
                </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <ProjectCardSkeleton />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
