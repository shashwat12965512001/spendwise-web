"use client";

import { useState, useEffect } from "react";
import API_BASE_URL from "../app/utils/apiConfig";


export default function Profile() {

    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
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
            const response = await fetch(`${API_BASE_URL}/api/users/update/${user._id || user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
                closeModal("spendwise-edit-profile");
                console.log("Profile updated successfully!");
                window.location.reload();
            } else {
                console.log("Failed to update profile: " + response.error);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    useEffect(() => {
        // This runs only on the client side
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse JSON if stored as an object
        }
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                mobile: user.mobile || "",
            });
        }
    }, [user]);

    const openModal = (id) => {
        const modal = document.getElementById(id);
        modal?.classList.remove('hidden');
        modal?.classList.add('flex'); // If you're using flexbox to center
    };

    const closeModal = (id) => {
        const modal = document.getElementById(id);
        modal?.classList.remove('flex');
        modal?.classList.add('hidden');
    };

    return (
        <>

            {/* Edit Profile Modal */}
            <div
                id="spendwise-edit-profile"
                tabIndex="-1" className="bg-gray-400 bg-opacity-50 hidden overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full"
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow-sm">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Update Profile
                            </h3>
                            <button type="button" onClick={() => { closeModal("spendwise-edit-profile") }} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="spendwise-edit-profile">
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
                                    <input name="name" id="name" type="text" onChange={handleInputChange} value={formData.name || ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input name="email" id="email" type="email" onChange={handleInputChange} value={formData.email || ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Mob No.</label>
                                    <input name="mobile" id="mobile" type="number" onChange={handleInputChange} value={formData.mobile || ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <button type="button" onClick={handleUpdateProfile} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

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
                <p className="text-md inline-flex items-center gap-2">{user && user.name || "John Doe"} <svg className="w-4 h-4 text-gray-800" onClick={() => { openModal("spendwise-edit-profile") }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"></path>
                </svg></p>
            </div>

            {/* Email */}
            <div className="pt-4 flex flex-row justify-between cursor-pointer" data-modal-target="spendwise-edit-profile" data-modal-toggle="spendwise-edit-profile">
                <p className="text-md font-semibold">Email ID</p>
                <p className="text-md inline-flex items-center gap-2">{user && user.email || "abc@example.com"} <svg className="w-4 h-4 text-gray-800" onClick={() => { openModal("spendwise-edit-profile") }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"></path>
                </svg></p>
            </div>

            {/* Mob No. */}
            <div className="pt-4 flex flex-row justify-between cursor-pointer" data-modal-target="spendwise-edit-profile" data-modal-toggle="spendwise-edit-profile">
                <p className="text-md font-semibold">Mob No.</p>
                <p className="text-md inline-flex items-center gap-2">{user && user.mobile || "1234567890"} <svg className="w-4 h-4 text-gray-800" onClick={() => { openModal("spendwise-edit-profile") }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"></path>
                </svg></p>
            </div>
        </>
    );
};