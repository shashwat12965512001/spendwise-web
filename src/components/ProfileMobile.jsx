"use client";

import { API_BASE_URL } from "@/app/utils/apiConfig";
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function ProfileMobile() {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
    });

    useEffect(() => {
        // This runs only on the client side
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse JSON if stored as an object
        }
    }, []);

    useEffect(() => {
        setReady(true);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (user) {
            const [firstName, lastName = ""] = (user.name || "").split(" ");
            setFormData({
                firstName,
                lastName,
                email: user.email || "",
                mobile: user.mobile || "",
            });
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        setReady(false);
        e.preventDefault();

        const updatedData = {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            mobile: formData.mobile,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/users/update/${user._id || user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                localStorage.setItem("user", JSON.stringify(updatedUser.user));
                setUser(updatedUser.user);
            } else {
                console.log("Failed to update profile: " + response.error);
            }
            setReady(true);
        } catch (error) {
            setReady(true);
            console.error("Error updating profile:", error);
        }
    };

    if (!ready) return <Loader />;

    return (
        <>
            <div className={`min-h-screen bg-gray-50 px-4 pt-6 pb-20 transition-colors duration-300`}>
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-2xl font-semibold text-gray-800`}>Profile</h2>
                    <button
                        className={`text-blue-500 font-medium`}
                        onClick={handleUpdateProfile}
                    >
                        Save
                    </button>
                </div>

                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                    <div className={`w-24 h-24 rounded-full overflow-hidden shadow-md flex items-center justify-center bg-gray-500`}>
                        <svg
                            className={`w-20 h-18 text-gray-300`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>

                {/* Input Fields */}
                <form className="space-y-4" onSubmit={handleUpdateProfile}>
                    <div>
                        <label className={`text-sm text-gray-500 mb-1 block`}>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`w-full bg-white text-gray-800 text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none`}
                        />
                    </div>

                    <div>
                        <label className={`text-sm text-gray-500 mb-1 block`}>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`w-full bg-white text-gray-800 text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none`}
                        />
                    </div>

                    <div>
                        <label className={`text-sm text-gray-500 mb-1 block`}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full bg-white text-gray-800 text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none`}
                        />
                    </div>

                    <div>
                        <label className={`text-sm text-gray-500 mb-1 block`}>Mobile</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            readOnly
                            className={`w-full bg-gray-300 text-gray-800 text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none`}
                        />
                    </div>
                </form>

                {/* Bottom spacing for nav */}
                <div className="h-20" />
            </div>
        </>
    );
}
