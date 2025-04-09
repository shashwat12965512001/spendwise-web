"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TopBar from "./TopBar";

export default function Header() {
    const pathname = usePathname();
    const isMobile = useIsMobile();

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Transactions", path: "/transactions" },
        { name: "Settings", path: "/settings" },
    ];

    return (
        <>
            {
                isMobile ? (
                    <TopBar />
                ) : (
                    <nav className="hidden md:block bg-white border-gray-200 dark:bg-gray-900">
                        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                            {/* Logo */}
                            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                    Spendwise
                                </span>
                            </a>

                            {/* Desktop Menu */}
                            <ul className="flex space-x-6 font-medium">
                                {navItems.map((item) => (
                                    <li key={item.path}>
                                        <Link
                                            href={item.path}
                                            className={`transition-all px-4 py-2 rounded-md ${pathname === item.path
                                                ? "bg-blue-700 text-white md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
                                                : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:text-blue"
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                )
            }
        </>
    );
}
