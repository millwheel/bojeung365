import { ReactNode } from "react";
import { formatBoardDateTime } from "@/util/dataFormatter";
import { CommentResponse } from "@/type/postResponse";
import { Eye, Clock, MessageSquare, Pencil } from "lucide-react";
import { apiDelete } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CommentSection from "@/component/comment/commentSection";

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
  editable,
}: PostFrameProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmed) return;
    const { error } = await apiDelete<void>(`/posts/${category}/${id}`);
    if (error) {
      console.error(error);
      return;
    }
    router.replace(`/main/${category}`);
  };

  const commentCount = comments?.length ?? 0;

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
              <Pencil className="h-4 w-4" />
              <span>{authorNickname}</span>
            </span>

            <span className="hidden md:inline select-none">|</span>

            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatBoardDateTime(createdAt)}</span>
            </span>

            <span className="hidden md:inline select-none">|</span>

            <span className="inline-flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{viewCount}</span>
            </span>

            {!!commentCount && (
              <>
                <span className="hidden md:inline select-none">|</span>
                <span className="inline-flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{commentCount}</span>
                </span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* 본문 */}
      {children && (
        <section className="px-5 py-6">
          <div className="prose max-w-none leading-relaxed">{children}</div>
        </section>
      )}

      {/* 구분선 */}
      <div className="h-px w-full bg-gray-200 mt-4 mb-4" />

      {/* 댓글 영역 (분리) */}
      <CommentSection postId={id} initialComments={comments ?? []} />
    </article>
  );
}
