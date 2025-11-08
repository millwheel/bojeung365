"use client";

import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import {useEffect, useState} from "react";
import { EventPostResponse } from "@/type/postResponse";
import { apiGet } from "@/lib/api";
import PostFrame from "@/component/postFrame";
import TipTapViewer from "@/component/tiptap/tiptapViewer";
import EventBoard from "@/board/eventBoard";

export default function EventPost() {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const [data, setData] = useState<EventPostResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        let isMounted = true;

        (async () => {
            setLoading(true);
            const { data, error } = await apiGet<EventPostResponse>(`/posts/event/${id}`);
            if (!isMounted) return;

            if (error) {
                toast.error(`[이벤트 상세 조회 실패] ${error.message}`);
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
            <div className="flex items-center justify-center h-96 bg-white">
                <p className="text-black">불러오는 중…</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex items-center justify-center h-96 bg-white">
                <p className="text-black">게시글을 찾을 수 없습니다.</p>
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
                <TipTapViewer
                    value={data.richBody}
                />
            </PostFrame>
            <EventBoard />
        </div>
    );
}
