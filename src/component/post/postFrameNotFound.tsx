export function PostFrameNotFound() {
    return (
        <article className="bg-white border shadow-sm text-black">
            <header className="px-4 pt-4">
                <h1 className="text-md md:text-xl font-extrabold tracking-tight text-gray-900">
                    게시글을 찾을 수 없습니다.
                </h1>
            </header>

            <section className="px-5 py-6">
                <p className="text-sm text-gray-600">
                    게시글이 삭제되었거나 주소가 잘못되었을 수 있습니다.
                </p>
            </section>

            <div className="h-px w-full bg-gray-200 mt-4 mb-4" />

            <section className="px-5 pb-6">
                <p className="text-sm text-gray-500">
                    목록 페이지로 돌아가 다시 시도해 주세요.
                </p>
            </section>
        </article>
    );
}