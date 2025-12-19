import React from 'react'
import { motion } from 'framer-motion'
import { ProjectCard } from '../components/project-card'
import { PROJECTS } from '../constants'

export const Work: React.FC = () => {
    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">Selected Work</h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-light">
                    A collection of projects focusing on high-performance enterprise applications and advanced AI integration.
                </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECTS.map((project, i) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
