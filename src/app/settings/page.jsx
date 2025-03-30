"use client";

import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from 'next/navigation';
import Profile from "@/Components/Profile";
import SpendCategories from "@/Components/SpendCategories";
import ToggleSwitch from "@/Components/ToogleSwitch";
import API_BASE_URL from "../utils/apiConfig";

export default () => {
    useAuth();

    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState("general");
    const [settings, setSettings] = useState({
        enableNotifications: true,
        smartSpendingNotifications: false,
        dailySummary: false,
        weeklySummary: true,
        hideDefaultSMSNotifications: false,
    });
    const [user, setUser] = useState(null);

    // ✅ Fetch settings from backend
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

    // ✅ Fetch user from localStorage on client-side only
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            setUser(storedUser);
        }
    }, []);

    // Handle individual toggle updates
    const handleToggle = (key, value) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    // Function to save changes (send to backend)
    const saveNotificationSettins = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/settings/save`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    settings: settings,
                }),
            });
            if (!response.ok) console.log("Failed to save settings: " + response.error);
            console.log("Settings updated successfully!");
        } catch (error) {
            console.log("Error updating settings: " + error.message);
        }
    };

    const renderContent = () => {
        switch (selectedTab) {
            case "general":
                return (
                    <>
                        <Profile />
                        <hr className="border-gray-300 my-4" />
                        <SpendCategories />
                        <hr className="border-gray-300 my-4" />
                    </>
                );
            case "security":
                return (
                    <>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                            <p>
                                Update your security settings, passwords, and login details.
                            </p>
                        </div>
                        <hr className="border-gray-300 my-4" />
                    </>
                );
            case "notifications":
                return (
                    <>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
                            <p>
                                Manage your email, push, and SMS notification preferences.
                            </p>
                        </div>
                        <hr className="border-gray-300 my-4" />
                        {/* Enable Notifications */}
                        <ToggleSwitch label="Enable Notifications" initialState={settings.enableNotifications}
                            onToggle={(value) => handleToggle("enableNotifications", value)} />
                        <hr className="border-gray-300 my-4" />
                        {/* Smart Spending Notifications */}
                        <ToggleSwitch label="Smart Spending Notifications" initialState={settings.smartSpendingNotifications}
                            onToggle={(value) => handleToggle("smartSpendingNotifications", value)} />
                        <hr className="border-gray-300 my-4" />
                        {/* Daily Summary */}
                        <ToggleSwitch label="Daily Summary" initialState={settings.dailySummary}
                            onToggle={(value) => handleToggle("dailySummary}", value)} />
                        <hr className="border-gray-300 my-4" />
                        {/* Weekly Summary */}
                        <ToggleSwitch label="Weekly Summary" initialState={settings.weeklySummary}
                            onToggle={(value) => handleToggle("weeklySummary}", value)} />
                        <hr className="border-gray-300 my-4" />
                        {/* Hide Default SMS Notifications */}
                        <ToggleSwitch label="Hide Default SMS Notifications" initialState={settings.hideDefaultSMSNotifications}
                            onToggle={(value) => handleToggle("hideDefaultSMSNotifications}", value)} />
                        <hr className="border-gray-300 my-4" />
                        <div className="flex justify-end">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" onClick={saveNotificationSettins}>Save Changes</button>
                        </div>
                    </>
                );
            default:
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
                        <p>
                            Manage your general account settings, preferences, and more.
                        </p>
                    </div>
                );
        }
    };

    const GeneralIcon = () => (
        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
        </svg>
    );

    const SecurityIcon = () => (
        <svg className="h-6 w-6 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="3" />  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
    );

    const NotificationsIcon = () => (
        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 21">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"></path>
        </svg>
    );

    const LogoutIcon = () => (
        <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"></path>
        </svg>
    );

    const handleLogout = () => {

        // Remove user data and token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');

        // Redirect to login page
        router.push('/login');
    };

    return (
        <>
            <div className="container max-w-screen-xl flex flex-row items-start justify-between mx-auto p-4">
                <div className="sidebar w-1/4 bg-gray-200 p-4 rounded-lg">
                    <ul>
                        {[
                            {
                                key: "general", label: "General", icon: <GeneralIcon />
                            },
                            {
                                key: "security", label: "Security", icon: <SecurityIcon />
                            },
                            {
                                key: "notifications", label: "Notifications", icon: <NotificationsIcon />
                            },
                            {
                                key: "logout", label: "Logout", icon: <LogoutIcon />
                            },
                        ].map(({ key, label, icon }) => (
                            <li
                                key={key}
                                className={`flex gap-4 p-4 cursor-pointer rounded-xl transition ${selectedTab === key
                                    ? "bg-gray-400"
                                    : ""
                                    }`}
                                onClick={key == "logout" ? handleLogout : () => setSelectedTab(key)}
                            >
                                {icon}
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="content w-3/4 p-6 bg-white shadow rounded-lg">
                    <ul>
                        {renderContent()}
                    </ul>
                </div>
            </div>
        </>
    );
}
