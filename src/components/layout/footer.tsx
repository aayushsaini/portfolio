import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
    return (
        <footer className="py-20 border-t border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-950 relative z-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="flex flex-col gap-4">
                    <div className="text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white">
                        Aayush Saini.
                    </div>
                    <div className="text-zinc-500 text-sm max-w-sm">
                        Engineering solutions and remarkable user experiences.
                    </div>
                </div>
                <div className="flex flex-col md:items-end gap-6">
                    <div className="flex gap-8">
                        <a
                            href="https://github.com/aayush-saini"
                            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:scale-110"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/aayush-saini"
                            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:scale-110"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="mailto:aayush.r98@gmail.com"
                            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all hover:scale-110"
                        >
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                    <div className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase">
                        © {new Date().getFullYear()} DESIGNED IN THE FUTURE.
                    </div>
                </div>
            </div>
        </footer>
    )
}
