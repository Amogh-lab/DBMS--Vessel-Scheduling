import React, { useState } from 'react';
import { Package, TrendingUp, AlertTriangle, Plus } from 'lucide-react';

const Plants = () => {
  const [plants] = useState([
    {
      id: 1,
      name: 'Steel Manufacturing Plant A',
      location: 'Mumbai',
      rawMaterialDemand: 45000,
      inventoryStatus: 78,
      priorityLevel: 'High',
      upcomingDeliveries: 3,
      lastDelivery: '2024-12-20',
      contactPerson: 'Rajesh Kumar'
    },
    {
      id: 2,
      name: 'Oil Refinery B',
      location: 'Chennai',
      rawMaterialDemand: 60000,
      inventoryStatus: 45,
      priorityLevel: 'Critical',
      upcomingDeliveries: 2,
      lastDelivery: '2024-12-22',
      contactPerson: 'Priya Sharma'
    },
    {
      id: 3,
      name: 'Chemical Plant C',
      location: 'Vizag',
      rawMaterialDemand: 30000,
      inventoryStatus: 85,
      priorityLevel: 'Medium',
      upcomingDeliveries: 1,
      lastDelivery: '2024-12-23',
      contactPerson: 'Amit Patel'
    },
    {
      id: 4,
      name: 'Cement Factory D',
      location: 'Cochin',
      rawMaterialDemand: 50000,
      inventoryStatus: 62,
      priorityLevel: 'High',
      upcomingDeliveries: 4,
      lastDelivery: '2024-12-21',
      contactPerson: 'Sneha Reddy'
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getInventoryColor = (status) => {
    if (status >= 70) return 'bg-green-500';
    if (status >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Plant Operations</h2>
            <p className="text-gray-600 text-sm mt-1">Manage plant-level requirements and inventory</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <Plus size={18} />
            <span>Add Plant</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Plants</p>
              <p className="text-2xl font-bold text-gray-800">{plants.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Critical Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {plants.filter(p => p.priorityLevel === 'Critical').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Avg Inventory</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(plants.reduce((acc, p) => acc + p.inventoryStatus, 0) / plants.length)}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Demand</p>
              <p className="text-2xl font-bold text-purple-600">
                {(plants.reduce((acc, p) => acc + p.rawMaterialDemand, 0) / 1000).toFixed(0)}K MT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plants.map(plant => (
          <div key={plant.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            {/* Plant Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{plant.name}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  📍 {plant.location}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(plant.priorityLevel)}`}>
                {plant.priorityLevel}
              </span>
            </div>

            {/* Plant Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600 text-xs mb-1">Raw Material Demand</p>
                <p className="text-lg font-bold text-gray-800">{plant.rawMaterialDemand.toLocaleString()} MT</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600 text-xs mb-1">Upcoming Deliveries</p>
                <p className="text-lg font-bold text-gray-800">{plant.upcomingDeliveries}</p>
              </div>
            </div>

            {/* Inventory Status */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Inventory Status</span>
                <span className={`text-sm font-bold ${
                  plant.inventoryStatus >= 70 ? 'text-green-600' :
                  plant.inventoryStatus >= 50 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {plant.inventoryStatus}%
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all ${getInventoryColor(plant.inventoryStatus)}`}
                  style={{ width: `${plant.inventoryStatus}%` }}
                ></div>
              </div>
              {plant.inventoryStatus < 50 && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertTriangle size={12} />
                  Low inventory - urgent delivery needed
                </p>
              )}
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Delivery:</span>
                <span className="font-medium text-gray-800">{plant.lastDelivery}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Contact Person:</span>
                <span className="font-medium text-gray-800">{plant.contactPerson}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition font-medium text-sm">
                View Details
              </button>
              <button className="flex-1 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition font-medium text-sm">
                Schedule Delivery
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Demand Forecast */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Demand Forecast</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="text-center">
              <p className="text-xs text-gray-600 mb-2">{day}</p>
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-sm font-bold text-gray-800">{(Math.random() * 50 + 30).toFixed(0)}K</p>
                <p className="text-xs text-gray-600">MT</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plants;