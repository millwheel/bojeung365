import { supabaseServerClient } from "@/supabase/server";
import Login from "@/component/login";
import Profile from "@/component/profile";
import apiClient from "@/lib/apiClient";
import toast from "react-hot-toast";
import axios from "axios";
import {ApiError} from "@/type/errorType";

export default async function AuthBox() {
//     const supabase = await supabaseServerClient();
//     const { data } = await supabase.auth.getSession();
//     const session = data.session;

    // TODO getMe 호출 로직 추가

    if (!session) {
        return <Login />;
    }

    return (
        <Profile
            email={session.user.email ?? "email null"}
        />
    );
}
