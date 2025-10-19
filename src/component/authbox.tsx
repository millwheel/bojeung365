"use client"

import Login from "@/component/login";
import Profile from "@/component/profile";
import {useMe} from "@/hook/useMe";

export default function AuthBox() {
    const { me, isLoading, refreshMe } = useMe();

    return (
        <div className="h-28 w-full bg-[#212121] border-[0.5px] border-gray-100/20">
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <p>로딩 중...</p>
                </div>
            ) : !me ? (
                <Login onLoggedIn={refreshMe} />
            ) : (
                <Profile userProfile={me} onLoggedOut={refreshMe} />
            )}
        </div>
    );
}
