import React, { useEffect } from 'react'
import { Project } from '../types'
import { ArrowLeft, ExternalLink, Calendar, User, Code2, Award, Zap } from 'lucide-react'

interface ProjectDetailProps {
  project: Project
  onBack: () => void
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-black animate-fade-in-up">
      {/* Navigation */}
      <div className="sticky top-24 z-30 px-6 max-w-7xl mx-auto mb-8 pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors bg-zinc-100/80 dark:bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-300 dark:border-white/10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Work
        </button>
      </div>

      {/* Hero Header */}
      <div className="px-6 max-w-7xl mx-auto mb-16">
        <div className="flex flex-col gap-6">
          <span className="text-blue-600 dark:text-blue-500 font-medium tracking-wider uppercase text-sm">{project.category}</span>
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight leading-[1.1]">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full h-[50vh] md:h-[70vh] relative mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent opacity-90"></div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="px-6 max-w-7xl mx-auto pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

          {/* Sidebar (Metadata) */}
          <div className="lg:col-span-4 space-y-10">
            <div className="p-6 rounded-3xl bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 backdrop-blur-sm">
              <h3 className="text-zinc-900 dark:text-white font-semibold mb-6 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-500 dark:text-blue-400" /> Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 rounded-lg">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-zinc-500 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" /> Role
                </h4>
                <p className="text-zinc-900 dark:text-white font-medium">{project.role || 'Software Engineer'}</p>
              </div>
              <div>
                <h4 className="text-zinc-500 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Timeline
                </h4>
                <p className="text-zinc-900 dark:text-white font-medium">{project.timeline || '2023 - Present'}</p>
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors font-medium group"
                >
                  View Live Project <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-8 space-y-20">
            {project.challenge && (
              <section>
                <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-500 text-lg">!</span>
                  The Challenge
                </h3>
                <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
                  {project.challenge}
                </p>
              </section>
            )}

            {project.solution && (
              <section>
                <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-500 text-lg">
                    <Zap className="w-4 h-4" />
                  </span>
                  The Solution
                </h3>
                <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
                  {project.solution}
                </p>
              </section>
            )}

            {project.impact && (
              <section>
                <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-lg">
                    <Award className="w-4 h-4" />
                  </span>
                  Key Impact
                </h3>
                <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed font-light">
                  {project.impact}
                </p>
              </section>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
