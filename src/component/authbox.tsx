"use client"

import Login from "@/component/login";
import Profile from "@/component/profile";
import apiClient from "@/lib/apiClient";
import toast from "react-hot-toast";
import axios from "axios";
import {ApiError} from "@/type/errorType";
import {useEffect, useState} from "react";
import {UserProfile} from "@/type/userType";

export default function AuthBox() {
    const [me, setMe] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const { data } = await apiClient.get<UserProfile>("/me");
                setMe(data);
            } catch (err: unknown) {
                if (axios.isAxiosError<ApiError>(err)) {
                    const message =
                        err.response?.data?.message ?? err.message ?? "알 수 없는 오류";
                    toast.error(`[불러오기 실패] ${message}`);
                } else {
                    toast.error("네트워크 오류가 발생했습니다.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMe();
    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (!me) {
        return <Login />;
    }

    return <Profile userProfile={me} />;
}
