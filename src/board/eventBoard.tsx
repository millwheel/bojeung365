"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "@/component/pagination";
import { formatDate } from "@/util/dataFormat";
import {BoardResponse, EventPostList} from "@/type/boardResponse";
import { apiGet } from "@/lib/api";
import toast from "react-hot-toast";
import BoardTable, { Column } from "@/component/boardTable";
import WriteButton from "@/component/writeButton";

const cellClass = "px-3 py-2 text-center text-gray-700";
const numberFormat = new Intl.NumberFormat("ko-KR");

export default function EventBoard() {
    const [posts, setPosts] = useState<EventPostList[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadPosts = useCallback(async () => {

        const { data, error } = await apiGet<BoardResponse<EventPostList>>(
            `/posts/event?page=${currentPage - 1}`
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

    const columns: Column<EventPostList>[] = [
        { header: "번호", thClassName: "w-20 py-3", tdClassName: "text-center", key: "id" },
        {
            header: "제목",
            thClassName: "",
            tdClassName: "px-3 py-2 text-left",
            render: (post) => (
                <Link
                    href={`/main/event/${post.id}`}
                    className="block max-w-[900px] truncate"
                    title={post.title}
                >
                    {post.title}
                </Link>
            ),
        },
        { header: "작성자", thClassName: "w-32", tdClassName: "text-center", key: "authorNickname" },
        {
            header: "날짜",
            thClassName: "w-32",
            tdClassName: "text-center",
            render: (post) => formatDate(post.createdAt),
        },
        {
            header: "조회",
            thClassName: "w-20",
            tdClassName: "text-center",
            render: (post) => numberFormat.format(post.viewCount),
        },
    ];

    return (
        <div className="w-full">
            <BoardTable<EventPostList>
                rows={posts}
                columns={columns}
                rowKey={(p) => p.id}
                cellClass={cellClass}
            />
            <div className="flex items-center justify-between mt-4">
                <div className="flex-1 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onChange={setCurrentPage}
                        showFirstLast={true}
                        showPrevNext={true}
                    />
                </div>

                <WriteButton onlyAdmin={true} href="/main/event/new" />
            </div>
        </div>
    );
}
