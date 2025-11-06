"use client";

import { useMe } from "@/hook/useMe";
import { UserRole } from "@/type/userType";
import { useRouter } from "next/navigation";

type WriteButtonProps = {
    onlyAdmin?: boolean;
    href: string;
};

export default function WriteButton({ onlyAdmin = false, href }: WriteButtonProps) {
    const { me, isLoading } = useMe();
    const router = useRouter();

    if (isLoading) return null;
    if (!me) return null;
    if (onlyAdmin && me.role !== UserRole.ADMIN) return null;

    return (
        <button
            onClick={() => router.push(href)}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors ml-4 cursor-pointer"
        >
            글쓰기
        </button>
    );
}