import React from 'react'
import { motion } from 'framer-motion'
import { BlogList } from '../components/blog-list'
import { BLOG_POSTS } from '../constants'

export const Journal: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">Engineering Journal</h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-light">
                    Thoughts on React optimization, Agentic AI workflows, and Cloud-Native architecture.
                </p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <BlogList posts={BLOG_POSTS} />
            </motion.div>
        </div>
    )
}
