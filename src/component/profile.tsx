"use client";

import toast from "react-hot-toast";
import {supabaseBrowserClient} from "@/supabase/client";
import { useRouter } from "next/navigation";

export default function Profile({ email }: { email: string; }) {
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await supabaseBrowserClient().auth.signOut();
        if (error) toast.error("로그아웃 실패");
        else {
            toast.success("로그아웃 성공!");
            router.refresh();
        }
    };

    return (
        <div className="p-2">
            <div className="flex items-center">
                <div className="flex-1 text-white text-sm">
                    <p className="font-medium">안녕하세요</p>
                    <p className="truncate text-gray-300">{email}</p>
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
