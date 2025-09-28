"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Pagination from "@/component/pagination";

type Post = {
    id: number;
    title: string;
    user: string;
    date: string;   // YYYY-MM-DD (UTC 기준)
    views: number;
};

const PAGE_SIZE = 20;
const BASE_UTC = Date.parse("2025-09-01T00:00:00Z"); // 고정 기준일(UTC)

// 결정적(SSR=CSR 동일) 샘플 데이터 생성
function makeSampleData(count = 87): Post[] {
    return Array.from({ length: count }, (_, i) => {
        const id = count - i;

        // 날짜: 기준일에서 i일 빼기 (UTC 고정)
        const ms = BASE_UTC - i * 24 * 60 * 60 * 1000;
        const d = new Date(ms);
        const yyyy = d.getUTCFullYear();
        const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
        const dd = String(d.getUTCDate()).padStart(2, "0");

        // 조회수: 랜덤 대신 결정적 수식
        const views = (id * 137) % 5000;

        return {
            id,
            title: `이용후기 샘플 제목 ${id} — 긴 제목도 한 줄로 말줄임`,
            user: `user_${(id % 12) + 1}`,
            date: `${yyyy}-${mm}-${dd}`,
            views,
        };
    });
}

const SAMPLE_POSTS: Post[] = makeSampleData();
const nf = new Intl.NumberFormat("ko-KR");

export default function ReviewBoard() {
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(SAMPLE_POSTS.length / PAGE_SIZE);

    const current = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return SAMPLE_POSTS.slice(start, start + PAGE_SIZE);
    }, [page]);

    const cellClass = "px-3 py-2 text-center text-gray-700";

    return (
        <div className="w-full">
            <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white">
                <table className="min-w-full text-sm">
                    <thead>
                    <tr className="bg-gray-100 text-gray-800">
                        <th className="w-16 px-3 py-1 text-center font-medium">번호</th>
                        <th className="px-3 py-3 text-left font-medium">제목</th>
                        <th className="w-32 px-3 py-3 text-center font-medium">유저명</th>
                        <th className="w-32 px-3 py-3 text-center font-medium">날짜</th>
                        <th className="w-20 px-3 py-3 text-center font-medium">조회</th>
                    </tr>
                    </thead>

                    <tbody>
                    {current.map((post) => (
                        <tr
                            key={post.id}
                            className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <td className={cellClass}>{post.id}</td>
                            <td className="px-3 py-2 text-left text-black">
                                <Link
                                    href="#"
                                    className="block max-w-[900px] truncate hover:text-blue-600"
                                    title={post.title}
                                >
                                    {post.title}
                                </Link>
                            </td>
                            <td className={cellClass}>{post.user}</td>
                            <td className={cellClass}>{post.date}</td>
                            <td className={cellClass}>{nf.format(post.views)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onChange={setPage}
                showFirstLast={true}
                showPrevNext={true}
            />
        </div>
    );
}
