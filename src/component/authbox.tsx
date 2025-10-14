"use client"

import Login from "@/component/login";
import Profile from "@/component/profile";
import {useCallback, useEffect, useState} from "react";
import {UserProfile} from "@/type/userType";
import {apiGet} from "@/lib/api";

export default function AuthBox() {
    const [me, setMe] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const reloadMe = useCallback(async () => {
        setLoading(true);
        const { data } = await apiGet<UserProfile>("/me");
        setMe(data ?? null);
        setLoading(false);
    }, []);

    useEffect(() => {
        reloadMe();
    }, [reloadMe]);

    return (
        <div className="h-28 w-full bg-[#212121] border-[0.5px] border-gray-100/20">
            {loading ? (
                <div className="flex items-center justify-center">
                    <p>로딩 중...</p>
                </div>
            ) : !me ? (
                <Login onLoggedIn={reloadMe} />
            ) : (
                <Profile userProfile={me} onLoggedOut={reloadMe} />
            )}
        </div>
    );
}
