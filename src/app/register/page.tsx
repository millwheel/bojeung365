'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import apiClient from "@/lib/apiClient";
import {ApiError} from "@/type/errorType";

type SignUpRequest = {
    username: string;
    password: string;
    nickname: string;
};

export default function RegisterPage() {
    const [username, setUsername] = useState(""); // 이메일 → 아이디
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [pending, setPending] = useState(false);

    const [errors, setErrors] = useState<{
        username?: string;
        password?: string;
        confirmPassword?: string;
        nickname?: string;
    }>({});

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmedUsername = username.trim();
        const trimmedNickname = nickname.trim();

        if (/\s/.test(trimmedUsername)) {
            setErrors({ username: "아이디에는 공백을 포함할 수 없습니다." });
            return;
        }
        if (password.length < 6) {
            setErrors({ password: "비밀번호는 6자 이상이어야 합니다." });
            return;
        }
        if (password !== confirmPassword) {
            setErrors({ confirmPassword: "비밀번호가 일치하지 않습니다." });
            return;
        }

        setErrors({});
        setPending(true);
        try {
            await apiClient.post<void>("/sign-up", {
                username: trimmedUsername,
                password,
                nickname: trimmedNickname,
            });

            toast.success("회원가입 성공!");
            router.push("/");
        } catch (err: unknown) {
            if (axios.isAxiosError<ApiError>(err)) {
                const data = err.response?.data;
                const message = data?.message ?? err.message ?? "알 수 없는 오류가 발생했습니다.";
                toast.error(`[회원가입 실패] ${message}`);
            } else {
                toast.error("네트워크 오류가 발생했습니다.");
            }
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="flex justify-center items-center bg-[#212121]">
            <Toaster position="top-center" />
            <div className="my-10 w-full flex flex-col items-center">
                <form
                    onSubmit={onSubmit}
                    className="bg-white text-black p-8 rounded shadow-md w-full max-w-xl space-y-6 text-base"
                >
                    <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>

                    {/* 아이디 입력 */}
                    <div>
                        <div className="flex items-center gap-4">
                            <label className="w-48">아이디</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                                autoComplete="username"
                            />
                        </div>
                        {errors.username && (
                            <p className="text-red-600 text-sm mt-1">{errors.username}</p>
                        )}
                    </div>

                    {/* 비밀번호 */}
                    <div>
                        <div className="flex items-center gap-4">
                            <label className="w-48">비밀번호 (6자 이상)</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                                autoComplete="new-password"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* 비밀번호 확인 */}
                    <div>
                        <div className="flex items-center gap-4">
                            <label className="w-48">비밀번호 확인</label>
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

                    {/* 닉네임 입력 */}
                    <div>
                        <div className="flex items-center gap-4">
                            <label className="w-48">닉네임</label>
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                required
                                className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                                autoComplete="nickname"
                            />
                        </div>
                        {errors.nickname && (
                            <p className="text-red-600 text-sm mt-1">{errors.nickname}</p>
                        )}
                    </div>

                    {/* 버튼 */}
                    <div className="flex justify-center gap-6 pt-6">
                        <button
                            type="submit"
                            disabled={pending}
                            className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-500 cursor-pointer disabled:opacity-50"
                        >
                            {pending ? "처리 중..." : "회원가입"}
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
