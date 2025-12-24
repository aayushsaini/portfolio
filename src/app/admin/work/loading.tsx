export default function AdminWorkLoading() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="h-9 w-48 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-2" />
                    <div className="h-5 w-56 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                </div>
                <div className="h-12 w-36 bg-zinc-200 dark:bg-zinc-700 rounded-xl animate-pulse" />
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-zinc-200 dark:border-white/10">
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-500">Title</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-500">Category</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-zinc-500">Timeline</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-zinc-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4].map((i) => (
                            <tr key={i} className="border-b border-zinc-100 dark:border-white/5 last:border-0">
                                <td className="px-6 py-4">
                                    <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="h-5 w-28 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                                        <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
