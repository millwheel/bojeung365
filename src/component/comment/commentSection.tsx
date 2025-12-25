"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

import { apiDelete, apiGet, apiPost } from "@/lib/api";
import { formatBoardDateTime } from "@/util/dataFormatter";
import { CommentResponse } from "@/type/postResponse";

type CommentSectionProps = {
  postId: number;
  initialComments?: CommentResponse[];
};

export default function CommentSection({
  postId,
  initialComments = [],
}: CommentSectionProps) {
  const [comment, setComment] = useState("");
  const [commentPending, setCommentPending] = useState(false);
  const [commentList, setCommentList] =
    useState<CommentResponse[]>(initialComments);

  const loadComments = async () => {
    const { data, error } = await apiGet<CommentResponse[]>(
      `/comments?postId=${postId}`,
    );
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
    const { error } = await apiPost<void>(`/comments?postId=${postId}`, {
      body,
    });
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

  return (
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
                      <span className="font-medium text-sm">
                        {c.authorNickname}
                      </span>
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
            className="w-20 shrink-0 bg-gray-300 text-sm font-semibold cursor-pointer hover:bg-gray-400 transition disabled:opacity-60"
          >
            {commentPending ? "..." : "등록"}
          </button>
        </div>
      </div>
    </section>
  );
}
