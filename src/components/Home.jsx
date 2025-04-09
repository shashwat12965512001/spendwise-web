'use client'
import { useState } from 'react'
import { FiSend, FiCreditCard, FiZap } from 'react-icons/fi'
import { FaWallet, FaUserCircle } from 'react-icons/fa'
import BottomNav from './BottomNavigationBar'


const Dashboard = () => {
    const [balance] = useState(22950.0)
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
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-6 shadow-lg">
                <p className="text-sm">Current Balance</p>
                <h1 className="text-3xl font-bold mt-1">₹ {balance.toLocaleString()}</h1>
                <p className="mt-4 text-xs">•••• 8398</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 text-center gap-4 mt-6 text-sm text-gray-700">
                <div className="flex flex-col items-center">
                    <FiSend className="text-indigo-500 text-xl mb-1" />
                    Send
                </div>
                <div className="flex flex-col items-center">
                    <FaWallet className="text-indigo-500 text-xl mb-1" />
                    Pay
                </div>
                <div className="flex flex-col items-center">
                    <FiZap className="text-indigo-500 text-xl mb-1" />
                    Recharge
                </div>
                <div className="flex flex-col items-center">
                    <FiCreditCard className="text-indigo-500 text-xl mb-1" />
                    Bills
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Transactions</h3>
                <div className="space-y-4">
                    {transactions.map((txn, i) => (
                        <div key={i} className="flex justify-between items-center border-b pb-2">
                            <div>
                                <p className="font-semibold">{txn.name}</p>
                                <p className="text-xs text-gray-500">{new Date(txn.date).toLocaleDateString()}</p>
                            </div>
                            <div className="text-sm font-bold text-red-600">- ₹ {txn.amount}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Nav (Will stick at bottom via padding) */}
            {/* <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t flex justify-around py-2 z-50">
                <button className="flex flex-col items-center text-indigo-600 text-sm font-medium">
                    <HomeIcon className="h-6 w-6" />
                </button>
                <button className="flex flex-col items-center text-gray-500 text-sm">
                    <ChartBarIcon className="h-6 w-6" />
                </button>
                <button className="flex flex-col items-center text-gray-500 text-sm">
                    <PlusCircleIcon className="h-6 w-6" />
                </button>
                <button className="flex flex-col items-center text-gray-500 text-sm">
                    <UserCircleIcon className="h-6 w-6" />
                </button>
            </div> */}
            <BottomNav />

        </div>
    )
}

export default Dashboard
