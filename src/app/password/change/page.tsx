'use client';

import {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { apiPost } from "@/lib/api";
import {clearTokens} from "@/lib/tokenStore";
import {useMe} from "@/hook/useMe";

export default function PasswordChangePage() {
    const router = useRouter();
    const { me, isLoading, refreshMe } = useMe();

    useEffect(() => {
        if (!isLoading && !me) {
            router.replace('/');
        }
    }, [isLoading, me, router]);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pending, setPending] = useState(false);

    const [errors, setErrors] = useState<{
        currentPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
    }>({});


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword) {
            setErrors({ currentPassword: "현재 비밀번호를 입력하세요." });
            return;
        }
        if (newPassword.length < 6) {
            setErrors({ newPassword: "새 비밀번호는 6자 이상이어야 합니다." });
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrors({ confirmPassword: "비밀번호가 일치하지 않습니다." });
            return;
        }

        setErrors({});
        setPending(true);

        const { error } = await apiPost<void>("/me/change-password", {
            currentPassword,
            newPassword
        });

        setPending(false);

        if (error) {
            toast.error(`[변경 실패] ${error.message}`);
            return;
        }

        refreshMe?.();
        clearTokens();
        toast.success("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
        router.push("/");
    };

    if (isLoading || !me) {
        return (
            <div className="min-h-[40vh] flex items-center justify-center bg-[#212121] text-white">
                로딩 중...
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center bg-[#212121] min-h-screen">
            <Toaster position="top-center" />
            <div className="my-10 w-full flex flex-col items-center">
                <form
                    onSubmit={onSubmit}
                    className="bg-white text-black p-8 rounded shadow-md w-full max-w-xl space-y-6 text-base"
                >
                    <h1 className="text-2xl font-bold text-center mb-6">비밀번호 변경</h1>

                    {/* 현재 비밀번호 */}
                    <div>
                        <div className="flex items-center gap-4">
                            <label className="w-48">현재 비밀번호</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                                autoComplete="current-password"
                            />
                        </div>
                        {errors.currentPassword && (
                            <p className="text-red-600 text-sm mt-1">{errors.currentPassword}</p>
                        )}
                    </div>

                    {/* 새 비밀번호 */}
                    <div>
                        <div className="flex items-center gap-4">
                            <label className="w-48">새 비밀번호 (6자 이상)</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                                autoComplete="new-password"
                            />
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-600 text-sm mt-1">{errors.newPassword}</p>
                        )}
                    </div>

                    {/* 새 비밀번호 확인 */}
                    <div>
                        <div className="flex items-center gap-4">
                            <label className="w-48">새 비밀번호 확인</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                                autoComplete="new-password"
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* 버튼 */}
                    <div className="flex justify-center gap-6 pt-6">
                        <button
                            type="submit"
                            disabled={pending}
                            className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-500 cursor-pointer disabled:opacity-50"
                        >
                            {pending ? "처리 중..." : "비밀번호 변경"}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="bg-gray-400 text-black px-6 py-2 rounded font-medium hover:bg-gray-300 cursor-pointer"
                        >
                            취소
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
