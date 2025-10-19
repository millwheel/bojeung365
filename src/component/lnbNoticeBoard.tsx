"use client";

import {useCallback, useEffect, useState} from "react";
import {BoardResponse, NoticePostList} from "@/type/boardResponse";
import {apiGet} from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LnbNoticeBoard() {
    const [posts, setPosts] = useState<NoticePostList[]>([]);

    const loadPosts = useCallback(async () => {
        const { data, error } = await apiGet<BoardResponse<NoticePostList>>(
            `/posts/notice?page=0&size=5`
        );
        if (error) {
            toast.error(`[공지사항 불러오기 실패] ${error.message}`);
        } else if (data) {
            setPosts(data.content ?? []);
        }
    }, []);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    return (
        <section className="bg-[#1a1a1a] border border-gray-100/20 shadow-sm">
            {/* 헤더 */}
            <div className="px-4 pt-3 pb-2">
                <h3 className="text-md font-semibold text-orange-400">공지사항</h3>
            </div>

            {/* 구분선 */}
            <div className="h-px w-full bg-white/20" />

            {/* 목록 */}
            <ul className="divide-y divide-white/10">
                {posts.length === 0 ? (
                    <li className="px-4 py-4 text-sm text-white/60">공지사항이 없습니다.</li>
                ) : (
                    posts.map((post) => (
                        <li key={post.id} className="px-2">
                            <Link
                                href={`/posts/notice/${post.id}`}
                                className="flex items-center justify-between gap-3 py-3 group"
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    {/* 빨간 원 아이콘 */}
                                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                                        N
                                    </span>

                                    {/* 제목 */}
                                    <span className="text-sm text-white group-hover:text-white/90 truncate">
                                        {post.title}
                                    </span>
                                </div>

                                {/* 댓글 수 */}
                                <span className="text-sm tabular-nums text-orange-300 shrink-0">
                                    +{post.commentCount}
                                </span>
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </section>
    );
}