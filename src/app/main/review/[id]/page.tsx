"use client";

import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import PostFrame from "@/component/postFrame";
import { ReviewPostResponse } from "@/type/postResponse";
import Link from "next/link";
import ReviewBoard from "@/board/reviewBoard";
import {formatContentDate} from "@/util/dataFormatter";
import {formatMoney} from "@/util/moneyFormatter";
import RatingStars from "@/component/ratingStar";

export default function ReviewPost() {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const [data, setData] = useState<ReviewPostResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        let isMounted = true;

        (async () => {
            setLoading(true);
            const { data, error } = await apiGet<ReviewPostResponse>(`/posts/review/${id}`);
            if (!isMounted) return;

            if (error) {
                toast.error(`[이용후기 상세 조회 실패] ${error.message}`);
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
                id={data.id}
                category="review"
                title={data.title}
                authorNickname={data.author?.nickname}
                createdAt={data.createdAt}
                viewCount={data.viewCount ?? 0}
                comments={data.commentResponses}
                editable={data.editable}
            >
                {/* 상단: 사이트 정보 */}
                <div className="rounded-md border bg-gray-50 p-4">
                    <div className="text-sm text-gray-500 mb-1">사이트 정보</div>
                    <div className="flex items-center gap-3 flex-wrap">
                        {data.siteName && <span className="font-medium">{data.siteName}</span>}
                        {data.siteUrl && (
                            <Link
                                href={data.siteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-2 text-blue-700 break-all"
                            >
                                {data.siteUrl}
                            </Link>
                        )}
                    </div>
                </div>

                {/* 중단: 베팅/정산 정보 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="rounded-md border p-4">
                        <div className="text-xs text-gray-500">베팅일</div>
                        <div className="text-base">{formatContentDate(data.bettingDate)}</div>
                    </div>
                    <div className="rounded-md border p-4">
                        <div className="text-xs text-gray-500">베팅금액</div>
                        <div className="text-base">{formatMoney(data.bettingAmount)}</div>
                    </div>
                    <div className="rounded-md border p-4">
                        <div className="text-xs text-gray-500">배당률</div>
                        <div className="text-base">{formatMoney(data.dividend)}</div>
                    </div>
                    <div className="rounded-md border p-4">
                        <div className="text-xs text-gray-500">당첨금</div>
                        <div className="text-base">{formatMoney(data.winAmount)}</div>
                    </div>
                    <div className="rounded-md border p-4 col-span-1 sm:col-span-2 lg:col-span-1">
                        <div className="text-xs text-gray-500 mb-2">평가</div>
                        <div className="flex flex-col gap-2">
                            <RatingStars label="환전속도" value={data.exchangeSpeed} />
                            <RatingStars label="배당평가" value={data.dividendRating} />
                            <RatingStars label="이벤트평가" value={data.eventRating} />
                            <RatingStars label="신뢰도" value={data.reliability} />
                        </div>
                    </div>
                </div>

                {/* 본문 */}
                <div className="mt-2 rounded-md border p-4">
                    <div className="text-sm text-gray-500 mb-3">이용후기</div>
                    <p>{data.body}</p>
                </div>
            </PostFrame>
            <ReviewBoard />
        </div>
    );
}
