"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API_BASE_URL from "../utils/apiConfig";
import Loader from "@/components/Loader";

export default () => {

    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [ready, setReady] = useState(false);
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

    useEffect(() => {
        setReady(true);
    }, []);

    // State to store form data
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        setError(false);
        setReady(false);
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.error || "Failed to add user"); // Use error message from response
                setReady(true);
                return;
            }

            // Store token in localStorage
            localStorage.setItem("token", data.token);

            // Store user details (optional)
            localStorage.setItem("user", JSON.stringify(data.user));

            setSuccess("Login Successfull!");

            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);

            // Clear the form
            setUser({ email: "", password: "" });
        } catch (error) {
            console.error("Error:", error);
            setReady(true);
        }
    };

    if (!ready) return <Loader />;

    return (

        <>
            <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ${settings.darkMode ? "dark:bg-gray-900" : ""}`}>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className={`mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 ${settings.darkMode ? "dark:text-white" : ""}`}>
                        Login
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className={`block text-sm/6 font-medium text-gray-900 ${settings.darkMode ? "dark:text-white" : ""}`}>
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${settings.darkMode ? "dark:bg-[#1e293b] dark:text-white" : ""}`}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className={`block text-sm/6 font-medium text-gray-900 ${settings.darkMode ? "dark:text-white" : ""}`}>
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                    className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${settings.darkMode ? "dark:bg-[#1e293b] dark:text-white" : ""}`}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                            {/* Error Message */}
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                            {/* Success Message */}
                            {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign Up Now
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
