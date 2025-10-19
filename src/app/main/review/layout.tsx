"use client"

import Image from "next/image";
import BoardTable, {Column} from "@/component/boardTable";
import {BoardResponse, ReviewPostList} from "@/type/boardResponse";
import Pagination from "@/component/pagination";
import WriteButton from "@/component/writeButton";
import {router} from "next/client";
import {useCallback, useEffect, useState} from "react";
import {apiGet} from "@/lib/api";
import toast from "react-hot-toast";
import Link from "next/link";
import {formatDate} from "@/util/dataFormat";

const cellClass = "px-3 py-2 text-center text-gray-700";

export default function NoiceLayout({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<ReviewPostList[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const loadPosts = useCallback(async () => {

        const { data, error } = await apiGet<BoardResponse<ReviewPostList>>(
            `/posts/review?page=${currentPage}`
        );

        if (error) {
            toast.error(`[이용후기 불러오기 실패] ${error.message}`);
        } else if (data) {
            setPosts(data.content ?? []);
            setTotalPages(data.totalPages ?? 0);
        }

    }, [currentPage]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const columns: Column<ReviewPostList>[] = [
        { header: "번호", thClassName: "w-20 py-3", tdClassName: "text-center", key: "id" },
        {
            header: "제목",
            thClassName: "",
            tdClassName: "px-3 py-2 text-left",
            render: (post) => (
                <Link
                    href="#"
                    className="block max-w-[900px] truncate"
                    title={post.title}
                >
                    {post.title}
                </Link>
            ),
        },
        { header: "사이트주소", thClassName: "w-28", key: "siteUrl" },
        { header: "작성자", thClassName: "w-28", tdClassName: "text-center", key: "authorNickname" },
        {
            header: "날짜",
            thClassName: "w-28",
            tdClassName: "text-center",
            render: (post) => formatDate(post.createdAt),
        },
        {
            header: "조회",
            thClassName: "w-20",
            tdClassName: "text-center",
            render: (post) => post.viewCount,
        },
    ];

    return (
        <div>
            <section className="relative bg-[#22242d] h-84 text-white">
                <Image src="/image/review_banner.jpg" alt="리뷰 배너" fill className="object-cover" />
            </section>
            <section>
                <div className="py-2">
                    <h2 className="text-base font-bold">이용후기</h2>
                    <div className="border-b-2 border-red-500 w-full"></div>
                </div>
                {children}
            </section>

            <section>
                <BoardTable<ReviewPostList>
                    rows={posts}
                    columns={columns}
                    rowKey={(p) => p.id}
                    cellClass={cellClass}
                />
                <div className="flex items-center justify-between mt-4">
                    <div className="flex-1 flex justify-center">
                        <Pagination
                            currentPage={currentPage + 1}
                            totalPages={totalPages}
                            onChange={setCurrentPage}
                            showFirstLast={true}
                            showPrevNext={true}
                        />
                    </div>
                    <WriteButton onlyAdmin={false} onClick={() => router.push("/main/review/new")} />
                </div>
            </section>
        </div>
    );
}