import { useState } from "react";

export default function Vessel() {
  const [vessels, setVessels] = useState([]);

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-4">Manage Vessels</h2>

      {/* Add Vessel */}
      <div className="bg-slate-800 p-6 rounded-xl mb-6">
        <h3 className="mb-3 text-cyan-300">Add New Vessel</h3>

        <div className="grid grid-cols-4 gap-4">
          <input className="bg-slate-900 p-2 rounded" placeholder="Vessel Name" />
          <input className="bg-slate-900 p-2 rounded" placeholder="Type" />
          <input className="bg-slate-900 p-2 rounded" placeholder="Capacity" />
          <button className="bg-cyan-600 rounded p-2 hover:bg-cyan-700">Add</button>
        </div>
      </div>

      {/* Vessel Table */}
      <div className="bg-slate-800 p-6 rounded-xl">
        <table className="w-full text-left">
          <thead className="text-gray-400">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-600">
              <td>Ocean Star</td>
              <td>Container</td>
              <td>1200</td>
              <td className="text-green-400">Docked</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
