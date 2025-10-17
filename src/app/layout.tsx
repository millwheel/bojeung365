import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalNavigationBar from "@/component/gnb";
import LeftNavigationBar from "@/component/lnb";
import Image from "next/image";
import {Toaster} from "react-hot-toast";
import Footer from "@/component/footer";

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
                {children}
            </main>
            <Footer />
        </body>
    </html>
  );
}
