import Image from "next/image";

export default function NoiceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <section className="relative bg-[#22242d] h-84 text-white">
                <Image src="/image/event_banner.jpg" alt="이벤트 배너" fill className="object-cover" />
            </section>
            <section>
                <div className="py-2">
                    <h2 className="text-base font-bold">이벤트</h2>
                    <div className="border-b-2 border-red-500 w-full"></div>
                </div>
                {children}
            </section>
        </div>
    );
}