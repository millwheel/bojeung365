"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LeftNavigationBar from "@/component/lnb";
import { useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <div className="grid md:grid-cols-4 bg-[#191919]">
                <LeftNavigationBar />
                <section className="md:col-span-3 min-w-0 pr-2 pl-1 py-2">
                    {children}
                </section>
            </div>
        </QueryClientProvider>
    );
}