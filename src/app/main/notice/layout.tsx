import Image from "next/image";

export default function NoiceLayout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <section className="relative bg-[#22242d] h-84 text-white">
                <Image src="/image/notice_banner.jpg" alt="공지 배너" fill className="object-cover" />
            </section>

            <div className="py-2">
                <h2 className="text-base font-bold">공지사항</h2>
                <div className="border-b-2 border-red-500 w-full"></div>
            </div>

            <section>
                {children}
            </section>
        </div>
    );
}