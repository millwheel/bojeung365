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
            <main className="mx-auto max-w-6xl">
                <div>
                    {/* 배너 */}
                    <div className="relative h-40 md:h-56 md:col-span-4 isolate overflow-hidden">
                        {/* 배경 이미지 (맨 뒤) */}
                        <Image
                            src="/image/header_banner.jpg"
                            alt="헤더 배너"
                            fill
                            sizes="100vw"
                            className="object-cover z-0"
                            priority
                        />

                        {/* 반투명 오버레이 (중간) */}
                        <div className="absolute inset-0 bg-black/70 z-10 pointer-events-none" />

                        {/* 텍스트 (맨 위) */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                            <h1 className="text-white text-lg md:text-2xl font-bold mb-2">
                                <span className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                                    보증365
                                </span>{" "}
                                믿을 수 있는 중개 플랫폼
                            </h1>
                            <p className="text-gray-200 text-xs md:text-sm max-w-3xl leading-relaxed">
                                제휴 사이트의 운영자와 계약을 맺고, 문제 발생 시 보증365가 사용자 피해에 개입합니다. <br />
                                보증365가 기준에 부합하는 사이트만 추천되며, 실시간 모니터링이 지속됩니다.
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </main>
        </body>
    </html>
  );
}
