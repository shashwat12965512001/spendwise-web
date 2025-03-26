import { motion } from "framer-motion";

export default function RecentTransactions() {
    // Dummy transactions data
    const transactions = [
        { id: 1, category: "Food", amount: 20, type: "expense", date: "2025-03-25" },
        { id: 2, category: "Salary", amount: 3000, type: "income", date: "2025-03-24" },
        { id: 3, category: "Shopping", amount: 150, type: "expense", date: "2025-03-23" },
        { id: 4, category: "Freelance", amount: 500, type: "income", date: "2025-03-22" },
        { id: 5, category: "Transport", amount: 50, type: "expense", date: "2025-03-21" },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <ul className="divide-y divide-gray-200">
                {transactions.map((txn, index) => (
                    <motion.li
                        key={txn.id}
                        className="flex justify-between items-center py-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <div>
                            <p className="text-sm font-medium">{txn.category}</p>
                            <p className="text-xs text-gray-500">{txn.date}</p>
                        </div>
                        <p className={`font-bold ${txn.type === "income" ? "text-green-500" : "text-red-500"}`}>
                            {txn.type === "income" ? "+" : "-"}${txn.amount}
                        </p>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}
