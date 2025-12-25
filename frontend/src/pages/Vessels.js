import React, { useState } from 'react';
import { Ship, Plus, Search, Filter } from 'lucide-react';

const Vessels = () => {
  const [vessels] = useState([
    { id: 1, name: 'Pacific Trader', type: 'Cargo', capacity: 50000, eta: '2024-12-25 14:30', status: 'On Route', location: 'Indian Ocean', fuelStatus: '85%' },
    { id: 2, name: 'Atlantic Express', type: 'Container', capacity: 75000, eta: '2024-12-24 18:00', status: 'Scheduled', location: 'Arabian Sea', fuelStatus: '92%' },
    { id: 3, name: 'Nordic Carrier', type: 'Bulk', capacity: 60000, eta: '2024-12-26 09:15', status: 'Delayed', location: 'Bay of Bengal', fuelStatus: '78%' },
    { id: 4, name: 'Mediterranean Queen', type: 'Tanker', capacity: 80000, eta: '2024-12-27 10:00', status: 'On Route', location: 'Red Sea', fuelStatus: '88%' },
    { id: 5, name: 'Baltic Star', type: 'Cargo', capacity: 55000, eta: '2024-12-28 16:30', status: 'Scheduled', location: 'Persian Gulf', fuelStatus: '95%' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Route': return 'bg-blue-100 text-blue-700';
      case 'Scheduled': return 'bg-green-100 text-green-700';
      case 'Delayed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredVessels = vessels.filter(vessel =>
    vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vessel.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Vessel Management</h2>
            <p className="text-gray-600 text-sm mt-1">Manage and track all vessels in the fleet</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <Plus size={18} />
              <span>Add Vessel</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search vessels by name or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Vessels Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vessel Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Capacity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ETA</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fuel</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVessels.map(vessel => (
                <tr key={vessel.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Ship className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-800">{vessel.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{vessel.type}</td>
                  <td className="px-6 py-4 text-gray-600">{vessel.capacity.toLocaleString()} MT</td>
                  <td className="px-6 py-4 text-gray-600">{vessel.location}</td>
                  <td className="px-6 py-4 text-gray-600">{vessel.eta}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: vessel.fuelStatus }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{vessel.fuelStatus}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vessel.status)}`}>
                      {vessel.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Vessels</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{vessels.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">On Route</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {vessels.filter(v => v.status === 'On Route').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Scheduled</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {vessels.filter(v => v.status === 'Scheduled').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Delayed</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {vessels.filter(v => v.status === 'Delayed').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Vessels;