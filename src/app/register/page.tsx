'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { supabaseBrowserClient } from "@/supabase/client";
import { UserRole } from "@/data/userType";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [pending, setPending] = useState(false);

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("비밀번호가 일치하지 않습니다.");
            return;
        }

        setPending(true);
        const supabase = supabaseBrowserClient();

        // 1. Supabase Auth 회원가입
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            toast.error(`회원가입 실패: ${signUpError.message}`);
            setPending(false);
            return;
        }

        const userId = signUpData.user?.id;
        if (!userId) {
            toast.error("사용자 ID 생성 실패");
            setPending(false);
            return;
        }

        // 2. user_profile 테이블에 insert
        const { error: profileError } = await supabase
            .from("user_profile")
            .insert({
                uid: userId,
                name,
                nickname,
                role: UserRole.Member,
            });

        setPending(false);

        if (profileError) {
            toast.error(`프로필 저장 실패: ${profileError.message}`);
            return;
        }

        toast.success("회원가입 성공! 로그인 해주세요.");
        router.push("/");
    };

    return (
        <div className="flex justify-center items-center bg-[#212121]">
            <div className="my-5 w-full flex flex-col items-center">
                <form
                    onSubmit={onSubmit}
                    className="bg-white text-black p-8 rounded shadow-md w-full max-w-xl space-y-6 text-base"
                >
                    <h1 className="text-2xl font-bold text-center mb-6">회원가입</h1>

                    <div className="flex items-center gap-4">
                        <label className="w-28">이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                            required
                            className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-28">비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-28">비밀번호 확인</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-28">이름</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="w-28">닉네임</label>
                        <input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                            className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="flex justify-center gap-6 pt-6">
                        <button
                            type="submit"
                            disabled={pending}
                            className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-500 cursor-pointer disabled:opacity-50"
                        >
                            회원가입
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
