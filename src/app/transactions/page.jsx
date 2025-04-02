"use client";

import { FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import API_BASE_URL from "../utils/apiConfig";
import Papa from "papaparse";

export default () => {
    useAuth();

    // State to store transactions
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_BASE_URL}/api/transactions/all`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "bypass-tunnel-reminder": "true",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data.error || "Failed to fetch transactions");
            }

            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const deleteTransaction = async (id) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_BASE_URL}/api/transactions/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "bypass-tunnel-reminder": "true",
                },
            });

            if (!response.ok) {
                console.log("Failed to delete transaction");
            }

            // Remove deleted transaction from state
            setTransactions(transactions.filter((transaction) => transaction._id !== id));
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    // Update Transaction
    const updateTransaction = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${API_BASE_URL}/api/transactions/update/${editTransaction._id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "bypass-tunnel-reminder": "true",
                },
                body: JSON.stringify(editTransaction),
            });

            const updatedTransaction = await response.json();
            if (!response.ok) {
                console.log("Failed to update transaction");
            }

            // Update the transaction in state
            setTransactions(transactions.map((t) => (t._id === updatedTransaction._id ? updatedTransaction : t)));
            setShowModal(false);
        } catch (error) {
            console.error("Error updating transaction:", error);
        }
    };

    const openEditModal = (transaction) => {
        setEditTransaction(transaction);
        setShowModal(true);
    };

    // State to store form data
    const [expense, setExpense] = useState({
        name: "",
        date: "",
        amount: "",
        category: "income",
        expense_type: "food",
        upi_id: "",
        transaction_id: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form reload

        try {
            const response = await fetch(`${API_BASE_URL}/api/transactions/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "bypass-tunnel-reminder": "true",
                },
                body: JSON.stringify(expense),
            });

            if (!response.ok) {
                console.log("Failed to add expense");
            }

            const data = await response.json();
            console.log("Expense added:", data);

            // Clear the form
            setExpense({ name: "", date: "", amount: "", category: "", expense_type: "", upi_id: "", transaction_id: "" });

            // Close the modal (optional)
            document.getElementById("spendwise-add-new-expense").classList.add("hidden");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getStatusColor = (category) => {
        switch (category.toLowerCase()) {
            case "food":
                return "bg-blue-600";
            case "shopping":
                return "bg-green-600";
            case "travel":
                return "bg-yellow-600";
            case "entertainment":
                return "bg-purple-600";
            case "bills":
                return "bg-red-600";
            default:
                return "bg-gray-400"; // Default color
        }
    };

    const exportToCSV = (transactions) => {
        if (!transactions || transactions.length === 0) {
            alert("No transactions to export.");
            return;
        }

        // Define CSV headers
        const csvHeaders = ["Name", "Date", "Amount", "UPI ID", "Transaction ID", "Category"];

        // Convert transactions array to CSV format
        const csvData = transactions.map((txn) => ({
            Name: txn.name || "N/A", // User's name (default "N/A" if not available)
            Date: new Date(txn.date).toLocaleDateString(),
            Amount: txn.amount,
            "UPI ID": txn.upi_id || "N/A", // Handle cases where UPI ID is missing
            "Transaction ID": txn.transaction_id || "N/A", // Handle missing transaction ID
            Category: txn.expense_type || "Uncategorized",
        }));

        // Generate CSV
        const csv = Papa.unparse({
            fields: csvHeaders,
            data: csvData,
        });

        // Create a downloadable CSV file
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            {/* Edit Transaction Modal */}
            {showModal && (
                <div id="spendwise-update-expense" tabIndex="-1" aria-hidden="true" className="bg-gray-400 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow-sm">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Edit Transaction
                                </h3>
                                <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="spendwise-update-expense">
                                    <svg className="w-3 h-3" onClick={() => setShowModal(false)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-5 md:p-5">
                                <form className="space-y-4" action="#">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                        <input type="text" value={editTransaction.name} onChange={(e) => setEditTransaction({ ...editTransaction, name: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                                        <input type="text" value={new Date(editTransaction.date).toLocaleDateString()} onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                                        <input type="number" value={editTransaction.amount} onChange={(e) => setEditTransaction({ ...editTransaction, amount: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">UPI ID</label>
                                        <input type="text" value={editTransaction.upi_id} onChange={(e) => setEditTransaction({ ...editTransaction, upi_id: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">Transaction ID</label>
                                        <input type="text" value={editTransaction.transaction_id} onChange={(e) => setEditTransaction({ ...editTransaction, transaction_id: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                    </div>
                                    <button type="button" onClick={updateTransaction} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add new Expense Modal */}
            <div id="spendwise-add-new-expense" tabIndex="-1" aria-hidden="true" className="bg-gray-400 bg-opacity-50 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow-sm">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add new Expense
                            </h3>
                            <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="spendwise-add-new-expense">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-5 md:p-5">
                            <form className="space-y-4" action="#" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                    <input type="text" name="name" id="name" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                                    <input type="date" name="date" id="date" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                                    <input type="number" name="amount" id="amount" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                    <select name="category" id="category" className="border border-gray-300 p-2 sm: mr-4 block w-full whitespace-pre rounded-lg p-1 pr-10 outline-none focus:shadow sm:text-sm" onChange={handleChange}>
                                        <option value="income">Income</option>
                                        <option value="expense">Expense</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="expense_type" className="block mb-2 text-sm font-medium text-gray-900">Expense Type</label>
                                    <select name="expense_type" id="expense_type" className="border border-gray-300 p-2 sm: mr-4 block w-full whitespace-pre rounded-lg p-1 pr-10 outline-none focus:shadow sm:text-sm" onChange={handleChange}>
                                        <option value="food">Food</option>
                                        <option value="travel">Travel</option>
                                        <option value="entertainment">Entertainment</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="upi_id" className="block mb-2 text-sm font-medium text-gray-900">UPI ID (Optional)</label>
                                    <input type="text" name="upi_id" id="upi_id" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                </div>
                                <div>
                                    <label htmlFor="transaction_id" className="block mb-2 text-sm font-medium text-gray-900">Transaction ID (Optional)</label>
                                    <input type="text" name="transaction_id" id="transaction_id" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">Add Expense</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="spendwise-transactions-screen mx-auto mt-8 max-w-screen-lg px-2">
                {/* Upper section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4">
                    <p className="flex-1 text-2xl font-bold text-gray-900">
                        Transaction History
                    </p>
                    <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Add new Expense */}
                        <button id="add-new-expense" className="bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 cursor-pointer" data-modal-target="spendwise-add-new-expense" data-modal-toggle="spendwise-add-new-expense">
                            <FiPlus size={18} /> Add New Expense
                        </button>

                        {/* Sort */}
                        <div className="flex items-center">
                            <label
                                htmlFor=""
                                className="mr-2 flex-shrink-0 text-sm font-medium text-gray-900"
                            >
                                {" "}
                                Sort by:{" "}
                            </label>
                            <select
                                name=""
                                className="p-2 block w-full sm:w-auto rounded-lg bg-white text-gray-900 text-sm focus:shadow"
                            >
                                <option className="whitespace-no-wrap text-sm">Recent</option>
                            </select>
                        </div>

                        {/* Export to CSV */}
                        <button
                            type="button"
                            className="inline-flex cursor-pointer items-center rounded-lg bg-white py-2 px-3 text-center text-sm font-medium text-gray-800 shadow hover:bg-gray-100 focus:shadow"
                            onClick={() => exportToCSV(transactions)}
                        >
                            <svg
                                className="mr-1 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    className=""
                                />
                            </svg>
                            Export to CSV
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="mt-6 overflow-hidden rounded-xl bg-white shadow">
                    <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                        <thead className="hidden border-b lg:table-header-group">
                            <tr>
                                <td
                                    className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"
                                >
                                    Name
                                </td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                                    Date
                                </td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                                    Amount
                                </td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                                    UPI ID
                                </td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                                    Transaction ID
                                </td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                                    Category
                                </td>
                                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">
                                    Action
                                </td>
                            </tr>
                        </thead>
                        <tbody className="lg:border-gray-300">

                            {transactions && transactions.length > 0 ? (
                                transactions.map((transaction, index) => (
                                    <tr key={index} className="border-b last:border-b-0">
                                        {/* Name */}
                                        <td className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                                            {transaction.name}
                                            <div className="mt-1 lg:hidden">
                                                <p className="font-normal text-gray-500">
                                                    {new Date(transaction.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Date (only visible on large screens) */}
                                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </td>

                                        {/* Amount */}
                                        <td className={`whitespace-no-wrap py-4 px-6 text-right text-sm lg:text-left ${transaction.category == "income" ? "text-green-900" : "text-red-900"}`}>
                                            {transaction.category == "income" ? "+  " : "-  "} ${transaction.amount.toFixed(2)}
                                        </td>

                                        {/* UPI ID */}
                                        <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                                            {transaction.upi_id || "N/A"}
                                        </td>

                                        {/* Transaction ID */}
                                        <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                                            {transaction.transaction_id || "N/A"}
                                            <div className={`flex mt-1 ml-auto w-fit items-center rounded-full ${getStatusColor(transaction.category)} py-2 px-3 text-left text-xs font-medium text-white lg:hidden`}>
                                                {transaction.category}
                                            </div>
                                        </td>

                                        {/* Status (only visible on large screens) */}
                                        <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                                            <div className={`inline-flex items-center rounded-full ${getStatusColor(transaction.expense_type)} py-2 px-3 text-xs text-white`}>
                                                {transaction.expense_type}
                                            </div>
                                        </td>

                                        <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-500 sm:px-6 flex gap-2">
                                            {/* Edit Icon */}
                                            <svg className="cursor-pointer h-5 w-5 text-yellow-500" onClick={() => openEditModal(transaction)} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>

                                            {/* Delete Icon */}
                                            <svg className="cursor-pointer h-5 w-5 text-red-500" onClick={() => deleteTransaction(transaction._id)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4 text-gray-500">No transactions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};