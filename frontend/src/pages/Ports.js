import React, { useState } from 'react';
import { Anchor, Plus, TrendingUp, AlertCircle } from 'lucide-react';

const Ports = () => {
  const [ports] = useState([
    { 
      id: 1, 
      name: 'Mumbai Port', 
      berthCapacity: 12, 
      currentQueue: 3, 
      efficiency: 92, 
      weather: 'Clear',
      vesselsToday: 8,
      avgWaitTime: '2.5h'
    },
    { 
      id: 2, 
      name: 'Chennai Port', 
      berthCapacity: 10, 
      currentQueue: 5, 
      efficiency: 88, 
      weather: 'Cloudy',
      vesselsToday: 6,
      avgWaitTime: '3.2h'
    },
    { 
      id: 3, 
      name: 'Vizag Port', 
      berthCapacity: 8, 
      currentQueue: 2, 
      efficiency: 95, 
      weather: 'Clear',
      vesselsToday: 5,
      avgWaitTime: '1.8h'
    },
    { 
      id: 4, 
      name: 'Cochin Port', 
      berthCapacity: 9, 
      currentQueue: 4, 
      efficiency: 90, 
      weather: 'Rainy',
      vesselsToday: 7,
      avgWaitTime: '2.9h'
    }
  ]);

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear': return '☀️';
      case 'Cloudy': return '⛅';
      case 'Rainy': return '🌧️';
      default: return '🌤️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Port Management</h2>
            <p className="text-gray-600 text-sm mt-1">Monitor and manage port operations</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <Plus size={18} />
            <span>Add Port</span>
          </button>
        </div>
      </div>

      {/* Port Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ports.map(port => (
          <div key={port.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            {/* Port Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Anchor className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{port.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <span>{getWeatherIcon(port.weather)}</span>
                    <span>{port.weather}</span>
                  </p>
                </div>
              </div>
              {port.currentQueue > port.berthCapacity * 0.7 && (
                <AlertCircle className="w-5 h-5 text-orange-500" />
              )}
            </div>

            {/* Port Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600 text-sm">Berth Capacity</p>
                <p className="text-xl font-bold text-gray-800">{port.berthCapacity}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600 text-sm">Current Queue</p>
                <p className="text-xl font-bold text-gray-800">{port.currentQueue}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600 text-sm">Vessels Today</p>
                <p className="text-xl font-bold text-gray-800">{port.vesselsToday}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600 text-sm">Avg Wait Time</p>
                <p className="text-xl font-bold text-gray-800">{port.avgWaitTime}</p>
              </div>
            </div>

            {/* Efficiency Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Port Efficiency</span>
                <span className={`text-sm font-bold ${getEfficiencyColor(port.efficiency)}`}>
                  {port.efficiency}%
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all ${
                    port.efficiency >= 90 ? 'bg-green-500' :
                    port.efficiency >= 80 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${port.efficiency}%` }}
                ></div>
              </div>
            </div>

            {/* Queue Status */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Queue Status</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                port.currentQueue < port.berthCapacity * 0.5 ? 'bg-green-100 text-green-700' :
                port.currentQueue < port.berthCapacity * 0.8 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {port.currentQueue < port.berthCapacity * 0.5 ? 'Light' :
                 port.currentQueue < port.berthCapacity * 0.8 ? 'Moderate' :
                 'Heavy'}
              </span>
            </div>

            {/* Action Button */}
            <button className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Overall Statistics */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          Overall Port Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-600 text-sm">Total Ports</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{ports.length}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-gray-600 text-sm">Avg Efficiency</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {(ports.reduce((acc, p) => acc + p.efficiency, 0) / ports.length).toFixed(1)}%
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-gray-600 text-sm">Total Capacity</p>
            <p className="text-3xl font-bold text-purple-600 mt-1">
              {ports.reduce((acc, p) => acc + p.berthCapacity, 0)}
            </p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-gray-600 text-sm">Current Queue</p>
            <p className="text-3xl font-bold text-orange-600 mt-1">
              {ports.reduce((acc, p) => acc + p.currentQueue, 0)}
            </p>
          </div>
        </div>
        </div>
    </div>
  );
};
export default Ports;