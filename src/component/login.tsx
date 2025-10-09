'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import apiClient from "@/lib/apiClient";
import axios from "axios";
import {ApiError} from "@/type/errorType";

type LoginProps = {
    className?: string;
};

export default function Login({ className }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pending, setPending] = useState(false);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

        try {
            await apiClient.post<void>("/login", {
                username,
                password,
            });

            toast.success('로그인 성공!');
            router.refresh();
        } catch (err: unknown) {
            if (axios.isAxiosError<ApiError>(err)) {
                const data = err.response?.data;
                const message = data?.message ?? err.message ?? "알 수 없는 오류가 발생했습니다.";
                toast.error(`[로그인 실패] ${message}`);
            } else {
                toast.error("네트워크 오류가 발생했습니다.");
            }
        }  finally {
            setPending(false);
        }
    };

    return (
        <div className="p-2">
            <form onSubmit={onSubmit} className={`${className ?? ''}`}>
                <div className="flex">
                    <div className="flex flex-col flex-1 text-black text-xs">
                        <input
                            type="string"
                            required
                            placeholder="아이디"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.trim())}
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
