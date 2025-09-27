'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import {supabaseBrowserClient} from "@/supabase/client";
import { useRouter } from "next/navigation";

type LoginProps = {
    className?: string;
    onSuccess?: (userId: string) => void;
};

export default function Login({ className, onSuccess }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

        const supabase = supabaseBrowserClient();
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        setPending(false);

        if (error) {
            toast.error('로그인에 실패했습니다. \n 아이디와 비밀번호를 확인해주세요');
            return;
        }

        toast.success('로그인 성공!');
        onSuccess?.(data.user?.id ?? '');
        router.refresh();
    };

    return (
        <div className="p-2">
            <form onSubmit={onSubmit} className={`${className ?? ''}`}>
                <div className="flex">
                    <div className="flex flex-col flex-1 text-black text-xs">
                        <input
                            type="email"
                            required
                            placeholder="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                            className="w-full border border-gray-300 bg-white px-3 py-2 outline-none"
                        />
                        <input
                            type="password"
                            required
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 bg-white px-3 py-2 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={pending}
                        className="self-stretch bg-red-600 px-4 text-white font-medium hover:bg-red-500 cursor-pointer"
                    >
                        로그인
                    </button>
                </div>
            </form>
            {/* 회원가입 버튼 */}
            <div className="mt-2 text-right">
                <button
                    type="button"
                    onClick={() => router.push('/register')}
                    className="text-xs text-gray-400 hover:text-gray-200 cursor-pointer hover:underline"
                >
                    회원가입
                </button>
            </div>
        </div>

    );
}
