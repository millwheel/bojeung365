"use client"

import toast from "react-hot-toast";
import {useParams} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import { NoticePostResponse } from "@/type/postResponse";
import {apiGet} from "@/lib/api";
import {formatDate} from "@/util/dataFormat";

export default function NoticeDetailPage() {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const [data, setData] = useState<NoticePostResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        let isMounted = true;

        (async () => {
            setLoading(true);
            const {data, error} = await apiGet<NoticePostResponse>(`/posts/notice/${id}`);
            if (!isMounted) return;

            if (error) {
                toast.error(`[공지 상세 조회 실패] ${error.message}`);
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

    const createdAtText = useMemo(() => {
        if (!data?.createdAt) return '';
        return formatDate(data.createdAt);
    }, [data?.createdAt]);

    return (
        <div className="w-full">

            {loading && (
                <div className="flex items-center justify-center h-40">
                    <p className="text-white/70">불러오는 중… </p>
                </div>
            )}

            {!loading && !data && (
                <div className="flex items-center justify-center h-40">
                    <p className="text-white/60">게시글을 찾을 수 없습니다.</p>
                </div>
            )}

            {!loading && data && (
                <article className="bg-[#1a1a1a] border border-white/10 rounded-lg shadow-sm">
                    {/* 제목 */}
                    <header className="px-5 pt-5">
                        <h1 className="text-2xl font-semibold text-white">{data.title}</h1>
                        <div className="mt-3 text-sm text-white/70 flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span>작성자: <b className="text-white">{data.author?.nickname}</b></span>
                            <span className="text-white/40">|</span>
                            <span>작성일: {createdAtText}</span>
                            <span className="text-white/40">|</span>
                            <span>조회수: {data.viewCount} 회</span>
                        </div>
                    </header>

                    {/* 구분선 */}
                    <div className="h-px w-full bg-white/10 mt-4"/>

                    {/* 본문 (richBody는 이후 WYSIWYG 렌더러 붙일 때 교체) */}
                    <section className="px-5 py-6">
                        <div className="prose prose-invert max-w-none">
                            <p className="text-white/80">
                                (본문 리치 텍스트는 추후 렌더러 연결 예정)
                            </p>
                        </div>
                    </section>

                    {/* 댓글 */}
                    <section className="px-5 pb-6">
                        <h2 className="text-lg font-semibold text-white mb-3">댓글</h2>
                        {(!data.commentResponses || data.commentResponses.length === 0) ? (
                            <p className="text-white/60">아직 댓글이 없습니다.</p>
                        ) : (
                            <ul className="divide-y divide-white/10 rounded-md border border-white/10">
                                {data.commentResponses.map((c) => (
                                    <li key={c.id} className="p-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-white">{c.authorNickname}</span>
                                            <span className="text-xs text-white/50">{formatDate(c.createdAt)}</span>
                                        </div>
                                        <p className="mt-1 text-white/80 whitespace-pre-wrap">{c.body}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </article>
            )}
        </div>
    );
}