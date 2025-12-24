import { FileText } from 'lucide-react'

export function ResumeButton() {
    return (
        <a
            href="https://drive.google.com/file/d/1pMxJG9A3y5YPk5R-FFms3BfnaYp3HcI_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 group"
        >
            <div className="bg-zinc-900 dark:bg-white text-white dark:text-black p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:scale-110 flex items-center overflow-hidden">
                <FileText className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm whitespace-nowrap max-w-0 group-hover:max-w-xs transition-all duration-500 overflow-hidden">
                    &nbsp;&nbsp;View Resume
                </span>
            </div>
        </a>
    )
}
