"use client";
import { Dialog } from "@headlessui/react";

export default function TransactionDetailsModal({ isOpen, onClose, transaction }) {
    if (!transaction) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md rounded bg-white dark:bg-gray-900 p-6 shadow-lg">
                    <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white">
                        Transaction Details
                    </Dialog.Title>

                    <div className="mt-4 space-y-2 text-sm text-gray-800 dark:text-gray-300">
                        <p><strong>Amount:</strong> ${transaction.amount.toFixed(2)}</p>
                        <p><strong>Name:</strong> {transaction.name}</p>
                        <p><strong>Category:</strong> {transaction.expense_type}</p>
                        <p><strong>UPI ID:</strong> {transaction.upi_id || "N/A"}</p>
                        <p><strong>Txn ID:</strong> {transaction.transaction_id || "N/A"}</p>
                        <p><strong>Date:</strong> {new Date(transaction.date).toLocaleString()}</p>
                        <p><strong>Bank:</strong> {transaction.bank || "Not Available"}</p>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-blue-700">
                            Close
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
