"use client"

import Login from "@/component/login";
import Profile from "@/component/profile";
import apiClient from "@/lib/apiClient";
import {useCallback, useEffect, useState} from "react";
import {UserProfile} from "@/type/userType";

export default function AuthBox() {
    const [me, setMe] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const reloadMe = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await apiClient.get<UserProfile>("/me");
            setMe(data);
        } catch (err: unknown) {
            setMe(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        reloadMe();
    }, [reloadMe]);

    if (loading) return <div>로딩 중...</div>;
    if (!me) return <Login onLoggedIn={reloadMe} />;

    return <Profile userProfile={me} onLoggedOut={reloadMe} />;
}
