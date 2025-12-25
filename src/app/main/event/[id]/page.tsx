"use client";

import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import {useEffect, useState} from "react";
import { EventPostResponse } from "@/type/postResponse";
import { apiGet } from "@/lib/api";
import PostFrame from "@/component/post/postFrame";
import TipTapViewer from "@/component/tiptap/tiptapViewer";
import EventBoard from "@/board/eventBoard";
import {PostFrameLoading} from "@/component/post/postFrameLoading";
import NoticeBoard from "@/board/noticeBoard";
import {PostFrameNotFound} from "@/component/post/postFrameNotFound";

export default function EventPost() {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const [data, setData] = useState<EventPostResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        (async () => {
            const { data, error } = await apiGet<EventPostResponse>(`/posts/event/${id}`);
            if (error) {
                toast.error(`[이벤트 상세 조회 실패] ${error.message}`);
                setData(null);
            } else {
                setData(data ?? null);
            }
        })();
        setLoading(false);
    }, [id]);

    return (
        <div className="w-full flex flex-col gap-3">
            {/* 로딩 상태 */}
            {loading &&
                <>
                    <PostFrameLoading />
                    <NoticeBoard />
                </>
            }

            {/* 데이터 없음 */}
            {!loading && !data &&
                <>
                    <PostFrameNotFound />
                    <NoticeBoard />
                </>
            }

            {/* 정상 데이터 */}
            {!loading && data && (
                <>
                    <PostFrame
                        id={data.id}
                        category="event"
                        title={data.title}
                        authorNickname={data.author?.nickname}
                        createdAt={data.createdAt}
                        viewCount={data.viewCount ?? 0}
                        comments={data.commentResponses}
                        editable={data.editable}
                    >
                        <TipTapViewer
                            value={data.richBody}
                        />
                    </PostFrame>
                    <EventBoard />
                </>
            )}
        </div>
    );
}
