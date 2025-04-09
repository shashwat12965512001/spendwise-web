'use client'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import BottomNav from './BottomNavigationBar'
import BalanceCard from './BalanceCard'
import TransactionList from './TransactionList'

const Dashboard = () => {
    const [balance] = useState(22950.0);
    const transactions = [
        { name: "DeepakInshArt", date: "2024-03-01", amount: 22950 },
        { name: "Mobile Recharge", date: "2024-03-02", amount: 550 },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-white px-4 pb-20">
            {/* Header */}
            <div className="flex justify-between items-center py-4">
                <div>
                    <p className="text-gray-500 text-sm">Hi, User 👋</p>
                    <h2 className="text-xl font-bold">Welcome back!</h2>
                </div>
                <FaUserCircle className="text-3xl text-gray-600" />
            </div>

            {/* Balance Card */}
            <BalanceCard balance={balance} />

            {/* Recent Transactions */}
            <TransactionList transactions={transactions} />
        </div>
    )
}

export default Dashboard
