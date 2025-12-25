import React from 'react';
import { Ship, Anchor, Calendar, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const vessels = [
    { id: 1, name: 'Pacific Trader', type: 'Cargo', capacity: 50000, eta: '2024-12-25 14:30', status: 'On Route', location: 'Indian Ocean' },
    { id: 2, name: 'Atlantic Express', type: 'Container', capacity: 75000, eta: '2024-12-24 18:00', status: 'Scheduled', location: 'Arabian Sea' },
    { id: 3, name: 'Nordic Carrier', type: 'Bulk', capacity: 60000, eta: '2024-12-26 09:15', status: 'Delayed', location: 'Bay of Bengal' }
  ];

  const ports = [
    { id: 1, name: 'Mumbai Port', berthCapacity: 12, currentQueue: 3, efficiency: 92, weather: 'Clear' },
    { id: 2, name: 'Chennai Port', berthCapacity: 10, currentQueue: 5, efficiency: 88, weather: 'Cloudy' },
    { id: 3, name: 'Vizag Port', berthCapacity: 8, currentQueue: 2, efficiency: 95, weather: 'Clear' }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 transform hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Vessels</p>
              <p className="text-3xl font-bold text-gray-800">24</p>
            </div>
            <Ship className="w-12 h-12 text-blue-500" />
          </div>
          <p className="text-green-600 text-sm mt-2">↑ 12% from last week</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-cyan-500 transform hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Port Efficiency</p>
              <p className="text-3xl font-bold text-gray-800">91.7%</p>
            </div>
            <Anchor className="w-12 h-12 text-cyan-500" />
          </div>
          <p className="text-green-600 text-sm mt-2">↑ 3.2% improvement</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500 transform hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Scheduled Today</p>
              <p className="text-3xl font-bold text-gray-800">8</p>
            </div>
            <Calendar className="w-12 h-12 text-purple-500" />
          </div>
          <p className="text-gray-600 text-sm mt-2">5 arrivals, 3 departures</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500 transform hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Turnaround</p>
              <p className="text-3xl font-bold text-gray-800">18.5h</p>
            </div>
            <TrendingUp className="w-12 h-12 text-orange-500" />
          </div>
          <p className="text-green-600 text-sm mt-2">↓ 2.3h reduced</p>
        </div>
      </div>

      {/* Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vessel Activity */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Vessel Activity</h3>
          <div className="space-y-3">
            {vessels.map(vessel => (
              <div key={vessel.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center space-x-3">
                  <Ship className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-800">{vessel.name}</p>
                    <p className="text-sm text-gray-600">{vessel.location}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  vessel.status === 'On Route' ? 'bg-blue-100 text-blue-700' :
                  vessel.status === 'Scheduled' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {vessel.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Port Status Overview */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Port Status Overview</h3>
          <div className="space-y-3">
            {ports.map(port => (
              <div key={port.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-800">{port.name}</p>
                  <span className="text-sm text-gray-600">{port.weather}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Queue: {port.currentQueue}/{port.berthCapacity}</span>
                  <span className="text-green-600 font-medium">Efficiency: {port.efficiency}%</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${port.efficiency}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;