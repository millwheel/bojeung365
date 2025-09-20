"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const NAV = [
    { label: "공식보증업체", href: "/official" },
    { label: "테더보증업체", href: "/tether" },
    { label: "블랙리스트", href: "/blacklist" },
    { label: "먹튀신고", href: "/report" },
    { label: "이벤트", href: "/events" },
    { label: "이용후기", href: "/reviews" },
    { label: "공지사항", href: "/notices" },
];

export default function GlobalNavigationBar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <header className="w-full border-b border-black/10">
            <div className="bg-[#111111] h-16 flex items-center justify-center px-4 relative">
                <Link href="/">
                    <h1 className="text-3xl md:text-4xl">
                        보증 365
                    </h1>
                </Link>

                {/* 모바일 햄버거 */}
                <button
                    className="sm:hidden p-2 rounded-lg hover:bg-black/10 absolute right-4"
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
                    aria-expanded={open}
                >
                    {open ? (
                        <XMarkIcon className="w-6 h-6 text-white" />
                    ) : (
                        <Bars3Icon className="w-6 h-6 text-white" />
                    )}
                </button>
            </div>

            <div className="bg-[#222222] hidden sm:flex mx-auto h-14 items-center justify-center px-4">
                <nav className="flex items-center gap-4 md:gap-8 lg:gap-12">
                    {NAV.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    text-sm md:text-base lg:text-lg
                                    font-medium 
                                    transition-colors
                                    ${active
                                                ? "text-yellow-500"
                                                : "text-white hover:text-yellow-500"
                                            }
                                `}
                                aria-current={active ? "page" : undefined}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* 모바일 메뉴 */}
            {open && (
                <>
                    <div
                        className="fixed inset-0 bg-black/30 z-30"
                        onClick={() => setOpen(false)}
                    />
                    <nav className="fixed right-0 top-16 w-full z-50 rounded-l-2xl border bg-[#222222] border-black/10 p-5 shadow-2xl">
                        <div className="flex flex-col space-y-10">
                            {NAV.map((item) => {
                                const active = pathname === item.href;
                                return (
                                    <div key={item.href} className="flex items-center justify-center w-full">
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`block w-48 text-base font-medium text-center rounded-lg transition-colors
                                                ${active
                                                    ? "text-yellow-500"
                                                    : "text-white hover:text-yellow-500"
                                                }
                                            `}
                                            onClick={() => setOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </nav>
                </>
            )}
        </header>
    );
}