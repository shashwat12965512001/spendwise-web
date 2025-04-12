"use client";

import API_BASE_URL from "@/app/utils/apiConfig";
import { useEffect, useState } from "react";

export default function TopBar() {

    const [user, setUser] = useState(null);
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
        <>
            <div className={`w-full bg-white border-b ${settings.darkMode ? "dark:bg-gray-900 border-white" : "border-gray-400"} shadow px-4 py-5`}>
                <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                    <h1 className={`text-xl font-semibold text-gray-900 ${settings.darkMode ? "dark:text-white" : ""}`}>
                        <img className="w-50" src={`/assets/img/app_logo_${settings.darkMode ? "light" : "dark"}.png`} alt="Spendwise" />
                    </h1>
                </div>
            </div>
        </>
    );
}
