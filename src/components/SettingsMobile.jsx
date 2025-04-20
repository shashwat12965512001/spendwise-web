"use client";

import API_BASE_URL from "@/app/utils/apiConfig";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loginHistory, setLoginHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState({
        current_password: "",
        new_password: "",
    });
    const [settings, setSettings] = useState({
        enableNotifications: false,
        smartSpendingNotifications: false,
        dailySummary: false,
        weeklySummary: false,
        hideDefaultSMSNotifications: false,
        darkMode: false,
    });
    const userId = user?.id;

    useEffect(() => {
        // This runs only on the client side
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse JSON if stored as an object
        }
    }, []);

    useEffect(() => {
        const fetchLoginHistory = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/users/${userId}/login-history`);
                const data = await res.json();

                if (res.ok) {
                    setLoginHistory(data.loginHistory || []);
                    setLoading(false);
                } else {
                    setError(data.error || "Failed to fetch login history");
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
            }
        };

        if (userId) fetchLoginHistory();
    }, [userId]);

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

    useEffect(() => {
        if (settings.darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [settings.darkMode]);

    function SettingItem({ label, btn_label, onclick }) {
        return (
            <div className="flex justify-between text-sm items-center py-2 border-b border-gray-200">
                <span className={`text-gray-700`}>{label}</span>
                <button className="text-blue-500 text-sm cursor-pointer" onClick={onclick}>{btn_label}</button>
            </div>
        );
    }

    function ToggleItem({ label, name }) {
        return (
            <div className="flex justify-between text-sm items-center py-2 border-b border-gray-200">
                <span className={`text-gray-700`}>{label}</span>
                <input type="checkbox" onChange={() => { handleToggle(name, !settings[name]) }} checked={settings[name]} className="toggle toggle-primary" />
            </div>
        );
    }

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
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        router.push('/login');
    };

    const handleToggle = (key, value) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };

    const saveNotificationSettings = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/settings/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    settings: settings,
                }),
            });
            if (!response.ok) console.log("Failed to save settings: " + response.error);
            setSuccess("Settings updated successfully!");
            setTimeout(() => {
                setSuccess(false);
            }, 1000);
        } catch (error) {
            console.log("Error updating settings: " + error.message);
        }
    };

    return (
        <>
            <div id="spendwise-change-password" tabIndex="-1" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 hidden">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className={`relative bg-white rounded-lg shadow-sm`}>
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className={`text-xl font-semibold text-gray-900`}>
                                Change Password
                            </h3>
                            <button onClick={() => closeModal("spendwise-change-password")} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg className={`w-3 h-3`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="p-5 md:p-5">
                            <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                                <div className="sr-only">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        autoComplete="username"
                                        value={user?.email || ""}
                                        readOnly
                                        tabIndex={-1}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="current_password" className={`block mb-2 text-sm font-medium text-gray-900`}>Current Password</label>
                                    <input type="password" autoComplete="current-password" name="current_password" id="current_password" onChange={handleChange} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} required />
                                </div>

                                <div>
                                    <label htmlFor="new_password" className={`block mb-2 text-sm font-medium text-gray-900`}>New Password</label>
                                    <input type="password" autoComplete="new-password" name="new_password" id="new_password" onChange={handleChange} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} required />
                                </div>

                                <div>
                                    <label htmlFor="confirm-new-password" className={`block mb-2 text-sm font-medium text-gray-900`}>Confirm New Password</label>
                                    <input type="password" autoComplete="confirm-new-password" name="confirm-new-password" id="confirm-new-password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} onChange={(e) => {
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

            {/* Login History */}
            <div id="login-history" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 hidden">
                <div className={`bg-white rounded-lg w-full max-w-md p-6 shadow-lg`}>
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h2 className={`text-lg font-semibold text-gray-900`}>Login History</h2>
                        <button onClick={() => closeModal("login-history")} className={`text-gray-500 hover:text-gray-800`}>
                            ✕
                        </button>
                    </div>
                    <div className={`max-h-80 overflow-y-auto space-y-4`}>
                        {
                            loading && (
                                <p className={`text-gray-500 text-sm`}>Loading login history...</p>
                            ) ||
                                loginHistory && loginHistory.length > 0 ? (
                                loginHistory.map((entry, index) => (
                                    <div key={index} className={`border rounded-md p-3 bg-gray-50`}>
                                        <p className={`text-sm text-gray-700`}><strong className={settings.darkMode ? "dark:text-gray-500" : ""}>Device:</strong> {entry.device}</p>
                                        <p className={`text-sm text-gray-700`}><strong className={settings.darkMode ? "dark:text-gray-500" : ""}>Location:</strong> {entry.location}</p>
                                        <p className={`text-sm text-gray-700`}><strong className={settings.darkMode ? "dark:text-gray-500" : ""}>Date:</strong> {new Date(entry.date).toLocaleString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p className={`text-gray-500 text-sm`}>No login history found.</p>
                            )}
                    </div>
                </div>
            </div>

            <div className={`min-h-screen bg-gray-50 py-6 px-4`}>
                <h2 className={`text-2xl font-semibold text-gray-800 mb-6`}>Settings</h2>

                <div className="space-y-4">
                    {/* Profile Section */}
                    <div className={`bg-white rounded-xl shadow-sm p-4 flex items-center justify-between`}>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                {/* Add Profile Image */}
                                <svg className={`w-8 h-8 m-2 text-gray-400`} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <p className={`text-sm text-gray-600`}>Logged in as</p>
                                <p className={`font-medium text-gray-900`}>{user?.name}</p>
                            </div>
                        </div>
                        <button onClick={() => router.push("/profile")} className="text-sm text-blue-500 hover:underline">Edit</button>
                    </div>

                    {/* Account Section */}
                    <div className={`bg-white rounded-xl shadow-sm p-4 space-y-4`}>
                        <div className="flex items-center gap-4 mb-4">
                            <svg className={`w-4 h-4 text-gray-800`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
                            </svg>
                            <h3 className={`text-gray-700 text-sm font-medium`}>Account</h3>
                        </div>

                        <SettingItem label="Change Password" btn_label={"Change"} onclick={() => openModal("spendwise-change-password")} />
                        <SettingItem label="Two-Factor Authentication" btn_label={"Enable"} onclick={() => { }} />
                        <SettingItem label="Login History" btn_label={"View"} onclick={() => openModal("login-history")} />
                    </div>

                    {/* Notification Settings */}
                    <div className={`bg-white rounded-xl shadow-sm p-4 space-y-4`}>
                        <div className="flex items-center gap-4 mb-4">
                            <svg className={`w-4 h-4 text-gray-800`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 21">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"></path>
                            </svg>
                            <h3 className={`text-gray-700 text-sm font-medium`}>Notifications & Reminders</h3>
                        </div>
                        <ToggleItem label="Enable Notifications" name="enableNotifications" />
                        <ToggleItem label="Smart Spending Notifications" name="smartSpendingNotifications" />
                        <ToggleItem label="Daily Summary" name="dailySummary" />
                        <ToggleItem label="Weekly Summary" name="weeklySummary" />
                        <ToggleItem label="Hide Default SMS Notifications" name="hideDefaultSMSNotifications" />

                        <button id="spendwise-save-notifications" className="w-full text-sm text-blue-500 py-2" onClick={saveNotificationSettings}>
                            Save Settings
                        </button>
                        {/* Success Message */}
                        {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
                    </div>

                    <div className={`bg-white rounded-xl shadow-sm p-4 space-y-4`}>
                        <button id="logout" className="w-full text-left text-lg text-red-500 py-2" onClick={() => handleLogout()}>
                            <svg className="w-4 h-4 text-red-500 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"></path>
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};