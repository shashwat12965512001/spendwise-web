'use client';

import { useState, useEffect } from 'react';
import { FiSearch, FiTrash2 } from 'react-icons/fi';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import API_BASE_URL from "@/app/utils/apiConfig";

export default function TransactionsMobile({ transactions, deleteTransaction, openModal }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTxn, setSelectedTxn] = useState(null);
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

    const filteredTransactions = transactions.filter((txn) =>
        txn.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openTransactionModal = (txn) => setSelectedTxn(txn);
    const closeTransactionModal = () => setSelectedTxn(null);

    return (
        <>
            <div className={`bg-white ${settings.darkMode ? "dark:bg-[#0f172a]" : ""} block lg:hidden px-4 py-10 min-h-screen transition-colors duration-300`}>
                <h2 className={`text-2xl font-semibold text-gray-800 ${settings.darkMode ? "dark:text-white" : ""} mb-4`}>Transactions</h2>

                {/* Search bar */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search transactions"
                        className={`w-full rounded-md border px-4 py-2 pr-10 text-sm text-gray-700 ${settings.darkMode ? "dark:bg-[#1e293b] dark:text-white dark:border-gray-600" : ""}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch className={`absolute right-3 top-3 text-gray-400 ${settings.darkMode ? "dark:text-gray-300" : ""}`} />
                </div>

                {/* Transactions List */}
                <div className="space-y-3">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((txn) => (
                            <motion.div
                                key={txn._id}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 40 }}
                                transition={{ duration: 0.2 }}
                                className={`bg-white ${settings.darkMode ? "dark:bg-[#1e293b]" : ""} rounded-lg shadow p-4 relative`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className={`font-semibold text-gray-900 ${settings.darkMode ? "dark:text-white" : ""}`}>{txn.name}</h3>
                                        <p className={`text-sm text-gray-500 ${settings.darkMode ? "dark:text-gray-400" : ""}`}>{formatDate(txn.date)}</p>
                                    </div>
                                    <p
                                        className={`text-sm font-medium ${txn.category === "income"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {txn.category === "income" ? "+" : "-"} ₹{txn.amount.toFixed(2)}
                                    </p>
                                </div>

                                {/* Swipe Actions */}
                                <div className="mt-3 flex justify-end gap-4">
                                    <button
                                        onClick={() => openTransactionModal(txn)}
                                        className={`text-indigo-600 ${settings.darkMode ? "dark:text-indigo-400" : ""} text-sm font-medium`}
                                    >
                                        View
                                    </button>
                                    <button onClick={() => deleteTransaction(txn._id)} className="text-red-500">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className={`text-gray-500 ${settings.darkMode ? "dark:text-gray-400" : ""} text-sm`}>No transactions found.</p>
                    )}
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {selectedTxn && (
                        <Dialog open={true} onClose={closeTransactionModal} className="fixed inset-0 z-50">
                            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40 }}
                                className={`fixed bottom-0 left-0 w-full bg-white ${settings.darkMode ? "dark:bg-[#1e293b]" : ""} rounded-t-xl p-6 z-50`}
                            >
                                <Dialog.Title className={`text-lg font-semibold text-gray-800 ${settings.darkMode ? "dark:text-white" : ""} mb-2`}>
                                    Transaction Details
                                </Dialog.Title>
                                <div className={`space-y-2 text-sm text-gray-700 ${settings.darkMode ? "dark:text-gray-300" : ""}`}>
                                    <p>
                                        <strong>Amount:</strong> ₹{selectedTxn.amount}
                                    </p>
                                    <p>
                                        <strong>Receiver:</strong> {selectedTxn.name}
                                    </p>
                                    <p>
                                        <strong>Date/Time:</strong> {formatDateTime(selectedTxn.date)}
                                    </p>
                                    <p>
                                        <strong>UPI ID:</strong> {selectedTxn.upi_id || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Txn ID:</strong> {selectedTxn.transaction_id || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Category:</strong> {selectedTxn.expense_type || "N/A"}
                                    </p>
                                </div>
                                <button
                                    className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
                                    onClick={closeTransactionModal}
                                >
                                    Close
                                </button>
                            </motion.div>
                        </Dialog>
                    )}
                </AnimatePresence>

                {/* Floating Action Button */}
                <button
                    onClick={() => openModal("spendwise-add-new-expense")}
                    className="fixed bottom-20 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg z-50"
                    aria-label="Add Transaction"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </>
    );
}

// Format: 1/3/2024 → 01/03/2024
function formatDate(dateString) {
    const d = new Date(dateString);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

// Date + time (24hr)
function formatDateTime(dateString) {
    const d = new Date(dateString);
    return `${formatDate(dateString)} ${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
}
