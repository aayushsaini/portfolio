'use client'

import { useEffect, useRef, useId } from 'react'
import dynamic from 'next/dynamic'
import mermaid from 'mermaid'

// Dynamically import markdown preview to avoid SSR issues
const MarkdownPreview = dynamic(
    () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
    { ssr: false }
)

// Initialize mermaid with theme settings
mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'inherit',
})

interface MermaidBlockProps {
    code: string
}

function MermaidBlock({ code }: MermaidBlockProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const id = useId().replace(/:/g, '')

    useEffect(() => {
        const renderDiagram = async () => {
            if (!containerRef.current || !code) return

            try {
                // Clear previous content
                containerRef.current.innerHTML = ''

                const { svg } = await mermaid.render(`mermaid-${id}`, code)
                if (containerRef.current) {
                    containerRef.current.innerHTML = svg
                }
            } catch (error) {
                console.error('Mermaid rendering error:', error)
                if (containerRef.current) {
                    containerRef.current.innerHTML = `<pre class="text-red-500">Failed to render diagram</pre>`
                }
            }
        }

        renderDiagram()
    }, [code, id])

    return (
        <div
            ref={containerRef}
            className="my-6 flex justify-center overflow-x-auto bg-white dark:bg-zinc-800 rounded-lg p-4"
        />
    )
}

interface CodeBlockProps {
    className?: string
    children?: React.ReactNode
}

function CodeBlock({ className, children, ...props }: CodeBlockProps) {
    const code = String(children).replace(/\n$/, '')
    const isMermaid = className && /language-mermaid/i.test(className)

    if (isMermaid) {
        return <MermaidBlock code={code} />
    }

    return (
        <code className={className} {...props}>
            {children}
        </code>
    )
}

interface MarkdownRendererProps {
    content: string
    className?: string
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
    return (
        <div data-color-mode="dark" className={className}>
            <MarkdownPreview
                source={content}
                style={{
                    backgroundColor: 'transparent',
                    color: 'inherit',
                }}
                components={{
                    code: CodeBlock as React.ComponentType<React.HTMLAttributes<HTMLElement>>,
                }}
            />
        </div>
    )
}
