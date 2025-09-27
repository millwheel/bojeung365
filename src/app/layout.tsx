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
                    {/* 배너 */}
                    <div className="relative h-40 md:h-56 md:col-span-4 bg-gray-800">
                        {/*<Image*/}
                        {/*    src="/image/banner.png"*/}
                        {/*    alt="배너 배경 사진"*/}
                        {/*    fill*/}
                        {/*    className="object-cover rounded-lg"*/}
                        {/*/>*/}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/40">
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
