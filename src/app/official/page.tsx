import Image from "next/image";

export default function OfficialPage() {
    return (
        <div>
            <section className="relative bg-[#22242d] h-60 text-white">
                <div>
                    <Image src="/image/banner.gif" alt="공식업체 배너" fill className="object-cover" />
                </div>
            </section>
            <section>
                <div className="py-2">
                    <h2 className="text-base font-bold">공식보증업체</h2>
                    <div className="border-b-2 border-red-500 w-full"></div>
                </div>
                <div>
                    게시판
                </div>
            </section>
        </div>
    );
}