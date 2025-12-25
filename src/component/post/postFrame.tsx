import {ReactNode, useMemo, useState} from "react";
import { formatBoardDateTime } from "@/util/dataFormatter";
import {CommentResponse, NoticePostResponse} from "@/type/postResponse";
import {Eye, Clock, MessageSquare, Pencil, Trash2} from "lucide-react";
import {apiDelete, apiGet, apiPost} from "@/lib/api";
import {useRouter} from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export type PostFrameProps = {
    id: number;
    category: string;
    title: string;
    authorNickname: string;
    createdAt: string;
    viewCount: number;
    comments?: CommentResponse[];
    children?: ReactNode;
    editable: boolean;
};

export default function PostFrame({
                                      id,
                                      category,
                                      title,
                                      authorNickname,
                                      createdAt,
                                      viewCount,
                                      comments,
                                      children,
                                      editable
                                  }: PostFrameProps) {
    const createdAtText = useMemo(() => (createdAt ? formatBoardDateTime(createdAt) : ""), [createdAt]);
    const [comment, setComment] = useState("");
    const [commentPending, setCommentPending] = useState(false);
    const router = useRouter();
    const [commentList, setCommentList] = useState<CommentResponse[]>(comments ?? []);

    const loadComments = async () => {
        const { data, error } = await apiGet<CommentResponse[]>(`/comments?postId=${id}`);
        if (!data || error) {
            toast.error("댓글 목록 조회에 실패했습니다.");
            console.error(error);
            return;
        }
        setCommentList(data ?? []);
    };

    const handleCreateComment = async () => {
        const body = comment.trim();
        if (!body) {
            toast.error("댓글 내용을 입력하세요.");
            return;
        }

        setCommentPending(true);
        const { error } = await apiPost<void>(`/comments?postId=${id}`, { body });
        setCommentPending(false);

        if (error) {
            console.error(error);
            toast.error(`[댓글 등록 실패] ${error.message}`);
            return;
        }

        setComment("");
        toast.success("댓글이 등록되었습니다.");
        await loadComments();
    };

    const handleDeleteComment = async (commentId: number) => {
        const confirmed = window.confirm("댓글을 삭제하시겠습니까?");
        if (!confirmed) return;

        const { error } = await apiDelete<void>(`/comments/${commentId}`);
        if (error) {
            console.error(error);
            toast.error("댓글 삭제에 실패했습니다.");
            return;
        }

        toast.success("댓글이 삭제되었습니다.");
        await loadComments();
    };

    const handleDelete = async () => {
        const confirmed = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmed) return;
        const { error } = await apiDelete<void>(`/posts/${category}/${id}`);
        if (error) {
            console.error(error);
            return;
        }
        router.replace(`/main/${category}`);
    }

    return (
        <article className="bg-white border shadow-sm text-black">
            {/* 헤더 */}
            <header className="px-4 pt-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-md md:text-xl font-extrabold tracking-tight text-gray-900">
                        {title}
                    </h1>
                    {editable && (
                        <div className="flex gap-2">
                            <Link
                                href={`/posts/${category}/${id}/edit`}
                                className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-500 transition-colors cursor-pointer"
                            >
                                수정
                            </Link>
                            <button
                                onClick={() => handleDelete()}
                                className="px-3 py-1 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-500 transition-colors cursor-pointer"
                            >
                                삭제
                            </button>
                        </div>
                    )}
                </div>

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

                        {!!commentList?.length && (
                            <>
                                <span className="hidden md:inline select-none">|</span>
                                <span className="inline-flex items-center gap-1">
                                    <MessageSquare className="h-4 w-4" />
                                    <span>{commentList.length}</span>
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
                    {`댓글${commentList?.length ? ` (${commentList.length})` : ""}`}
                </h2>

                {/* 댓글 리스트 */}
                {!commentList || commentList.length === 0 ? (
                    <p>아직 댓글이 없습니다.</p>
                ) : (
                    <ul className="rounded-md overflow-hidden">
                        {commentList.map((c) => (
                            <li key={c.id} className="p-4">
                                <div className="flex items-start gap-3">
                                    {/* 아바타 */}
                                    <div className="mt-0.5 h-9 w-9 shrink-0 rounded-full bg-gray-200" />

                                    {/* 본문 */}
                                    <div className="flex-1">
                                        {/* 상단: 작성자 / 날짜 / 삭제 */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="font-medium text-sm">{c.authorNickname}</span>
                                                <span className="text-xs text-gray-500">
                                                  {formatBoardDateTime(c.createdAt)}
                                                </span>
                                            </div>

                                            {c.editable && (
                                                <button
                                                    onClick={() => handleDeleteComment(c.id)}
                                                    className="p-1 text-gray-400 hover:text-red-600 transition cursor-pointer"
                                                    title="댓글 삭제"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>

                                        {/* 내용 */}
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
                            placeholder="댓글을 입력하세요"
                            className="min-h-[96px] resize-none flex-1 p-3 focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={handleCreateComment}
                            disabled={commentPending}
                            className="w-20 shrink-0 bg-gray-300 text-sm font-semibold cursor-pointer hover:bg-gray-400 transition"
                        >
                            {commentPending ? "..." : "등록"}
                        </button>
                    </div>
                </div>
            </section>
        </article>
    );
}
