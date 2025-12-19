import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Cpu } from 'lucide-react'
import { PROJECTS, HERO_TITLE, HERO_SUBTITLE } from '../constants'
import { cn } from '../lib/utils'

export const Home: React.FC = () => {
    const navigate = useNavigate()
    const [heroScrolled, setHeroScrolled] = React.useState(false)

    const { scrollY } = useScroll()
    const heroY = useTransform(scrollY, [0, 600], [0, 150])

    React.useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setHeroScrolled(latest > 300)
        })
        return () => unsubscribe()
    }, [scrollY])

    return (
        <div className="relative w-full">
            <div className="fixed inset-0 w-full h-full overflow-hidden bg-zinc-100 dark:bg-black z-0">
                <div className="absolute top-[-10%] left-[-20%] w-[50vw] h-[50vw] bg-indigo-400/30 dark:bg-indigo-600/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob"></div>
                <div className="absolute top-[10%] right-[-20%] w-[40vw] h-[40vw] bg-purple-400/30 dark:bg-purple-600/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[10%] w-[50vw] h-[50vw] bg-blue-400/30 dark:bg-blue-600/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>

                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none"></div>
            </div>

            <section className="min-h-screen flex flex-col justify-center pt-20 relative z-10 pointer-events-none">
                <motion.div
                    className={cn(
                        "max-w-7xl mx-auto w-full relative pointer-events-auto transition-opacity duration-500 px-6",
                        heroScrolled ? "opacity-0" : "opacity-100"
                    )}
                    style={{ y: heroY }}
                >
                    <div className="overflow-hidden">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-8 leading-[0.9]">
                            {HERO_TITLE.split(' ').map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 100 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="inline-block mr-4 md:mr-8 last:mr-0"
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>
                    </div>

                    <div className="overflow-hidden">
                        <motion.p
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl md:text-3xl text-zinc-600 dark:text-zinc-400 max-w-3xl font-light leading-relaxed mb-12"
                        >
                            {HERO_SUBTITLE}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                        className="flex gap-4"
                    >
                        <button
                            onClick={() => navigate('/work')}
                            className="group relative px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 overflow-hidden"
                        >
                            <span className="relative z-10">View Work</span>
                            <div className="absolute inset-0 bg-zinc-700 dark:bg-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </button>
                        <button
                            onClick={() => navigate('/about')}
                            className="px-8 py-4 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white rounded-full font-medium text-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105"
                        >
                            About Me
                        </button>
                    </motion.div>
                </motion.div>

                {/* ChevronDown - independent animation, no conflicting scroll styles */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        opacity: { duration: 0.5, delay: 1 },
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className={cn(
                        "absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500 transition-opacity duration-500",
                        heroScrolled ? "opacity-0" : "opacity-100"
                    )}
                >
                    <ChevronDown className="w-6 h-6" />
                </motion.div>
            </section>

            <section className="py-32 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex justify-between items-end mb-16"
                    >
                        <h2 className="text-4xl font-bold text-zinc-900 dark:text-white">Latest Work</h2>
                        <button onClick={() => navigate('/work')} className="text-blue-600 dark:text-blue-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">View All</button>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="md:col-span-2 h-full"
                        >
                            <div className="h-full rounded-3xl overflow-hidden relative group cursor-pointer border border-zinc-200 dark:border-white/5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm shadow-2xl" onClick={() => navigate(`/work/${PROJECTS[0].id}`)}>
                                <img src={PROJECTS[0].image} alt={PROJECTS[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 dark:from-black via-zinc-900/40 dark:via-black/40 to-transparent p-8 flex flex-col justify-end">
                                    <h3 className="text-3xl font-bold text-white mb-2">{PROJECTS[0].title}</h3>
                                    <p className="text-zinc-300">{PROJECTS[0].description}</p>
                                </div>
                            </div>
                        </motion.div>
                        <div className="grid grid-rows-2 gap-6 h-full">
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="rounded-3xl overflow-hidden relative group cursor-pointer"
                                onClick={() => navigate('/about')}
                            >
                                <div className="absolute inset-0 bg-zinc-900/40 border border-white/5 p-8 flex flex-col justify-between hover:bg-zinc-800/60 transition-all duration-500 backdrop-blur-sm shadow-xl group-hover:shadow-2xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32 transition-colors duration-500 group-hover:bg-blue-600/20"></div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                            <Cpu className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Expertise</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed max-w-[80%]">
                                            Engineering scalable solutions with a modern, high-performance stack.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 relative z-10">
                                        {['Agentic AI', 'React', 'Azure', 'Python', 'LangChain', 'TypeScript'].map(t => (
                                            <span key={t} className="text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-lg px-3 py-2 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="rounded-3xl overflow-hidden relative group cursor-pointer"
                                onClick={() => navigate('/journal')}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/5 p-6 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform backdrop-blur-sm shadow-xl">
                                    <h3 className="text-2xl font-bold text-white mb-2">Read the Journal</h3>
                                    <p className="text-zinc-400 text-sm">Insights on AI & Engineering</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
