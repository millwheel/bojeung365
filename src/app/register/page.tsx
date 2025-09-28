'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
import { supabaseBrowserClient } from "@/supabase/client";
import { UserRole } from "@/data/userType";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [pending, setPending] = useState(false);

    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        confirmPassword?: string;
        nickname?: string;
    }>({});

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrors({ confirmPassword: "비밀번호가 일치하지 않습니다." });
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
            setPending(false);
            if (signUpError.message.includes("character")) {
                setErrors({ password: "패스워드는 6자 이상이어야합니다."});
                return;
            }
            if (signUpError.message.includes("Email address")) {
                setErrors({ email: "유효하지 않는 이메일입니다."});
                return;
            }
            toast.error(`회원가입 실패: ${signUpError.message}`);
            return;
        }

        const userId = signUpData.user?.id;
        if (!userId) {
            toast.error("사용자 ID 생성 실패");
            setPending(false);
            return;
        }

        toast.success("회원가입 성공! 로그인 해주세요.");
        router.push("/");
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

                    <div>
                        <div className="flex items-center gap-4">
                            <label className="w-48">이메일</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value.trim())}
                                required
                                className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                            />
                        </div>
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <div className="flex items-center gap-4">
                            <label className="w-48">비밀번호 (6자 이상)</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                            />
                        </div>
                        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <div className="flex items-center gap-4">
                            <label className="w-48">비밀번호 확인</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="flex-1 border border-gray-300 px-4 py-2 outline-none"
                            />
                        </div>
                        {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
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
