"use client";

import Card from "../components/Card";
import { RecentTransactions } from "../components/RecentTransactions";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

export default () => {
    useAuth();

    const [user, setUser] = useState(null);

    useEffect(() => {
        // This runs only on the client side
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse JSON if stored as an object
        }
    }, []);

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

    const getUserCreationDate = (user) => {
        if (user && user.createdAt) {
            const date = new Date(user.createdAt);
            return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
        }
        return "August 2024"; // Default value
    };

    return (
        <>
            {/* Hero */}
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">

                {/* Welcome Message */}
                <div className="mb-4 md:mb-0">
                    <h3 className="text-3xl font-bold">
                        Welcome back, <span>{user && user.name.split(" ")[0] || "John"}</span>
                    </h3>
                    <p className="mt-2 text-gray-600">
                        You're $150 away from savings goal. Keep going!
                    </p>
                </div>

                {/* User Info */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* Profile Picture */}
                    <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-600">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    </div>

                    {/* User Details */}
                    <div className="font-medium">
                        <div>{user && user.name || "John Doe"}</div>
                        <div className="text-sm text-gray-500">{"Joined in " + getUserCreationDate(user)}</div>
                    </div>
                </div>

            </div>


            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {cardsData.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>

            {/* Recent Trasactions */}
            <div className="p-4">
                <RecentTransactions count={10} />
            </div>
        </>
    );
}
