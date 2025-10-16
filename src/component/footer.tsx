import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative w-full max-w-6xl mx-auto mt-10 mb-6 aspect-[12/5] px-4">
            <Image
                src="/image/footer.jpg"
                alt="footer_image"
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover rounded-lg shadow-md"
                priority
            />
        </footer>
    );
}