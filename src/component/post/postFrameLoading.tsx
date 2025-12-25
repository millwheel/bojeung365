export function PostFrameLoading() {
    return (
        <article className="bg-white border shadow-sm text-black">
            <header className="px-4 pt-4">
                <div className="animate-pulse space-y-2">
                    <div className="h-5 w-32 bg-gray-200 rounded" />
                    <div className="mt-3 h-8 w-3/4 bg-gray-200 rounded" />
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm bg-gray-200 p-2 border-t border-b border-gray-300">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 animate-pulse">
                        <span className="h-4 w-20 bg-gray-300 rounded" />
                        <span className="h-4 w-24 bg-gray-300 rounded" />
                        <span className="h-4 w-12 bg-gray-300 rounded" />
                    </div>
                </div>
            </header>

            <section className="px-5 py-6">
                <div className="space-y-3 animate-pulse">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-11/12 bg-gray-200 rounded" />
                    <div className="h-4 w-10/12 bg-gray-200 rounded" />
                    <div className="h-4 w-9/12 bg-gray-200 rounded" />
                </div>
            </section>

            <div className="h-px w-full bg-gray-200 mt-4 mb-4" />

            <section className="px-5 pb-6">
                <div className="h-5 w-32 bg-gray-200 rounded mb-3 animate-pulse" />
                <p className="text-sm text-gray-500">불러오는 중…</p>
            </section>
        </article>
    );
}