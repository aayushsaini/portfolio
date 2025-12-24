export default function AdminLoading() {
    return (
        <div>
            <div className="mb-8">
                <div className="h-9 w-40 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-2" />
                <div className="h-5 w-64 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-2" />
                                <div className="h-10 w-12 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-6">
                <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse mb-4" />
                <div className="flex gap-4">
                    <div className="h-12 w-32 bg-zinc-200 dark:bg-zinc-700 rounded-xl animate-pulse" />
                    <div className="h-12 w-40 bg-zinc-200 dark:bg-zinc-700 rounded-xl animate-pulse" />
                </div>
            </div>
        </div>
    )
}
