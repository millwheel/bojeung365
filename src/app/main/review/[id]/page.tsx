"use client";

import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import PostFrame from "@/component/post/postFrame";
import { ReviewPostResponse } from "@/type/postResponse";
import ReviewBoard from "@/board/reviewBoard";
import {formatContentDate} from "@/util/dataFormatter";
import {formatMoney} from "@/util/moneyFormatter";
import RatingStars from "@/component/ratingStar";
import ContentTableRow from "@/component/tableRow";

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
                {/* 상단: 좌측 이미지 / 우측 정보표 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* 왼쪽: 이미지 영역(비워둠) */}
                    <div className="rounded-md border bg-gray-50 flex items-center justify-center min-h-[280px]">
                        <span className="text-gray-400 text-sm">이미지 영역 (추후 추가)</span>
                    </div>

                    {/* 오른쪽: 정보 표 */}
                    <div className="rounded-md border overflow-hidden">
                        <div className="px-4 py-3 border-b text-center font-semibold">
                            사이트 정보
                        </div>
                        <table className="w-full text-sm">
                            <tbody>
                            <ContentTableRow label="사이트명" value={data.siteName} />
                            <ContentTableRow
                                label="사이트주소"
                                value={data.siteUrl}
                            />
                            <ContentTableRow label="베팅날짜" value={formatContentDate(data.bettingDate)} />
                            <ContentTableRow
                                label="배팅금(배당)"
                                value={`${formatMoney(data.bettingAmount)}${
                                    data.dividend ? ` (${formatMoney(data.dividend)})` : ''
                                }`}
                            />
                            <ContentTableRow label="당첨금액" value={formatMoney(data.winAmount)} />
                            <ContentTableRow label="환전속도" value={<RatingStars value={data.exchangeSpeed} />} />
                            <ContentTableRow label="배당만족도" value={<RatingStars value={data.dividendRating} />} />
                            <ContentTableRow label="이벤트평가" value={<RatingStars value={data.eventRating} />} />
                            <ContentTableRow label="먹튀안전성" value={<RatingStars value={data.reliability} />} />
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 하단: 본문 */}
                <div className="mt-4 rounded-md border p-4">
                    <div className="text-base md:text-lg font-semibold mb-2">
                        {(data.siteName ?? '') + ' 배팅 후기'}
                    </div>
                    <p className="whitespace-pre-wrap leading-relaxed">{data.body}</p>
                </div>
            </PostFrame>

            <ReviewBoard />
        </div>
    );
}


