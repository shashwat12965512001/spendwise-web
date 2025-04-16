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

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

        if (storedUser?.id) {
            fetchRecentTransactions(storedUser.id, count).then(setTransactions);
        }
    }, []);

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
        <div className={`min-h-screen bg-gradient-to-b from-[#f0f4ff] to-white px-4 pb-20 transition-colors duration-300`}>
            {/* Header */}
            <div className="flex justify-between items-center py-4">
                <div>
                    <p className={`text-gray-500 text-sm`}>Hi, User 👋</p>
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
