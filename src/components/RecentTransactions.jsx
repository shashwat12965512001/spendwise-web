"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API_BASE_URL from "../app/utils/apiConfig";

export const RecentTransactions = ({ count = 10 }) => {
    const [transactions, setTransactions] = useState([]);

    const fetchRecentTransactions = async (count) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/transactions/recent/${count}`);
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

    useEffect(() => {
        const getTransactions = async () => {
            const data = await fetchRecentTransactions(count);
            setTransactions(data);
        };

        getTransactions();
    }, [count]);

    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <ul className="divide-y divide-gray-200">
                {transactions.map((txn, index) => (
                    <motion.li
                        key={txn.id || index}
                        className="flex justify-between items-center py-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <div>
                            <p className="text-sm font-medium">{capitalizeFirstLetter(txn.expense_type)}</p>
                            <p className="text-xs text-gray-500">{new Date(txn.date).toLocaleDateString()}</p>
                        </div>
                        <p className={`font-bold ${txn.category === "income" ? "text-green-500" : "text-red-500"}`}>
                            {txn.category === "income" ? "+" : "-"}${txn.amount}
                        </p>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};
