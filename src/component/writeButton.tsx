"use client";

import { useMe } from "@/hook/useMe";
import { UserRole } from "@/type/userType";

type WriteButtonProps = {
    onlyAdmin?: boolean;
    onClick?: () => void;
};

export default function WriteButton({ onlyAdmin = false, onClick }: WriteButtonProps) {
    const { me, isLoading } = useMe();

    // 로딩 중이면 아무것도 표시하지 않음
    if (isLoading) return null;

    // 로그인하지 않았으면 숨김
    if (!me) return null;

    // 관리자 전용인데, 일반 회원이면 숨김
    if (onlyAdmin && me.role !== UserRole.ADMIN) return null;

    return (
        <button
            onClick={onClick}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors ml-4 cursor-pointer"
        >
            글쓰기
        </button>
    );
}