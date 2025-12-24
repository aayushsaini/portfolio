'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export function DeletePostButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post?')) return

        setLoading(true)
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            })
            if (res.ok) {
                router.refresh()
            }
        } catch (error) {
            console.error('Failed to delete:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    )
}
