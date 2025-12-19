import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Project } from '../types'
import { ArrowUpRight } from 'lucide-react'

interface ProjectCardProps {
  project: Project
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/work/${project.id}`)}
      className="group relative w-full h-[450px] rounded-[2rem] overflow-hidden bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-white/5 transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 dark:opacity-60 group-hover:opacity-50 dark:group-hover:opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-100/80 dark:from-black via-zinc-100/20 dark:via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="flex justify-between items-start mb-2">
            <span className="text-blue-600 dark:text-blue-400 font-medium text-sm tracking-wide uppercase">{project.category}</span>
            <div className="bg-zinc-900/20 dark:bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="w-5 h-5 text-zinc-900 dark:text-white" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">{project.title}</h3>
          <p className="text-zinc-700 dark:text-zinc-300 line-clamp-2 mb-4 text-lg font-light leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span key={tech} className="px-3 py-1 bg-zinc-900/10 dark:bg-white/10 border border-zinc-400 dark:border-white/10 rounded-full text-xs text-zinc-700 dark:text-zinc-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
