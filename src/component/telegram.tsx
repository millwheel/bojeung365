import Image from "next/image";
import Link from "next/link";

export default function TelegramLink () {
    return (
        <Link
            href="https://t.me/azt9999"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative w-full h-28 overflow-hidden border-[0.5px] border-white"
        >
            <Image
                src="/image/telegram_link.jpg"
                alt="문의처 링크"
                fill
                className="object-cover"
            />
        </Link>
    );
}