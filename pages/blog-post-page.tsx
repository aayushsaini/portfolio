import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BlogPostDetail } from '../components/blog-post-detail'
import { BLOG_POSTS } from '../constants'

export const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const post = BLOG_POSTS.find(p => p.id === id)

    if (!post) {
        return (
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Post Not Found</h2>
                    <button onClick={() => navigate('/journal')} className="text-blue-500 hover:text-blue-400">
                        ← Back to Journal
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
            <BlogPostDetail post={post} onBack={() => navigate('/journal')} />
        </div>
    )
}
