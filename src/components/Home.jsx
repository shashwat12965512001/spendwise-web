'use client'
import { useState, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import BalanceCard from './BalanceCard'
import TransactionList from './TransactionList'
import API_BASE_URL from '@/app/utils/apiConfig'

const Dashboard = () => {
    const count = 10;
    const [balance] = useState(22950.0);
    const [transactions, setTransactions] = useState([]);
    const [userId, setUserId] = useState(null);
    const [settings, setSettings] = useState({
        enableNotifications: false,
        smartSpendingNotifications: false,
        dailySummary: false,
        weeklySummary: false,
        hideDefaultSMSNotifications: false,
        darkMode: false,
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

        if (storedUser?.id) {
            setUserId(storedUser.id);
            fetchRecentTransactions(storedUser.id, count).then(setTransactions);
            fetchSettings(storedUser.id);
        }
    }, []);

    const fetchSettings = async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/settings/get/${userId}`); // Replace with your actual API route
            if (!response.ok) throw new Error("Failed to fetch settings");
            const data = await response.json();
            setSettings(data);
        } catch (err) {
            console.log(err.message);
        }
    };

    const fetchRecentTransactions = async (userId, count = 10) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/transactions/recent/${userId || "67e5243891c1b8d5efd524d6"}/${count}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (data.success) {
                return data.transactions;
            } else {
                console.error("Error fetching transactions:", data.error);
                return [];
            }
        } catch (error) {
            console.error("Server error:", error);
            return [];
        }
    };

    return (
        <div className={`min-h-screen bg-gradient-to-b from-[#f0f4ff] to-white ${settings.darkMode ? "dark:from-[#0f172a] dark:to-[#1e293b]" : ""} px-4 pb-20 transition-colors duration-300`}>
            {/* Header */}
            <div className="flex justify-between items-center py-4">
                <div>
                    <p className={`text-gray-500 ${settings.darkMode ? "dark:text-gray-400" : ""} text-sm`}>Hi, User 👋</p>
                    <h2 className={`text-xl font-bold text-gray-900 ${settings.darkMode ? "dark:text-white" : ""}`}>Welcome back!</h2>
                </div>
                <FaUserCircle className={`text-3xl text-gray-600 ${settings.darkMode ? "dark:text-gray-400" : ""}`} />
            </div>

            {/* Balance Card */}
            <BalanceCard balance={balance} />

            {/* Recent Transactions */}
            <TransactionList transactions={transactions} />
        </div>

    )
}

export default Dashboard
