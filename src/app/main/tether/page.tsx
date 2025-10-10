import Image from "next/image";


export default function TetherPage() {
    return (
        <div>
            <section className="relative bg-[#22242d] h-84 text-white">
                <Image src="/image/tether_banner.gif" alt="테더업체 배너" fill />
            </section>
            <section>
                <div className="py-2">
                    <h2 className="text-base font-bold">테더보증업체</h2>
                    <div className="border-b-2 border-red-500 w-full"></div>
                </div>
                <div>
                    게시판
                </div>
            </section>
        </div>
    );
}