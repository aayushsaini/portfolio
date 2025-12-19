import React from 'react'
import { motion } from 'framer-motion'

export const Contact: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center text-center"
        >
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-8">Let's Connect.</h2>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-light mb-12">
                Based in Hyderabad, India. Open to discussing engineering challenges, AI innovations, and new opportunities.
            </p>
            <div className="flex gap-4">
                <a href="mailto:aayush.r98@gmail.com" className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors">
                    Email Me
                </a>
                <a href="https://www.linkedin.com/in/aayush-saini" target="_blank" rel="noreferrer" className="bg-black/5 dark:bg-white/10 backdrop-blur-md border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-black/10 dark:hover:bg-white/20 transition-colors">
                    LinkedIn
                </a>
            </div>
        </motion.div>
    )
}
