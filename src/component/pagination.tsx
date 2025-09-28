"use client";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onChange: (page: number) => void;
    className?: string;
    windowSize?: number;     // 한 번에 보여줄 숫자 버튼 개수 (기본 5)
    showFirstLast?: boolean; // « » 버튼 표시
    showPrevNext?: boolean;  // 이전/다음 버튼 표시
};

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       onChange,
                                       className,
                                       windowSize = 5,
                                       showFirstLast = true,
                                       showPrevNext = true,
                                   }: PaginationProps) {
    const btnBase =
        "px-3 py-2 rounded-md border transition-colors select-none";
    const btnIdle =
        "border-gray-300 bg-white text-gray-800 hover:bg-gray-200 cursor-pointer";
    const btnActive =
        "border-gray-500 bg-gray-500 text-white cursor-pointer";
    const btnDisabled = "text-gray-800 bg-white cursor-not-allowed";

    const clamp = (v: number, min: number, max: number) =>
        Math.max(min, Math.min(max, v));

    // 시작/끝 계산: 현재 페이지를 중심으로 windowSize 개 보여주기
    const half = Math.floor(windowSize / 2);
    let start = currentPage - half;
    let end = start + windowSize - 1;

    // 범위 보정
    if (start < 1) {
        start = 1;
        end = Math.min(totalPages, start + windowSize - 1);
    }
    if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - windowSize + 1);
    }

    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const goto = (p: number) => {
        const target = clamp(p, 1, totalPages);
        if (target !== currentPage) onChange(target);
    };

    return (
        <nav
            className={`my-4 flex items-center justify-center gap-1 ${className ?? ""}`}
            aria-label="페이지 내비게이션"
        >
            {showFirstLast && (
                <button
                    onClick={() => goto(1)}
                    className={`${btnBase} ${
                        currentPage === 1 ? btnDisabled : btnIdle
                    }`}
                    disabled={currentPage === 1}
                    aria-label="첫 페이지"
                >
                    «
                </button>
            )}

            {showPrevNext && (
                <button
                    onClick={() => goto(currentPage - 1)}
                    className={`${btnBase} ${
                        currentPage === 1 ? btnDisabled : btnIdle
                    }`}
                    disabled={currentPage === 1}
                    aria-label="이전 페이지"
                >
                    이전
                </button>
            )}

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => goto(p)}
                    className={`${btnBase} ${
                        p === currentPage ? btnActive : btnIdle
                    }`}
                    aria-current={p === currentPage ? "page" : undefined}
                >
                    {p}
                </button>
            ))}

            {showPrevNext && (
                <button
                    onClick={() => goto(currentPage + 1)}
                    className={`${btnBase} ${
                        currentPage === totalPages ? btnDisabled : btnIdle
                    }`}
                    disabled={currentPage === totalPages}
                    aria-label="다음 페이지"
                >
                    다음
                </button>
            )}

            {showFirstLast && (
                <button
                    onClick={() => goto(totalPages)}
                    className={`${btnBase} ${
                        currentPage === totalPages ? btnDisabled : btnIdle
                    }`}
                    disabled={currentPage === totalPages}
                    aria-label="마지막 페이지"
                >
                    »
                </button>
            )}
        </nav>
    );
}
