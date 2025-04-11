'use client';

import Link from 'next/link';
import API_BASE_URL from "@/app/utils/apiConfig";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    ChartBarIcon,
    UserIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export default function BottomNav() {
    const pathname = usePathname();
    const [user, setUser] = useState(null);
    const navItems = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Transactions', href: '/transactions', icon: ChartBarIcon },
        { name: 'Profile', href: '/profile', icon: UserIcon },
        { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    ];
    const [settings, setSettings] = useState({
        enableNotifications: false,
        smartSpendingNotifications: false,
        dailySummary: false,
        weeklySummary: false,
        hideDefaultSMSNotifications: false,
        darkMode: false,
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/settings/get/${user && user.id || "67e5243891c1b8d5efd524d6"}`); // Replace with your actual API route
                if (!response.ok) throw new Error("Failed to fetch settings");
                const data = await response.json();
                setSettings(data);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchSettings();
    }, []);

    return (
        <nav className={`fixed bottom-0 w-full bg-white border-t ${settings.darkMode ? "dark:bg-gray-900 border-gray-400" : "border-white"} flex justify-around py-2 z-50`}>
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex flex-col items-center text-sm ${isActive ? 'text-indigo-600' : 'text-gray-500'
                            }`}
                    >
                        <Icon className="h-6 w-6 mb-1" />
                        <span className="text-xs">{item.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
