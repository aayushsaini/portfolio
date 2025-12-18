import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProjectDetail } from '../components/project-detail'
import { PROJECTS } from '../constants'

export const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const project = PROJECTS.find(p => p.id === id)

    if (!project) {
        return (
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Project Not Found</h2>
                    <button onClick={() => navigate('/work')} className="text-blue-500 hover:text-blue-400">
                        ← Back to Work
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-24 pb-0">
            <ProjectDetail project={project} onBack={() => navigate('/work')} />
        </div>
    )
}
