export default function TransactionList({ transactions }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
            <ul className="divide-y divide-gray-200">
                {
                    transactions.length > 0 ? (
                        transactions.map((txn, idx) => (
                            <li key={idx} className="py-2 flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{txn.name}</p>
                                    <p className="text-sm text-gray-500">{new Date(txn.date).toLocaleDateString('en-GB')}</p>
                                </div>
                                <p className={`font-bold ${txn.category == "expense" ? 'text-red-600' : 'text-green-600'}`}>
                                    {txn.category == "expense" ? '-' : '+'} ₹{Math.abs(txn.amount).toLocaleString()}
                                </p>
                            </li>
                        ))
                    ) : (
                        <li className="py-2 flex justify-between items-center">
                            <p className="text-gray-500">No recent transactions</p>
                        </li>
                    )}
            </ul>
        </div>
    );
}
