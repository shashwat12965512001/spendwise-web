export default function BalanceCard({ balance }) {
    return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-4 shadow-lg mb-4">
            <p className="text-sm">Montly Budget</p>
            <h1 className="text-3xl font-bold mt-1">₹ {balance.toLocaleString()}</h1>
            <div className="mt-2 text-xs">•••• 8398</div>
        </div>
    );
}
