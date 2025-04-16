"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API_BASE_URL from "../utils/apiConfig";
import Loader from "@/components/Loader";

export default () => {

    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [resultError, setresultError] = useState("");
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    // State to store form data
    const [user, setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        setReady(false);
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            if (!response.ok) {
                setresultError(data.error || "Failed to add user"); // Use error message from response
                return;
            }

            setSuccess("User Created Successfully!");

            if (window.FlutterBridge) {
                window.FlutterBridge.postMessage(data.user.id);
            }

            setTimeout(() => {
                router.push("/login");
            }, 1000);

            // Clear the form
            setUser({ name: "", email: "", mobile: "", password: "" });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (!ready) return <Loader />;

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Create an Account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
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
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="mobile" className="block text-sm/6 font-medium text-gray-900">
                                Mobile No.
                            </label>
                            <div className="mt-2">
                                <input
                                    id="mobile"
                                    name="mobile"
                                    type="text"
                                    onChange={handleChange}
                                    required
                                    autoComplete="mobile"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={user.password || ""}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    value={user.confirmPassword || ""}
                                    onChange={(e) => {
                                        const confirmPassword = e.target.value;
                                        setUser({ ...user, confirmPassword });

                                        // Check if passwords match
                                        if (user.password !== confirmPassword) {
                                            setError("Passwords do not match");
                                        } else {
                                            setError(""); // Clear error if passwords match
                                        }
                                    }}
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {/* Error Message */}
                                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                                {/* Success Message */}
                                {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                            {/* Error Message */}
                            {resultError && <p className="text-red-500 text-sm mt-1">{resultError}</p>}
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};