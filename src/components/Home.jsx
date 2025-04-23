'use client'

import { useState, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import BalanceCard from './BalanceCard'
import TransactionList from './TransactionList'
import { API_BASE_URL } from '@/app/utils/apiConfig'

const Dashboard = () => {
    const count = 10;
    const [balance, setBalance] = useState(50000.00);
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        setUser(storedUser);
        const userId = storedUser._id || storedUser.id;
        if (userId) {
            fetchRecentTransactions(userId, count).then(setTransactions);
            fetchMonthlyBudget(userId);
        }
    }, []);

    const fetchRecentTransactions = async (userId, count = 10) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/transactions/recent/${userId}/${count}`, {
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

    const fetchMonthlyBudget = async (userId) => {
        try {
            const response = await fetch("https://backend.weblytechnolab.com/getMonthlyBudget", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id: userId }),
            });

            const data = await response.json();
            console.log("Response:", data);

            if (data.status) {
                console.log("✅ Monthly budget fetched successfully:", data.monthly_budget);
                setBalance(data.monthly_budget);
            } else {
                console.error("❌ Error fetching monthly budget:", data.message || data.error);
                return {};
            }
        } catch (error) {
            console.error("🚨 Server error:", error);
            return {};
        }
    };

    return (
        <div className={`min-h-screen bg-gradient-to-b from-[#f0f4ff] to-white px-4 pb-20 transition-colors duration-300`}>
            {/* Header */}
            <div className="flex justify-between items-center py-4">
                <div>
                    <p className={`text-gray-500 text-sm`}>Hi, {user && user.name || "User"} 👋</p>
                    <h2 className={`text-xl font-bold text-gray-900`}>Welcome back!</h2>
                </div>
                <FaUserCircle className={`text-3xl text-gray-600`} />
            </div>

            {/* Balance Card */}
            <BalanceCard balance={balance} />

            {/* Recent Transactions */}
            <TransactionList transactions={transactions} />
        </div>

    )
}

export default Dashboard
