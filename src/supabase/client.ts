import {createClient} from "@supabase/supabase-js";

export const supabaseBrowser = () =>
    createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            auth: {
                persistSession: true,  // 브라우저 localStorage에 세션 저장
                autoRefreshToken: true,
                detectSessionInUrl: true,
            },
        }
    );