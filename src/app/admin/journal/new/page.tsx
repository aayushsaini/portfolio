import { PostForm } from '../post-form'

export default function NewPostPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
                Add New Post
            </h1>
            <PostForm />
        </div>
    )
}
