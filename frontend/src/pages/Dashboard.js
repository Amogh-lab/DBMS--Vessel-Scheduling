import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {

  const vesselData = {
    labels: ["Cargo", "Tanker", "Container", "Bulk Carrier"],
    datasets: [
      {
        label: "Vessel Type",
        data: [10, 5, 15, 7],
        backgroundColor: ["#22d3ee", "#6366f1", "#f97316", "#22c55e"],
      }
    ]
  };

  const berthData = {
    labels: ["Port A", "Port B", "Port C"],
    datasets: [
      {
        label: "Occupied Berths",
        data: [6, 4, 8],
        backgroundColor: "#38bdf8"
      }
    ]
  };

  return (
    <div className="p-6">

      {/* Top Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        
        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-400">Active Vessels</h3>
          <h1 className="text-4xl font-bold text-cyan-400">27</h1>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-400">Ports Monitored</h3>
          <h1 className="text-4xl font-bold text-green-400">5</h1>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h3 className="text-gray-400">Schedules Today</h3>
          <h1 className="text-4xl font-bold text-orange-400">13</h1>
        </div>

      </div>

      {/* Chart Section */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="mb-4 text-lg">Berth Utilization</h2>
          <Bar data={berthData} />
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow">
          <h2 className="mb-4 text-lg">Vessel Types</h2>
          <Pie data={vesselData} />
        </div>

      </div>

    </div>
  );
}
