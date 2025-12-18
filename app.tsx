import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Home } from './pages/home'
import { Work } from './pages/work'
import { Journal } from './pages/journal'
import { About } from './pages/about'
import { Contact } from './pages/contact'
import { ProjectDetailPage } from './pages/project-detail-page'
import { BlogPostPage } from './pages/blog-post-page'
import { AIChat } from './components/ai-chat'
import { ScrollToTop } from './components/scroll-to-top'
import { cn } from './lib/utils'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const location = useLocation()

    const { scrollY } = useScroll()
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
        return () => clearInterval(timer)
    }, [])

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata',
        })
    }

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/'
        return location.pathname.startsWith(path)
    }

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/work', label: 'Work' },
        { path: '/journal', label: 'Journal' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' }
    ]

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
                        <Link
                            to="/"
                            className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-1"
                        >
                            Aayush Saini
                        </Link>

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
                        {navItems.map(item => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "text-xs font-medium tracking-widest uppercase transition-all duration-300 relative group",
                                    isActive(item.path) ? 'text-white' : 'text-zinc-500 hover:text-white'
                                )}
                            >
                                {item.label}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 h-[1px] bg-blue-500 transition-all duration-300",
                                    isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                                )}></span>
                            </Link>
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
                            {navItems.map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-4xl font-bold text-zinc-300 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="min-h-screen">
                {children}
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

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/work/:id" element={<ProjectDetailPage />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/journal/:id" element={<BlogPostPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

export default App
