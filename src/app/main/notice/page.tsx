import Image from "next/image";
import NoticeBoard from "@/component/noticeBoard";

export default function NoticePage() {
    return (
        <div>
            <section className="relative bg-[#22242d] h-72 text-white">
                <div>
                    <Image src="/image/body_banner.gif" alt="본문 배너" fill className="object-cover" />
                </div>
            </section>
            <section>
                <div className="py-2">
                    <h2 className="text-base font-bold">공지사항</h2>
                    <div className="border-b-2 border-red-500 w-full"></div>
                </div>
                <div>
                    <NoticeBoard />
                </div>
            </section>
        </div>
    );
}