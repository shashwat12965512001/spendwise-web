"use client";

import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Profile from "@/components/Profile";
import SpendCategories from "@/components/SpendCategories";
import ToggleSwitch from "@/components/ToogleSwitch";
import API_BASE_URL from "../utils/apiConfig";
import Sidebar from "@/components/Sidebar";

export default () => {
    useAuth();

    const [selectedTab, setSelectedTab] = useState("general");
    const [settings, setSettings] = useState({
        enableNotifications: true,
        smartSpendingNotifications: false,
        dailySummary: false,
        weeklySummary: true,
        hideDefaultSMSNotifications: false,
    });
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

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
    const saveNotificationSettings = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/settings/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "bypass-tunnel-reminder": "true",
                },
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
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer" onClick={saveNotificationSettings}>Save Changes</button>
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

    return (
        <>
            <div className="container max-w-screen-xl flex flex-row items-start justify-between mx-auto p-4">
                <button id="sidebar-responsive-btn" className="lg:hidden p-3 bg-gray-700 text-white fixed top-16 left-0 z-50"
                    onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>

                <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className="content w-3/4 p-6 bg-white shadow rounded-lg">
                    <ul>
                        {renderContent()}
                    </ul>
                </div>
            </div>
        </>
    );
}
