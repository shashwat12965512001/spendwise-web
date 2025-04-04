import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

// Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Card({ title, amount, percentage, trend, color }) {
    const chartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                data: trend,
                borderColor: color === "green" ? "#22C55E" : color === "red" ? "#EF4444" : "#3B82F6",
                backgroundColor: "transparent",
                tension: 0.4,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold">${amount}</p>
            <p className={percentage >= 0 ? "text-green-500" : "text-red-500"}>
                {percentage >= 0 ? `↑ ${percentage}%` : `↓ ${Math.abs(percentage)}%`} vs last month
            </p>
            <div className="mt-2">
                <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
        </div>
    );
}
