"use client";

import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Profile from "@/components/Profile";
import SpendCategories from "@/components/SpendCategories";
import ToggleSwitch from "@/components/ToogleSwitch";
import API_BASE_URL from "../utils/apiConfig";
import Sidebar from "@/components/Sidebar";
import useIsMobile from "../hooks/useIsMobile";
import SettingsMobile from "@/components/SettingsMobile";

export default () => {
    useAuth();

    const isMobile = useIsMobile();

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
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [password, setPassword] = useState({
        current_password: "",
        new_password: "",
    });
    const [loginHistory, setLoginHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = user?.id;

    // ✅ Fetch settings from backend
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/settings/get/${user && user.id || "67e5243891c1b8d5efd524d6"}`); // Replace with your actual API route
                if (!response.ok) throw new Error("Failed to fetch settings");
                const data = await response.json();
                console.log("data: " + JSON.stringify(data));
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

    // ✅ Fetch login history
    useEffect(() => {
        const fetchLoginHistory = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/users/${userId}/login-history`);
                const data = await res.json();

                if (res.ok) {
                    setLoginHistory(data.loginHistory || []);
                    setLoading(false);
                } else {
                    console.log(data.error || "Failed to load login history.");
                }
            } catch (err) {
                console.error(err);
            }
        };

        if (userId) fetchLoginHistory();
    }, [userId]);

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
                },
                body: JSON.stringify({
                    userId: user.id,
                    settings: settings,
                }),
            });
            if (!response.ok) console.log("Failed to save settings: " + response.error);
            alert("Settings updated successfully!");
        } catch (error) {
            console.log("Error updating settings: " + error.message);
        }
    };

    const openModal = (id) => {
        console.log("openModal called with id:", id);
        const modal = document.getElementById(id);
        modal?.classList.remove('hidden');
        modal?.classList.add('flex'); // If you're using flexbox to center
    };

    const closeModal = (id) => {
        console.log("closeModal called with id:", id);
        const modal = document.getElementById(id);
        modal?.classList.remove('flex');
        modal?.classList.add('hidden');
    };

    const handleChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/update-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(password),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error);
                return;
            }
            setSuccess(data.message);
            setError(false);
            document.getElementById("logout").click();
        } catch (error) {
            console.error("Error updating password:", error);
        }
    }

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
                        <div id="spendwise-change-password" tabIndex="-1" className="bg-gray-400 bg-opacity-50 hidden overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
                            <div className="relative p-4 w-full max-w-md max-h-full">
                                <div className="relative bg-white rounded-lg shadow-sm">
                                    {/* Modal header */}
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Change Password
                                        </h3>
                                        <button onClick={() => closeModal("spendwise-change-password")} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    {/* Modal body */}
                                    <div className="p-5 md:p-5">
                                        <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                                            <div>
                                                <label htmlFor="current_password" className="block mb-2 text-sm font-medium text-gray-900">Current Password</label>
                                                <input type="password" onChange={handleChange} name="current_password" id="current_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                            </div>
                                            <div>
                                                <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                                <input type="password" onChange={handleChange} name="new_password" id="new_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                            </div>
                                            <div>
                                                <label htmlFor="confirm-new-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm New Password</label>
                                                <input type="password" name="confirm-new-password" id="confirm-new-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e) => {
                                                    // check with password and confirm password
                                                    const newPassword = document.getElementById("new_password").value;
                                                    const confirmPassword = e.target.value;
                                                    if (newPassword !== confirmPassword) {
                                                        setError("Passwords do not match");
                                                    } else {
                                                        setError(false);
                                                    }
                                                }} required />
                                            </div>
                                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">Update</button>
                                            {/* Error Message */}
                                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                                            {/* Success Message */}
                                            {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Settings Section */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                            <p>
                                Update your security settings, passwords, and login details.
                            </p>
                        </div>

                        <hr className="border-gray-300 my-4" />

                        {/* Change Password */}
                        <div className="flex flex-row justify-between">
                            <p className="text-md font-semibold">Change Password</p>
                            <button onClick={() => openModal("spendwise-change-password")} className="bg-gray-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer">Change</button>
                        </div>

                        <hr className="border-gray-300 my-4" />

                        {/* Two-Factor Authentication */}
                        <div className="flex flex-row justify-between">
                            <p className="text-md font-semibold">Two-Factor Authentication</p>
                            <button className="bg-gray-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer">Enable</button>
                        </div>

                        <hr className="border-gray-300 my-4" />

                        {/* Security Questions */}
                        <div className="flex flex-row justify-between">
                            <p className="text-md font-semibold">Security Questions</p>
                            <button className="bg-gray-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer">Update</button>
                        </div>

                        <hr className="border-gray-300 my-4" />

                        {/* Login History */}
                        <div className="flex flex-row justify-between">
                            <p className="text-md font-semibold">Login History</p>
                            <button className="bg-gray-900 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer" onClick={(e) => {
                                const loginHistoryElement = document.getElementById("login-history");
                                loginHistoryElement.classList.contains("hidden") ? loginHistoryElement.classList.remove('hidden') : loginHistoryElement.classList.add('hidden');
                                e.target.textContent = e.target.textContent === "View" ? "Hide" : "View";
                            }}>View</button>
                        </div>
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
                            onToggle={(value) => handleToggle("dailySummary", value)} />
                        <hr className="border-gray-300 my-4" />
                        {/* Weekly Summary */}
                        <ToggleSwitch label="Weekly Summary" initialState={settings.weeklySummary}
                            onToggle={(value) => handleToggle("weeklySummary", value)} />
                        <hr className="border-gray-300 my-4" />
                        {/* Hide Default SMS Notifications */}
                        <ToggleSwitch label="Hide Default SMS Notifications" initialState={settings.hideDefaultSMSNotifications}
                            onToggle={(value) => handleToggle("hideDefaultSMSNotifications", value)} />
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
            {
                isMobile ? (
                    <>
                        <SettingsMobile />
                    </>
                ) : (
                    <div className="container max-w-screen-xl flex flex-row items-start justify-between mx-auto p-4">
                        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} isOpen={isOpen} setIsOpen={setIsOpen} />
                        <div className="flex flex-col items-center justify-center w-full">
                            <div className="content w-3/4 p-6 bg-white shadow rounded-lg">
                                <ul>
                                    {renderContent()}
                                </ul>
                            </div>
                            <div id="login-history" className="w-3/4 p-6 rounded-lg hidden">
                                {/* Table */}
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
                                            Login History
                                            <p className="mt-1 text-sm font-normal text-gray-500">View your recent login history, including dates, times, and locations.</p>
                                        </caption>
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Device
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Location
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Time
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                                                </tr>
                                            ) : error ? (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 text-center text-red-500">{error}</td>
                                                </tr>
                                            ) : loginHistory.length === 0 ? (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-400">No login history found.</td>
                                                </tr>
                                            ) : (
                                                loginHistory.map((entry, index) => {
                                                    const date = new Date(entry.date);
                                                    const formattedDate = date.toLocaleDateString();
                                                    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                    return (
                                                        <tr key={index} className="bg-white border-b">
                                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                                {entry.device || "Unknown"}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {entry.location || "Unknown"}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {formattedDate}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {formattedTime}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                            {/* <tr className="bg-white border-b">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                Desktop
                                            </th>
                                            <td className="px-6 py-4">
                                                Home
                                            </td>
                                            <td className="px-6 py-4">
                                                2023-08-15
                                            </td>
                                            <td className="px-6 py-4">
                                                10:00 AM
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="font-medium text-blue-600 hover:underline cursor-pointer">View</button>
                                            </td>
                                        </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}
