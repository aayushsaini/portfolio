import { ProjectForm } from '../project-form'

export default function NewProjectPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
                Add New Project
            </h1>
            <ProjectForm />
        </div>
    )
}
