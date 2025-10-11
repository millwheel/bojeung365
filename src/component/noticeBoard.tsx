"use client";

import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import Pagination from "@/component/pagination";
import {formatDate} from "@/util/dataFormat";
import {apiGet} from "@/lib/api";
import {NoticePostList} from "@/type/postType";
import toast from "react-hot-toast";

const numberFormat = new Intl.NumberFormat("ko-KR");
const cellClass = "px-3 py-2 text-center text-gray-700";

export default function NoticeBoard() {
    const [posts, setPosts] = useState<NoticePostList[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const loadPosts = useCallback(async () => {

        const { data, error } = await apiGet<PageResponse<NoticePostList>>(
            `/posts/notice?page=${currentPage}`
        );

        if (error) {
            toast.error(`[공지사항 불러오기 실패] ${error.message}`);
        } else if (data) {
            setPosts(data.content ?? []);
            setTotalPages(data.totalPages ?? 0);
        }

    }, [currentPage]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    return (
        <div className="w-full">
            <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white">
                <table className="min-w-full text-sm">
                    <thead>
                    <tr className="bg-gray-100 text-gray-800 text-center">
                        <th className="w-16 px-3 py-3">번호</th>
                        <th className="">제목</th>
                        <th className="w-32">작성자</th>
                        <th className="w-32">날짜</th>
                        <th className="w-20">조회</th>
                    </tr>
                    </thead>

                    <tbody>
                    {posts.map((post) => (
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
                            <td className={cellClass}>{post.authorNickname}</td>
                            <td className={cellClass}>{formatDate(post.createdAt)}</td>
                            <td className={cellClass}>{numberFormat.format(post.viewCount)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage + 1}
                totalPages={totalPages}
                onChange={setCurrentPage}
                showFirstLast={true}
                showPrevNext={true}
            />
        </div>
    );
}
