'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
    { path: '/', label: 'Home' },
    { path: '/work', label: 'Work' },
    { path: '/journal', label: 'Journal' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
]

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [scrolled, setScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

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
        if (path === '/') return pathname === '/'
        return pathname.startsWith(path)
    }

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-40 py-4 transition-all duration-300 backdrop-blur-xl',
                    scrolled
                        ? 'bg-white/80 dark:bg-black/80 border-b border-zinc-200/50 dark:border-white/10'
                        : 'bg-transparent border-b border-transparent'
                )}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4 z-50">
                        <Link
                            href="/"
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
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={cn(
                                    'text-xs font-medium tracking-widest uppercase transition-all duration-300 relative group',
                                    isActive(item.path)
                                        ? 'text-zinc-900 dark:text-white'
                                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                                )}
                            >
                                {item.label}
                                <span
                                    className={cn(
                                        'absolute -bottom-1 left-0 h-[1px] bg-blue-500 transition-all duration-300',
                                        isActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'
                                    )}
                                ></span>
                            </Link>
                        ))}
                        {/* Theme Toggle */}
                        {mounted && (
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
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 p-2 text-zinc-900 dark:text-white"
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
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
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
        </>
    )
}
