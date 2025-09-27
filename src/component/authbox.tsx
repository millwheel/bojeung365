import { createSupabaseServer } from "@/supabase/server";
import Login from "@/component/login";
import Profile from "@/component/profile";

export const dynamic = "force-dynamic"; // 세션에 따라 항상 동적 렌더

export default async function AuthBox() {
    const supabase = await createSupabaseServer();
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (!session) {
        return <Login />;
    }

    return (
        <Profile
            email={session.user.email ?? "email null"}
        />
    );
}
