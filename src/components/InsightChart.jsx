import { Doughnut } from "react-chartjs-2";

export default function InsightChart({ chartData }) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
            <h2 className="text-lg font-semibold mb-4">Insight</h2>
            <Doughnut data={chartData} options={{ cutout: "75%" }} />
        </div>
    );
}
