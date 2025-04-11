"use client";

import { FiPlus } from "react-icons/fi";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import API_BASE_URL from "../utils/apiConfig";
import Papa from "papaparse";
import useIsMobile from "../hooks/useIsMobile";
import TransactionsMobile from "@/components/TransactionsMobile";
import Loader from "@/components/Loader";

export default () => {
    useAuth();

    const isMobile = useIsMobile();
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

        setToken(storedToken);
        if (storedUser?.id) {
            setUserId(storedUser.id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            fetchTransactions(); // ✅ Now runs when both are ready
        }
    }, [userId]);

    // State to store transactions
    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchTransactions = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/transactions/all/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data.error || "Failed to fetch transactions");
                return;
            }

            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const deleteTransaction = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/transactions/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
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
        try {
            const response = await fetch(`${API_BASE_URL}/api/transactions/update/${editTransaction._id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...editTransaction,
                    user_id: userId,
                }),
            });

            console.log("editTransaction:", JSON.stringify(editTransaction, null, 2));
            const updatedTransaction = await response.json();
            console.log("updatedTransaction:", JSON.stringify(updatedTransaction, null, 2));
            if (!response.ok) {
                console.log("Failed to update transaction");
            }

            // Update the transaction in state
            setTransactions(transactions.map((t) => (t._id === updatedTransaction._id ? updatedTransaction.transaction : t)));

            window.location.reload();
        } catch (error) {
            console.error("Error updating transaction:", error);
        }
    };

    const openEditModal = (transaction) => {
        setEditTransaction(transaction);
        setIsModalOpen(true);
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
                },
                body: JSON.stringify({
                    ...expense,
                    user_id: userId,
                }),
            });

            if (!response.ok) {
                console.log("Failed to add expense");
            }

            const data = await response.json();
            console.log("Expense added:", data);

            // Clear the form
            setExpense({ name: "", date: "", amount: "", category: "", expense_type: "", upi_id: "", transaction_id: "" });

            // Close the modal (optional)
            closeModal("spendwise-add-new-expense");

            // window.location.reload();
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

    const openModal = (id) => {
        console.log("openModal called with id:", id);
        const modal = document.getElementById(id);
        modal?.classList.remove('hidden');
        modal?.classList.add('flex'); // If you're using flexbox to center
    };

    const closeModal = (id) => {
        console.log("closeModal called with id:", id);
        const modal = document.getElementById(id);
        modal?.classList.remove('flex');
        modal?.classList.add('hidden');
        setIsModalOpen(false);
    };

    if (!ready) return <Loader />;

    return (
        <>
            {/* Edit Transaction Modal */}
            <div id="spendwise-update-expense" tabIndex="-1" className={`${isModalOpen ? "flex" : "hidden"} bg-gray-400 bg-opacity-50 overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Edit Transaction
                            </h3>
                            <button onClick={() => closeModal('spendwise-update-expense')} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg className="w-3 h-3"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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
                                    <input type="text" value={editTransaction && editTransaction.name || ""} onChange={(e) => setEditTransaction({ ...editTransaction, name: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                                    <input type="text" value={new Date(editTransaction && editTransaction.date || "").toLocaleDateString()} onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                                    <input type="number" value={editTransaction && editTransaction.amount || ""} onChange={(e) => setEditTransaction({
                                        ...editTransaction,
                                        amount: parseFloat(e.target.value)
                                    })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">UPI ID</label>
                                    <input type="text" value={editTransaction && editTransaction.upi_id || ""} onChange={(e) => setEditTransaction({ ...editTransaction, upi_id: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900">Transaction ID</label>
                                    <input type="text" value={editTransaction && editTransaction.transaction_id || ""} onChange={(e) => setEditTransaction({ ...editTransaction, transaction_id: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                                </div>
                                <button type="button" onClick={updateTransaction} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add new Expense Modal */}
            <div id="spendwise-add-new-expense" tabIndex="-1" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 hidden">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add new Expense
                            </h3>
                            <button onClick={() => closeModal("spendwise-add-new-expense")} className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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

            {
                isMobile ? (
                    <TransactionsMobile transactions={transactions} deleteTransaction={deleteTransaction} openModal={openModal} />
                ) : (
                    <div className="spendwise-transactions-screen mx-auto mt-8 max-w-screen-lg px-2">
                        {/* Upper section */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-4">
                            {/* Heading */}
                            <p className="text-2xl font-bold text-gray-900 sm:flex-1 text-center sm:text-left">
                                Transaction History
                            </p>

                            {/* Actions Section */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4 w-full sm:w-auto">

                                {/* Add new Expense */}
                                <button
                                    onClick={() => openModal("spendwise-add-new-expense")}
                                    id="add-new-expense"
                                    className="w-full sm:w-auto bg-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
                                >
                                    <FiPlus size={18} /> Add New Expense
                                </button>

                                {/* Sort */}
                                <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-auto">
                                    <label className="text-sm font-medium text-gray-900 mb-1 sm:mb-0 sm:mr-2">
                                        Sort by:
                                    </label>
                                    <select
                                        className="p-2 rounded-lg bg-white text-gray-900 text-sm shadow w-full sm:w-auto"
                                    >
                                        <option>Recent</option>
                                        {/* Add more options here if needed */}
                                    </select>
                                </div>

                                {/* Export to CSV */}
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center w-full sm:w-auto rounded-lg bg-white py-2 px-3 text-sm font-medium text-gray-800 shadow hover:bg-gray-100"
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
                                        />
                                    </svg>
                                    Export to CSV
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="mt-6 overflow-hidden rounded-xl bg-white shadow">
                            <div className="hidden lg:block">
                                {/* Desktop Table */}
                                <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
                                    <thead className="border-b">
                                        <tr>
                                            {["Name", "Date", "Amount", "UPI ID", "Transaction ID", "Category", "Action"].map((title, i) => (
                                                <td key={i} className="py-4 text-sm font-medium text-gray-500 sm:px-6">{title}</td>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactions && transactions.length > 0 ? (
                                            transactions.map((transaction, index) => (
                                                <tr key={index} className="border-b last:border-b-0">
                                                    <td className="py-4 text-sm font-bold text-gray-900 sm:px-6">
                                                        {transaction.name}
                                                    </td>
                                                    <td className="py-4 text-sm text-gray-500 sm:px-6">
                                                        {new Date(transaction.date).toLocaleDateString()}
                                                    </td>
                                                    <td className={`py-4 px-6 text-sm text-right lg:text-left ${transaction.category === "income" ? "text-green-900" : "text-red-900"}`}>
                                                        {transaction.category === "income" ? "+ " : "- "} ${transaction.amount.toFixed(2)}
                                                    </td>
                                                    <td className="py-4 px-6 text-sm text-gray-600 text-right lg:text-left">
                                                        {transaction.upi_id || "N/A"}
                                                    </td>
                                                    <td className="py-4 px-6 text-sm text-gray-600 text-right lg:text-left">
                                                        {transaction.transaction_id || "N/A"}
                                                    </td>
                                                    <td className="py-4 text-sm text-gray-500 sm:px-6">
                                                        <div className={`inline-flex items-center rounded-full ${getStatusColor(transaction.expense_type)} py-2 px-3 text-xs text-white`}>
                                                            {transaction.expense_type}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 text-sm text-gray-500 sm:px-6">
                                                        <div className="flex gap-2">
                                                            {/* Edit Icon */}
                                                            <svg className="cursor-pointer h-5 w-5 text-yellow-500" onClick={() => openEditModal(transaction)} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>

                                                            {/* Delete Icon */}
                                                            <svg className="cursor-pointer h-5 w-5 text-red-500" onClick={() => deleteTransaction(transaction._id)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center py-4 text-gray-500">No transactions found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile - Card layout */}
                            <div className="block lg:hidden divide-y divide-gray-200">
                                {transactions && transactions.length > 0 ? (
                                    transactions.map((transaction, index) => (
                                        <div key={index} className="p-4">
                                            <div className="flex justify-between items-center">
                                                <div className="font-bold text-gray-900">{transaction.name}</div>
                                                <div className={`text-sm ${transaction.category === "income" ? "text-green-900" : "text-red-900"}`}>
                                                    {transaction.category === "income" ? "+ " : "- "} ${transaction.amount.toFixed(2)}
                                                </div>
                                            </div>
                                            <div className="mt-1 text-sm text-gray-500">
                                                {new Date(transaction.date).toLocaleDateString()}
                                            </div>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <strong>UPI ID:</strong> {transaction.upi_id || "N/A"}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                <strong>Txn ID:</strong> {transaction.transaction_id || "N/A"}
                                            </div>
                                            <div className="mt-2">
                                                <span className={`inline-block rounded-full ${getStatusColor(transaction.expense_type)} text-white px-3 py-1 text-xs`}>
                                                    {transaction.expense_type}
                                                </span>
                                            </div>
                                            <div className="mt-3 flex gap-4">
                                                <svg className="cursor-pointer h-5 w-5 text-yellow-500" onClick={() => openEditModal(transaction)} />
                                                <svg className="cursor-pointer h-5 w-5 text-red-500" onClick={() => deleteTransaction(transaction._id)} />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 text-gray-500">No transactions found</div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};