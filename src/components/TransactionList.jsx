export default function TransactionList({ transactions }) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Transactions</h2>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {transactions.map((txn, idx) => (
                    <li key={idx} className="py-2 flex justify-between items-center">
                        <div>
                            <p className="font-medium">{txn.name}</p>
                            <p className="text-sm text-gray-500">{new Date(txn.date).toLocaleDateString('en-GB')}</p>
                        </div>
                        <p className={`font-bold ${txn.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ₹ {Math.abs(txn.amount).toLocaleString()}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
