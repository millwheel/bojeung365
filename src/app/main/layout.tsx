import LeftNavigationBar from "@/component/lnb";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid md:grid-cols-4">
            {/* LNB */}
            <aside className="md:col-span-1 pl-2 py-2 pr-1">
                <LeftNavigationBar />
            </aside>

            {/* 메인 컨텐츠 */}
            <section className="md:col-span-3 min-w-0 pr-2 pl-1 py-2">
                {children}
            </section>
        </div>
    );
}
