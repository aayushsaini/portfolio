import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Menu, X, Github, Linkedin, Mail, FileText, Sun, Moon } from 'lucide-react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Home } from './pages/home'
import { Work } from './pages/work'
import { Journal } from './pages/journal'
import { About } from './pages/about'
import { Contact } from './pages/contact'
import { ProjectDetailPage } from './pages/project-detail-page'
import { BlogPostPage } from './pages/blog-post-page'
import { ScrollToTop } from './components/scroll-to-top'
import { ThemeProvider, useTheme } from './lib/theme-context'
import { cn } from './lib/utils'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()
    const { theme, toggleTheme } = useTheme()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

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
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white selection:bg-blue-500/30 transition-colors duration-300">
            {/* Premium Apple-style Nav */}
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 py-4 transition-all duration-300 backdrop-blur-xl",
                    scrolled
                        ? "bg-white/80 dark:bg-black/80 border-b border-zinc-200/50 dark:border-white/10"
                        : "bg-white/10 dark:bg-black/10 border-b border-transparent"
                )}
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
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                            <span className="text-[12px] text-zinc-400 font-medium tracking-[0.2em] uppercase">
                                {formatTime(currentTime)} IST
                            </span>
                            {/* <span className="ml-2 text-[0.8em] relative group cursor-default">
                                {(() => {
                                    const hours = currentTime.getHours()
                                    const day = currentTime.getDay()

                                    if (day === 0) return '🏖️'
                                    if (day === 6) return '🍻'

                                    if (hours >= 6 && hours < 7) return '🌅'
                                    if (hours >= 7 && hours < 10) return '🥣'
                                    if (hours >= 10 && hours < 13) return '🧑‍💻'
                                    if (hours >= 13 && hours < 15) return '🍕'
                                    if (hours >= 15 && hours < 16) return '📅'
                                    if (hours >= 16 && hours < 18) return '🧑‍💻'
                                    if (hours >= 18 && hours < 19) return '🚌'
                                    if (hours >= 19 && hours < 20) return '🍔'
                                    if (hours >= 20 && hours < 22) return '📺'
                                    if (hours >= 22 || hours < 6) return '😴'

                                    return ''
                                })()}
                                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    {(() => {
                                        const hours = currentTime.getHours()
                                        const day = currentTime.getDay()

                                        if (day === 0) return 'Sundaying, chill day!!'
                                        if (day === 6) return 'Saturday, party time!!'

                                        if (hours >= 6 && hours < 7) return 'Sunrise, good morning!!'
                                        if (hours >= 7 && hours < 10) return 'Breakfast'
                                        if (hours >= 10 && hours < 13) return 'Coding hours'
                                        if (hours >= 13 && hours < 15) return 'Lunch'
                                        if (hours >= 15 && hours < 16) return 'Attending Meetings'
                                        if (hours >= 16 && hours < 18) return 'Work hours'
                                        if (hours >= 18 && hours < 19) return 'Commuting'
                                        if (hours >= 19 && hours < 20) return 'Having dinner'
                                        if (hours >= 20 && hours < 22) return 'Likely watching a movie or YouTube'
                                        if (hours >= 22 || hours < 6) return 'Probably sleeping...'

                                        return ''
                                    })()}
                                </span>
                            </span> */}
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
                                    isActive(item.path)
                                        ? 'text-zinc-900 dark:text-white'
                                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                                )}
                            >
                                {item.label}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 h-[1px] bg-blue-500 transition-all duration-300",
                                    isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                                )}></span>
                            </Link>
                        ))}
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-4 h-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white" />
                            ) : (
                                <Moon className="w-4 h-4 text-zinc-600 hover:text-zinc-900" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 p-2 text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-30 bg-white dark:bg-black flex items-center justify-center"
                    >
                        <div className="flex flex-col gap-8 text-center">
                            {navItems.map(item => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-4xl font-bold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
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
            <footer className="py-20 border-t border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-950 relative z-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex flex-col gap-4">
                        <div className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white">Aayush Saini.</div>
                        <div className="text-zinc-500 text-sm max-w-sm">
                            Engineering solutions and remarkable user experiences.
                        </div>
                    </div>
                    <div className="flex flex-col md:items-end gap-6">
                        <div className="flex gap-8">
                            <a href="https://github.com/aayush-saini" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:scale-110"><Github className="w-5 h-5" /></a>
                            <a href="https://www.linkedin.com/in/aayush-saini" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:scale-110"><Linkedin className="w-5 h-5" /></a>
                            <a href="mailto:aayush.r98@gmail.com" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:scale-110"><Mail className="w-5 h-5" /></a>
                        </div>
                        <div className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase">
                            © {new Date().getFullYear()} DESIGNED IN THE FUTURE.
                        </div>
                    </div>
                </div>
            </footer>

            {/* Resume Download Button */}
            <a
                href="https://drive.google.com/file/d/1pMxJG9A3y5YPk5R-FFms3BfnaYp3HcI_/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 z-50 group"
            >
                <div className="bg-zinc-900 dark:bg-white text-white dark:text-black p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-110 flex items-center overflow-hidden">
                    <FileText className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm whitespace-nowrap max-w-0 group-hover:max-w-xs transition-all duration-500 overflow-hidden">&nbsp;&nbsp;View Resume</span>
                </div>
            </a>
        </div>
    )
}

const App: React.FC = () => {
    return (
        <ThemeProvider>
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
        </ThemeProvider>
    )
}

export default App
