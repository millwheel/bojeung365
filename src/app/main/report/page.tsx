import Image from "next/image";


export default function ReportPage() {
    return (
        <div>
            <section className="relative bg-[#22242d] h-84 text-white">
                <Image src="/image/report_banner.jpg" alt="신고 배너" fill className="object-cover" />
            </section>
            <section>
                <div className="py-2">
                    <h2 className="text-base font-bold">먹튀신고</h2>
                    <div className="border-b-2 border-red-500 w-full"></div>
                </div>
                <div>
                    게시판
                </div>
            </section>
        </div>
    );
}