"use client";

import { FiPlus } from "react-icons/fi";
import Card from "@/components/Card";
import RecentTransactions from "@/Components/RecentTransactions";

export default function Home() {

    const cardsData = [
        {
            title: "Total Income",
            amount: 7000,
            percentage: 40,
            trend: [1000, 2000, 3000, 5000, 6000, 7000],
            color: "green",
        },
        {
            title: "Total Expenses",
            amount: 4500,
            percentage: -10,
            trend: [5000, 4800, 4600, 4400, 4500, 4500],
            color: "red",
        },
        {
            title: "Savings This Month",
            amount: 1500,
            percentage: 20,
            trend: [1000, 1200, 1400, 1300, 1400, 1500],
            color: "blue",
        },
    ];

    return (
        <>
            {/* Hero */}
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 flex justify-between items-center">
                <div>
                    <h3 className="text-3xl font-bold">
                        Welcome back, <span>Shashwat</span>
                    </h3>
                    <p className="mt-2 text-gray-600">You're $150 away from savings goal. Keep going!</p>
                </div>

                <button className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 cursor-pointer">
                    <FiPlus size={18} /> Add Expense
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                {cardsData.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>

            {/* Recent Trasactions */}
            <div className="p-4">
                <RecentTransactions />
            </div>
        </>
    );
}
