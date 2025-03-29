"use client";

import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from 'next/navigation';

export default () => {
    useAuth();

    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState("general");
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    // Handle input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle profile update
    const handleUpdateProfile = async () => {
        try {
            const response = await fetch("/api/update-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Something went wrong.");
        }
    };

    useEffect(() => {
        // This runs only on the client side
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse JSON if stored as an object
        }
    }, []);

    const renderContent = () => {
        switch (selectedTab) {
            case "general":
                return (
                    <>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Profile</h2>
                            <p>
                                Manage your general account settings, preferences, and more.
                            </p>
                        </div>

                        <hr className="border-gray-300 my-4" />

                        {/* Name */}
                        <div className="flex flex-row justify-between cursor-pointer" data-modal-target="spendwise-edit-profile" data-modal-toggle="spendwise-edit-profile">
                            <p className="text-md font-semibold">Full Name</p>
                            <p className="text-md inline-flex items-center gap-2">{user && user.name || "John Doe"} <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"></path>
                            </svg></p>
                        </div>

                        {/* Email */}
                        <div className="pt-4 flex flex-row justify-between cursor-pointer" data-modal-target="spendwise-edit-profile" data-modal-toggle="spendwise-edit-profile">
                            <p className="text-md font-semibold">Email ID</p>
                            <p className="text-md inline-flex items-center gap-2">{user && user.email || "abc@example.com"} <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"></path>
                            </svg></p>
                        </div>

                        {/* Mob No. */}
                        <div className="pt-4 flex flex-row justify-between cursor-pointer" data-modal-target="spendwise-edit-profile" data-modal-toggle="spendwise-edit-profile">
                            <p className="text-md font-semibold">Mob No.</p>
                            <p className="text-md inline-flex items-center gap-2">{user && user.phone || "1234567890"} <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"></path>
                            </svg></p>
                        </div>

                        <hr className="border-gray-300 my-4" />

                    </>
                );
            case "security":
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                        <p>
                            Update your security settings, passwords, and login details.
                        </p>
                    </div>
                );
            case "notifications":
                return (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
                        <p>
                            Manage your email, push, and SMS notification preferences.
                        </p>
                    </div>
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

            {/* Edit Profile Modal */}
            <div id="spendwise-edit-profile" tabIndex="-1" aria-hidden="true" aria-modal="true" className="bg-gray-400 bg-opacity-50 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow-sm">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Update Profile
                            </h3>
                            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="spendwise-edit-profile">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-5 md:p-5">
                            <form className="space-y-4" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Mob No.</label>
                                    <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

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
