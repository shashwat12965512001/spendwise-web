
"use client";

import API_BASE_URL from "@/app/utils/apiConfig";
import { useEffect, useState } from "react";

export default function TransactionList({ transactions }) {

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
        <div className={`bg-white rounded-xl p-4 shadow ${settings.darkMode ? "dark:bg-gray-900" : ""}`}>
            <h2 className={`text-lg font-semibold mb-2 ${settings.darkMode ? "dark:text-white" : ""}`}>Recent Transactions</h2>
            <ul className="divide-y divide-gray-200">
                {
                    transactions.length > 0 ? (
                        transactions.map((txn, idx) => (
                            <li key={idx} className="py-2 flex justify-between items-center">
                                <div>
                                    <p className={`font-medium ${settings.darkMode ? "dark:text-white" : ""}`}>{txn.name}</p>
                                    <p className={`text-sm text-gray-500 ${settings.darkMode ? "dark:text-gray-500" : ""}`}>{new Date(txn.date).toLocaleDateString('en-GB')}</p>
                                </div>
                                <p className={`font-bold ${txn.category == "expense" ? 'text-red-600' : 'text-green-600'}`}>
                                    {txn.category == "expense" ? '-' : '+'} ₹{Math.abs(txn.amount).toLocaleString()}
                                </p>
                            </li>
                        ))
                    ) : (
                        <li className="py-2 flex justify-between items-center">
                            <p className={`text-gray-500 ${settings.darkMode ? "dark:text-white" : ""}`}>No recent transactions</p>
                        </li>
                    )}
            </ul>
        </div>
    );
}
