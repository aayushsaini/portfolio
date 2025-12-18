import React, { useState, useEffect } from 'react'
import { Menu, X, Github, Linkedin, Mail, ChevronDown, Code, Cpu, Award, BookOpen } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ProjectCard } from './components/project-card'
import { BlogList } from './components/blog-list'
import { BlogPostDetail } from './components/blog-post-detail'
import { ProjectDetail } from './components/project-detail'
import { AIChat } from './components/ai-chat'
import { PROJECTS, BLOG_POSTS, HERO_TITLE, HERO_SUBTITLE } from './constants'
import { Section, BlogPost, Project } from './types'
import { cn } from './lib/utils'

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<Section>(Section.HOME)
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [heroScrolled, setHeroScrolled] = useState(false)

    // Optimized scroll hooks from framer-motion (no re-renders)
    const { scrollY } = useScroll()
    const heroY = useTransform(scrollY, [0, 600], [0, 150])
    const navBackground = useTransform(
        scrollY,
        [0, 50],
        ['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']
    )
    const navBorder = useTransform(
        scrollY,
        [0, 50],
        ['rgba(255,255,255,0)', 'rgba(255,255,255,0.1)']
    )
    const navBackdrop = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(12px)'])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        // Subscribe to scroll position for hero fade (CSS transition, not framer transform)
        const unsubscribe = scrollY.on('change', (latest) => {
            setHeroScrolled(latest > 300)
        })

        return () => {
            clearInterval(timer)
            unsubscribe()
        }
    }, [scrollY])

    const navigateTo = (section: Section) => {
        setActiveSection(section)
        setSelectedPost(null)
        setSelectedProject(null)
        setIsMenuOpen(false)
        // Delay scroll to ensure React re-render completes first
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 10)
    }

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata',
        })
    }

    const renderContent = () => {
        if (selectedPost) {
            return (
                <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                    <BlogPostDetail
                        post={selectedPost}
                        onBack={() => setSelectedPost(null)}
                    />
                </div>
            )
        }

        if (selectedProject) {
            return (
                <div className="pt-24 pb-0">
                    <ProjectDetail
                        project={selectedProject}
                        onBack={() => setSelectedProject(null)}
                    />
                </div>
            )
        }

        switch (activeSection) {
            case Section.PROJECTS:
                return (
                    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Selected Work</h2>
                            <p className="text-xl text-zinc-400 max-w-2xl font-light">
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
                                    <ProjectCard project={project} onClick={setSelectedProject} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )
            case Section.BLOG:
                return (
                    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Engineering Journal</h2>
                            <p className="text-xl text-zinc-400 max-w-2xl font-light">
                                Thoughts on React optimization, Agentic AI workflows, and Cloud-Native architecture.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <BlogList posts={BLOG_POSTS} onSelectPost={setSelectedPost} />
                        </motion.div>
                    </div>
                )
            case Section.ABOUT:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">About Me.</h2>
                        <div className="prose prose-invert prose-lg text-zinc-300">
                            <p className="text-xl leading-relaxed mb-8">
                                I am Aayush Saini, a Software Engineer at <strong>Boston Consulting Group (BCG)</strong> and a 2x Azure Certified professional.
                                I specialize in building well-engineered consumer products that solve real-world problems.
                            </p>
                            <p className="text-lg leading-relaxed mb-12">
                                With a Masters from Thapar Institute of Engineering & Technology, I have contributed to developing new features and optimizing cloud-based applications using
                                JavaScript, React, Redux, and Azure Cloud. I am currently part of the feature development team for advanced Agentic applications and audit platforms serving multiple clients.
                            </p>

                            <h3 className="text-2xl font-bold text-white mb-6">Experience & Skills</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                {[
                                    { icon: Code, title: 'Technical Stack', desc: 'React, Redux, JavaScript, Python, LangChain, LangGraph, Django REST, HTML/SCSS.', color: 'text-blue-400' },
                                    { icon: Award, title: 'Certifications', list: ['Microsoft Certified: Azure AI Engineer Associate (AI-102)', 'Microsoft Certified: Azure Fundamentals (AZ-900)', 'AWS Fundamentals: Building Serverless Applications'], color: 'text-purple-400' },
                                    { icon: Cpu, title: 'Domain Expertise', desc: 'Agentic AI, Cloud-Native App Dev, Real-time Collaboration (WebSockets), Performance Optimization.', color: 'text-emerald-400' },
                                    { icon: BookOpen, title: 'Education', content: <><p className="font-medium text-white">Thapar Institute of Engineering & Technology</p><p className="mb-2">Master of Computer Applications (2020 - 2022)</p><p className="font-medium text-white">DIT University</p><p>Bachelor of Computer Applications (2017 - 2020)</p></>, color: 'text-orange-400' }
                                ].map((item, i) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl"
                                    >
                                        <item.icon className={cn("w-8 h-8 mb-4", item.color)} />
                                        <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                                        {item.list ? (
                                            <ul className="text-sm text-zinc-400 space-y-1">
                                                {item.list.map(l => <li key={l}>• {l}</li>)}
                                            </ul>
                                        ) : item.content ? (
                                            <div className="text-sm text-zinc-400">{item.content}</div>
                                        ) : (
                                            <p className="text-sm text-zinc-400">{item.desc}</p>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )
            case Section.CONTACT:
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center items-center text-center"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold text-gradient mb-8">Let's Connect.</h2>
                        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-light mb-12">
                            Based in Hyderabad, India. Open to discussing engineering challenges, AI innovations, and new opportunities.
                        </p>
                        <div className="flex gap-4">
                            <a href="mailto:aayush.r98@gmail.com" className="bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-zinc-200 transition-colors">
                                Email Me
                            </a>
                            <a href="https://www.linkedin.com/in/aayush-saini" target="_blank" rel="noreferrer" className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/20 transition-colors">
                                LinkedIn
                            </a>
                        </div>
                    </motion.div>
                )
            case Section.HOME:
            default:
                return (
                    <div className="relative w-full">
                        <div className="fixed inset-0 w-full h-full overflow-hidden bg-black z-0">
                            <div className="absolute top-[-10%] left-[-20%] w-[50vw] h-[50vw] bg-indigo-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
                            <div className="absolute top-[10%] right-[-20%] w-[40vw] h-[40vw] bg-purple-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
                            <div className="absolute bottom-[-20%] left-[10%] w-[50vw] h-[50vw] bg-blue-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>

                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none"></div>
                        </div>

                        <section className="min-h-screen flex flex-col justify-center px-6 pt-20 relative z-10 pointer-events-none">
                            <motion.div
                                className={cn(
                                    "max-w-7xl mx-auto w-full relative pointer-events-auto transition-opacity duration-500",
                                    heroScrolled ? "opacity-0" : "opacity-100"
                                )}
                                style={{ y: heroY }}
                            >
                                <div className="overflow-hidden">
                                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-8 leading-[0.9]">
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
                                        className="text-xl md:text-3xl text-zinc-400 max-w-3xl font-light leading-relaxed mb-12"
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
                                        onClick={() => navigateTo(Section.PROJECTS)}
                                        className="group relative px-8 py-4 bg-white text-black rounded-full font-medium text-lg hover:scale-105 transition-all duration-300 overflow-hidden"
                                    >
                                        <span className="relative z-10">View Work</span>
                                        <div className="absolute inset-0 bg-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    </button>
                                    <button
                                        onClick={() => navigateTo(Section.ABOUT)}
                                        className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105"
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
                                    <h2 className="text-4xl font-bold text-white">Latest Work</h2>
                                    <button onClick={() => navigateTo(Section.PROJECTS)} className="text-blue-500 hover:text-blue-400 transition-colors">View All</button>
                                </motion.div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, delay: 0.1 }}
                                        className="md:col-span-2 h-full"
                                    >
                                        <div className="h-full rounded-3xl overflow-hidden relative group cursor-pointer border border-white/5 bg-zinc-900/40 backdrop-blur-sm shadow-2xl" onClick={() => setSelectedProject(PROJECTS[0])}>
                                            <img src={PROJECTS[0].image} alt={PROJECTS[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-60" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end">
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
                                            onClick={() => navigateTo(Section.ABOUT)}
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
                                            onClick={() => navigateTo(Section.BLOG)}
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
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            {/* Premium Apple-style Nav */}
            <motion.nav
                style={{
                    backgroundColor: navBackground,
                    borderBottomWidth: '1px',
                    borderColor: navBorder,
                    backdropFilter: navBackdrop,
                    WebkitBackdropFilter: navBackdrop,
                }}
                className="fixed top-0 left-0 right-0 z-40 transition-none py-4"
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4 z-50">
                        <button
                            onClick={() => navigateTo(Section.HOME)}
                            className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-1"
                        >
                            Aayush Saini
                        </button>

                        {/* Integrated Pulse Dot & Clock */}
                        <div className="hidden sm:flex items-center gap-3 pl-4 border-white/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                            <span className="text-[10px] text-zinc-400 font-medium tracking-[0.2em] uppercase">
                                {formatTime(currentTime)} IST
                            </span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { id: Section.HOME, label: 'Home' },
                            { id: Section.PROJECTS, label: 'Work' },
                            { id: Section.BLOG, label: 'Journal' },
                            { id: Section.ABOUT, label: 'About' },
                            { id: Section.CONTACT, label: 'Contact' }
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => navigateTo(item.id)}
                                className={cn(
                                    "text-xs font-medium tracking-widest uppercase transition-all duration-300 relative group",
                                    activeSection === item.id ? 'text-white' : 'text-zinc-500 hover:text-white'
                                )}
                            >
                                {item.label}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 h-[1px] bg-blue-500 transition-all duration-300",
                                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                                )}></span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 p-2 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-30 bg-black flex items-center justify-center"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {[
                                { id: Section.HOME, label: 'Home' },
                                { id: Section.PROJECTS, label: 'Work' },
                                { id: Section.BLOG, label: 'Journal' },
                                { id: Section.ABOUT, label: 'About' },
                                { id: Section.CONTACT, label: 'Contact' }
                            ].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => navigateTo(item.id)}
                                    className="text-4xl font-bold text-zinc-300 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="min-h-screen">
                {renderContent()}
            </main>

            {/* Footer */}
            <footer className="py-20 border-t border-white/10 bg-zinc-950">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex flex-col gap-4">
                        <div className="text-2xl font-bold tracking-tighter">Aayush Saini.</div>
                        <div className="text-zinc-500 text-sm max-w-sm">
                            Engineering intelligent enterprise solutions and cinematic user experiences.
                        </div>
                    </div>
                    <div className="flex flex-col md:items-end gap-6">
                        <div className="flex gap-8">
                            <a href="https://github.com/aayush-saini" className="text-zinc-400 hover:text-white transition-all hover:scale-110"><Github className="w-5 h-5" /></a>
                            <a href="https://www.linkedin.com/in/aayush-saini" className="text-zinc-400 hover:text-white transition-all hover:scale-110"><Linkedin className="w-5 h-5" /></a>
                            <a href="mailto:aayush.r98@gmail.com" className="text-zinc-400 hover:text-white transition-all hover:scale-110"><Mail className="w-5 h-5" /></a>
                        </div>
                        <div className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase">
                            © {new Date().getFullYear()} DESIGNED IN THE FUTURE.
                        </div>
                    </div>
                </div>
            </footer>

            {/* AI Assistant */}
            <AIChat />
        </div>
    )
}

export default App
