"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {UserProfile} from "@/type/userType";
import apiClient from "@/lib/apiClient";
import axios from "axios";
import {ApiError} from "@/type/errorType";

type ProfileProps = {
    userProfile: UserProfile;
};

export default function Profile({ userProfile }: ProfileProps) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await apiClient.post<void>("/logout", {});
            toast.success('로그아웃 성공!');
            router.refresh();
        } catch (err: unknown) {
            if (axios.isAxiosError<ApiError>(err)) {
                const data = err.response?.data;
                const message = data?.message ?? err.message ?? "알 수 없는 오류가 발생했습니다.";
                toast.error(`[로그아웃 실패] ${message}`);
            } else {
                toast.error("네트워크 오류가 발생했습니다.");
            }
        }
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
