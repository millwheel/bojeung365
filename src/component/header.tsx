"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

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
        <header className="w-full bg-[#222222] border-b border-black/10">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-center px-4">

                {/* 데스크톱 GNB - 768px 이상에서만 표시 */}
                <nav className="hidden sm:flex items-center gap-8">
                    {NAV.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    lg:px-3 py-2
                                    md:px-2 
                                    px-1
                                    text-sm md:text-base lg:text-lg
                                    font-medium 
                                    rounded-lg transition-colors
                                    whitespace-nowrap
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

                {/* 모바일 햄버거 - 768px 미만에서만 표시 */}
                <button
                    className="sm:hidden p-2 rounded-lg hover:bg-black/10"
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

            {/* 모바일 메뉴 */}
            {open && (
                <>
                    <div
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setOpen(false)}
                    />
                    <nav className="fixed right-0 top-14 w-72 z-50 rounded-l-2xl border border-black/10 bg-white p-3 shadow-2xl">
                        {NAV.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        block px-3 py-2 
                                        text-base font-medium text-center 
                                        rounded-lg transition-colors
                                        ${active
                                        ? "text-yellow-500"
                                        : "text-black hover:text-yellow-500"
                                    }
                                    `}
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </>
            )}
        </header>
    );
}