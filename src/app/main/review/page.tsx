import Image from "next/image";
import ReviewBoard from "@/board/reviewBoard";

export default function ReviewPage() {
    return (
        <div>
            <section className="relative bg-[#22242d] h-84 text-white">
                <Image src="/image/review_banner.jpg" alt="리뷰 배너" fill className="object-cover" />
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