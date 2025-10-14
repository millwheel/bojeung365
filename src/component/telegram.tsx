import Image from "next/image";

export default function TelegramLink () {
    return (
        <div className="relative w-full h-28 overflow-hidden border-[0.5px] border-white">
            <Image
                src="/image/telegram_link.jpg"
                alt="문의처 링크"
                fill
                className="object-cover"
            />
        </div>
    );
}