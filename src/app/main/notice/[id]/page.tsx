"use client";

import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NoticePostResponse } from "@/type/postResponse";
import { apiGet } from "@/lib/api";
import PostFrame from "@/component/postFrame";

export default function NoticePost() {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const [data, setData] = useState<NoticePostResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        let isMounted = true;

        (async () => {
            setLoading(true);
            const { data, error } = await apiGet<NoticePostResponse>(`/posts/notice/${id}`);
            if (!isMounted) return;

            if (error) {
                toast.error(`[공지사항 상세 조회 실패] ${error.message}`);
                setData(null);
            } else {
                setData(data ?? null);
            }
            setLoading(false);
        })();

        return () => {
            isMounted = false;
        };
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-40">
                <p className="text-white/70">불러오는 중…</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center h-40">
                <p className="text-white/60">게시글을 찾을 수 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-3">
            <PostFrame
                title={data.title}
                authorNickname={data.author?.nickname}
                createdAt={data.createdAt}
                viewCount={data.viewCount ?? 0}
                comments={data.commentResponses}
            >
                {/* 여기 children 안이 ‘본문 영역’ — 게시판별로 자유롭게 구현 */}
                <div className="prose prose-invert max-w-none">
                    <p>
                        공지 본문 리치 텍스트는 추후 렌더러 연결 예정
                    </p>
                </div>
            </PostFrame>
        </div>
    );
}
