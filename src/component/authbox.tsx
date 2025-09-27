import { supabaseServerClient } from "@/supabase/server";
import Login from "@/component/login";
import Profile from "@/component/profile";

export default async function AuthBox() {
    const supabase = await supabaseServerClient();
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
