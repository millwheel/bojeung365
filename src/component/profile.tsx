"use client";

import toast from "react-hot-toast";
import {UserProfile} from "@/type/userType";
import {apiPost} from "@/lib/api";

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
        toast.success("로그아웃 성공!");
        await onLoggedOut?.();
    };

    return (
        <div className="p-2">
            <div className="flex items-center">
                <div className="flex-1 text-white text-sm">
                    <p className="font-medium">안녕하세요</p>
                    <p className="truncate text-gray-300">{userProfile.nickname}님</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-500 cursor-pointer rounded"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}
