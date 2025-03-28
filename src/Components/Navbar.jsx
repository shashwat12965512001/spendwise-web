"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname(); // Get current route

    // Navigation items
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Transactions", path: "/transactions" },
        { name: "Settings", path: "/settings" },
    ];

    return (
        <div className="hidden w-full md:block md:w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            href={item.path}
                            className={`block py-2 px-3 rounded-sm md:p-0 transition-all ${pathname === item.path
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
    );
}
