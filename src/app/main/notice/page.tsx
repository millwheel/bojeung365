import Image from "next/image";
import NoticeBoard from "@/component/noticeBoard";

export default function NoticePage() {
    return (
        <div>
            <section className="relative bg-[#22242d] h-84 text-white">
                <Image src="/image/notice_banner.jpg" alt="공지 배너" fill className="object-cover" />
            </section>
            <section>
                <div className="py-2">
                    <h2 className="text-base font-bold">공지사항</h2>
                    <div className="border-b-2 border-red-500 w-full"></div>
                </div>
                <NoticeBoard />
            </section>
        </div>
    );
}