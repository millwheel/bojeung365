import Image from "next/image";
import ReviewBoard from "@/component/reviewBoard";

export default function ReviewPage() {
    return (
        <div>
            <section className="relative bg-[#22242d] h-72 text-white">
                <div>
                    <Image src="/image/body_banner.gif" alt="본문 배너" fill className="object-cover" />
                </div>
            </section>
            <section>
                <div className="py-2">
                    <h2 className="text-base font-bold">이용후기</h2>
                    <div className="border-b-2 border-red-500 w-full"></div>
                </div>
                <div>
                    <ReviewBoard />
                </div>
            </section>
        </div>
    );
}