import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BlogPost } from '../types'
import { Calendar, Clock, ChevronRight } from 'lucide-react'

interface BlogListProps {
  posts: BlogPost[]
}

export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article
          key={post.id}
          onClick={() => navigate(`/journal/${post.id}`)}
          className="group cursor-pointer flex flex-col gap-4"
        >
          <div className="overflow-hidden rounded-2xl aspect-[16/10] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/5 relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center text-blue-600 dark:text-blue-500 text-sm font-medium pt-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Read Article <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}