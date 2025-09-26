import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalNavigationBar from "@/component/gnb";
import LeftNavigationBar from "@/component/lnb";
import Image from "next/image";
import {Toaster} from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "보증 365",
  description: "보증된 업체 정보 안내 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <GlobalNavigationBar />
            <main className="mx-auto max-w-6xl  bg-[#191919]">
                <div className="grid md:grid-cols-4">
                    {/* 배너: 첫 번째 행 전체 폭 */}
                    <div className="relative h-40 md:h-56 md:col-span-4 bg-gray-800">
                        <Image
                            src="/image/banner.png"
                            alt="배너가 들어갈 위치"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>

                    {/* LNB: 아래 행 좌측 1/4 */}
                    <aside className="md:col-span-1 pl-2 py-2 pr-1">
                        <LeftNavigationBar />
                    </aside>

                    {/* 메인: 아래 행 우측 3/4 */}
                    <section className="md:col-span-3 min-w-0 pr-2 pl-1 py-2">
                        {children}
                    </section>
                </div>
            </main>

            <Toaster position="top-center" reverseOrder={false} />
        </body>
    </html>
  );
}
