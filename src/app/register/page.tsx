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
                role: UserRole.Member, // NOTE: 자동 MEMBER 지정
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
        <div className="flex justify-center items-center bg-[#191919]">
            <form
                onSubmit={onSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-3"
            >
                <h1 className="text-xl font-bold text-center">회원가입</h1>

                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    required
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none"
                />

                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none"
                />

                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none"
                />

                <input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none"
                />

                <input
                    type="text"
                    placeholder="닉네임"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                    className="w-full border border-gray-300 px-3 py-2 text-sm outline-none"
                />

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full bg-red-600 text-white py-2 font-medium hover:bg-red-500 disabled:opacity-50"
                >
                    {pending ? "가입 중..." : "회원가입"}
                </button>
            </form>
        </div>
    );
}