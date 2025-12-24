'use client'

import { useEffect, useRef, useId, useState } from 'react'
import mermaid from 'mermaid'

// Initialize mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'inherit',
})

interface MermaidPreviewProps {
    code: string
}

export function MermaidPreview({ code }: MermaidPreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const id = useId().replace(/:/g, '')
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const renderDiagram = async () => {
            if (!containerRef.current || !code) return

            try {
                setError(null)
                containerRef.current.innerHTML = ''

                const { svg } = await mermaid.render(`mermaid-preview-${id}`, code)
                if (containerRef.current) {
                    containerRef.current.innerHTML = svg
                }
            } catch (err) {
                console.error('Mermaid preview error:', err)
                setError('Invalid mermaid syntax')
            }
        }

        renderDiagram()
    }, [code, id])

    if (error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                {error}
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className="flex justify-center overflow-x-auto bg-zinc-800 rounded-lg p-4"
        />
    )
}

interface EditorCodePreviewProps {
    className?: string
    children?: React.ReactNode
}

export function EditorCodePreview({ className, children, ...props }: EditorCodePreviewProps) {
    const code = String(children).replace(/\n$/, '')
    const isMermaid = className && /language-mermaid/i.test(className)

    if (isMermaid) {
        return <MermaidPreview code={code} />
    }

    return (
        <code className={className} {...props}>
            {children}
        </code>
    )
}
