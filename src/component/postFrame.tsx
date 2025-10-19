import { ReactNode, useMemo, useState } from "react";
import { formatDate } from "@/util/dataFormat";
import { CommentResponse } from "@/type/postResponse";
import {Eye, Clock, MessageSquare, Pencil} from "lucide-react";

export type PostFrameProps = {
    title: string;
    authorNickname: string;
    createdAt: string;
    viewCount: number;
    comments?: CommentResponse[];
    children?: ReactNode;
    onSubmitComment?: (text: string) => Promise<void> | void;
};

export default function PostFrame({
                                      title,
                                      authorNickname,
                                      createdAt,
                                      viewCount,
                                      comments,
                                      children,
                                      onSubmitComment,
                                  }: PostFrameProps) {
    const createdAtText = useMemo(() => (createdAt ? formatDate(createdAt) : ""), [createdAt]);
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        if (!comment.trim()) return;
        try {
            await onSubmitComment?.(comment.trim());
            setComment("");
        } catch {
            // UI만 담당
        }
    };

    return (
        <article className="bg-white border shadow-sm text-black">
            {/* 헤더 */}
            <header className="px-4 pt-4">
                {/* 제목 */}
                <h1 className="text-md md:text-xl font-extrabold tracking-tight text-gray-900">
                    {title}
                </h1>

                {/* 메타 */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm bg-gray-200 p-2 border-t border-b border-gray-300">
                    {/* 왼쪽 메타 */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="inline-flex items-center gap-2">
                            <Pencil className="h-4 w-4"/>
                            <span>{authorNickname}</span>
                        </span>

                        <span className="hidden md:inline select-none">|</span>

                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{createdAtText}</span>
                        </span>

                        <span className="hidden md:inline select-none">|</span>

                        <span className="inline-flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{viewCount}</span>
                        </span>

                        {!!comments?.length && (
                            <>
                                <span className="hidden md:inline select-none">|</span>
                                <span className="inline-flex items-center gap-1">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{comments.length}</span>
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </header>


            {/* 본문 */}
            {children && (
                <section className="px-5 py-6">
                    <div className="prose max-w-none leading-relaxed">
                        {children}
                    </div>
                </section>
            )}

            {/* 구분선 */}
            <div className="h-px w-full bg-gray-200 mt-4 mb-4" />

            {/* 댓글 영역 */}
            <section className="px-5 pb-6">
                <h2 className="text-lg font-semibold mb-3">
                    {`댓글${comments?.length ? ` (${comments.length})` : ""}`}
                </h2>

                {/* 댓글 리스트 */}
                {!comments || comments.length === 0 ? (
                    <p>아직 댓글이 없습니다.</p>
                ) : (
                    <ul className="rounded-md divide-y overflow-hidden">
                        {comments.map((c) => (
                            <li key={c.id} className="p-4">
                                <div className="flex items-start gap-3">
                                    {/* 아바타 */}
                                    <div className="mt-0.5 h-9 w-9 shrink-0 rounded-full bg-gray-200" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium text-sm">{c.authorNickname}</span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(c.createdAt)}
                                            </span>
                                        </div>
                                        <p className="mt-1 whitespace-pre-wrap text-sm break-words">
                                            {c.body}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {/* 댓글 입력 박스 */}
                <div className="mt-4 border overflow-hidden border-gray-400">
                    <div className="flex">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="내용을 입력하세요…"
                            className="min-h-[96px] resize-none flex-1 p-3 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-20 shrink-0 bg-gray-300 text-sm font-semibold cursor-pointer hover:bg-gray-400 transition"
                        >
                            등록
                        </button>
                    </div>
                </div>
            </section>
        </article>
    );
}
