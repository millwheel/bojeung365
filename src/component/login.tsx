'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { supabaseBrowser } from '@/supabase/client';

type LoginProps = {
    className?: string;
    onSuccess?: (userId: string) => void; // 성공 시 후처리(선택)
};

export default function Login({ className, onSuccess }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        const supabase = supabaseBrowser();

        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        setPending(false);

        if (error) {
            toast.error(error.message || '로그인에 실패했습니다.');
            return;
        }

        // 성공 토스트 + 콜백
        toast.success('로그인 성공!');
        onSuccess?.(data.user?.id ?? '');
    };

    return (
        <form onSubmit={onSubmit} className={className}>
            <div className="space-y-3">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">이메일</label>
                    <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                        className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium">비밀번호</label>
                    <input
                        type="password"
                        required
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className="w-full rounded bg-black px-4 py-2 text-white disabled:opacity-60"
                >
                    {pending ? '로그인 중…' : '로그인'}
                </button>
            </div>
        </form>
    );
}