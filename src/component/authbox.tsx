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

    if (loading) return (
        <div className="h-28 w-full flex items-center justify-center">
            <p>로딩 중...</p>
        </div>
    );
    if (!me) return <Login onLoggedIn={reloadMe} />;

    return <Profile userProfile={me} onLoggedOut={reloadMe} />;
}
