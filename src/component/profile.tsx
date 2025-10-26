"use client";

import toast from "react-hot-toast";
import {UserProfile} from "@/type/userType";
import {apiPost} from "@/lib/api";
import { clearTokens } from "@/lib/tokenStore";

type ProfileProps = {
    userProfile: UserProfile;
    onLoggedOut: () => Promise<void> | void;
};

export default function Profile({ userProfile, onLoggedOut }: ProfileProps) {

    const handleLogout = async () => {
        const { error } = await apiPost<void>("/logout", {});
        if (error) {
            toast.error(`[로그아웃 실패] ${error.message}`);
            return;
        }

        // 토큰 삭제
        clearTokens();

        toast.success("로그아웃 성공!");
        await onLoggedOut?.();
    };

    return (
        <div className="p-2">
            <div className="flex items-stretch">
                <div className="flex flex-col flex-1 text-white text-sm justify-center">
                    <p className="font-medium">안녕하세요</p>
                    <p className="truncate text-gray-300">{userProfile.nickname}님</p>
                </div>

                <button
                    onClick={handleLogout}
                    className="self-stretch bg-red-600 px-4 text-white font-medium hover:bg-red-500 cursor-pointer"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}
