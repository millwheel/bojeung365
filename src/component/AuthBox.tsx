"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/supabase/api";
import Login from "@/component/login";
import toast from "react-hot-toast";
import {Session} from "@supabase/auth-js";

export default function AuthBox() {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const supabase = supabaseClient();

        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        const supabase = supabaseClient();
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error("로그아웃 실패");
            return;
        }
        toast.success("로그아웃 성공!");
    };

    if (session) {
        return (
            <div className="p-2">
                <button
                    onClick={handleLogout}
                    className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600 cursor-pointer"
                >
                    로그아웃
                </button>
            </div>
        );
    }

    return <Login />;
}
