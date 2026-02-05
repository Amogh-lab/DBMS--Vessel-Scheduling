

import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, AlertTriangle, Plus, RefreshCw, AlertCircle } from 'lucide-react';
import { PostgresAPI } from '../services/api';

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlant, setNewPlant] = useState({
    plant_id: '',
    plant_name: '',
    raw_material_demand: '',
    inventory_status: 'Normal', // must match DB CHECK
    priority_level: 3           // 1–5
  });

  const [selectedPlant, setSelectedPlant] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role;
  const inventoryMap = {
    Critical: { percent: 20, color: 'bg-red-500', text: 'text-red-600' },
    Low: { percent: 40, color: 'bg-red-500', text: 'text-red-600' },
    Normal: { percent: 65, color: 'bg-yellow-500', text: 'text-yellow-600' },
    High: { percent: 90, color: 'bg-green-500', text: 'text-green-600' }
    };


    const priorityMap = {
        1: { label: 'Very Low', color: 'bg-gray-100 text-gray-700 border-gray-300' },
        2: { label: 'Low', color: 'bg-green-100 text-green-700 border-green-300' },
        3: { label: 'Normal', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
        4: { label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-300' },
        5: { label: 'Critical', color: 'bg-red-100 text-red-700 border-red-300' }
      };



  useEffect(() => {
    fetchPlants();
  }, []);

const fetchPlants = async () => {
  try {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    let response;

    if (user?.role === 'PORT_AUTHORITY') {
      response = await PostgresAPI.get('/plants');
      setPlants(response.data);
    }

    else if (user?.role === 'PLANT_MANAGER' && user.plant_id) {
      response = await PostgresAPI.get(`/plants/${user.plant_id}`);
      setPlants([response.data]); // wrap SINGLE plant into array
    }

    else {
      setPlants([]); // no access
    }

    setError('');
  } catch (err) {
    console.error('Error fetching plants:', err);
    setError('Failed to load plants');
    setPlants([]);
  } finally {
    setLoading(false);
  }
};


  const handleAddPlant = async (e) => {
    e.preventDefault();
    try {
      await PostgresAPI.post('/plants', newPlant);
      setShowAddModal(false);
      setNewPlant({
        plant_id: '',
        plant_name: '',
        raw_material_demand: Number(newPlant.raw_material_demand),
        inventory_status: '',
        priority_level: Number(newPlant.priority_level)
      });
      fetchPlants();
      alert('Plant added successfully!');
    } catch (err) {
      console.error('Error adding plant:', err);
      alert('Failed to add plant: ' + (err.response?.data?.message || err.message));
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading plants...</p>
        </div>
      </div>
    );
  }
  const criticalPriorityCount = plants.filter(
  plant => Number(plant.priority_level) === 5
).length;


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Plant Operations</h2>
            <p className="text-gray-600 text-sm mt-1">Manage plant-level requirements and inventory</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={fetchPlants}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-600"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
            {userRole === 'PORT_AUTHORITY' && (
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={18} />
                <span>Add Plant</span>
              </button>
            )}

          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Error Loading Data</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

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
                {criticalPriorityCount}
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
                {plants.length > 0 ? Math.round(plants.reduce((acc, p) => acc + (parseFloat(p.inventory_status) || 0), 0) / plants.length) : 0}%
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
                {plants.length > 0 ? (plants.reduce((acc, p) => acc + (p.raw_material_demand || 0), 0) / 1000).toFixed(0) : 0}K MT
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plants Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {plants.map(plant => {
    const priority = priorityMap[plant.priority_level];
    const inventory =
      inventoryMap[plant.inventory_status] || inventoryMap.Low;

    return (
      <div
        key={plant.plant_id}
        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
      >
        {/* Plant Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {plant.plant_name}
            </h3>
            <p className="text-sm text-gray-600">ID: {plant.plant_id}</p>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium border ${priority.color}`}
          >
            {priority.label}
          </span>
        </div>

        {/* Plant Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600 text-xs mb-1">Raw Material Demand</p>
            <p className="text-lg font-bold text-gray-800">
              {plant.raw_material_demand?.toLocaleString()} MT
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-600 text-xs mb-1">Inventory Status</p>
            <p className="text-lg font-bold text-gray-800">
              {plant.inventory_status}
            </p>
          </div>
        </div>

        {/* Inventory Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Inventory Level</span>
            <span className={`text-sm font-bold ${inventory.text}`}>
              {plant.inventory_status}
            </span>
          </div>

          <div className="bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${inventory.color}`}
              style={{ width: `${inventory.percent}%` }}
            />
          </div>

          {(plant.inventory_status === 'Low' ||
            plant.inventory_status === 'Critical') && (
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertTriangle size={12} />
              Low inventory – urgent delivery needed
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 flex gap-2">
          <button
            onClick={() => setSelectedPlant(plant)}
            className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    );
  })}
</div>


      {/* Add Plant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Plant</h3>
            <form onSubmit={handleAddPlant} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plant ID *</label>
                <input
                  type="text"
                  required
                  value={newPlant.plant_id}
                  onChange={(e) => setNewPlant({...newPlant, plant_id: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
                  placeholder="e.g., PL001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plant Name *</label>
                <input
                  type="text"
                  required
                  value={newPlant.plant_name}
                  onChange={(e) => setNewPlant({...newPlant, plant_name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
                  placeholder="e.g., Steel Manufacturing Plant A"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Raw Material Demand (MT) *</label>
                <input
                  type="number"
                  required
                  value={newPlant.raw_material_demand}
                  onChange={(e) => setNewPlant({...newPlant, raw_material_demand: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
                  placeholder="e.g., 45000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Inventory Status (%) *</label>
                <select
                  value={newPlant.inventory_status}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, inventory_status: e.target.value })
                  }
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level *</label>
                <select
                  value={newPlant.priority_level}
                  onChange={(e) =>
                    setNewPlant({ ...newPlant, priority_level: Number(e.target.value) })
                  }
                >
                  <option value={1}>1 - Very Low</option>
                  <option value={2}>2 - Low</option>
                  <option value={3}>3 - Normal</option>
                  <option value={4}>4 - High</option>
                  <option value={5}>5 - Critical</option>
                </select>

              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition   text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Plant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedPlant && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">
          Plant Details
        </h3>
        <button
          onClick={() => setSelectedPlant(null)}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Plant ID</span>
          <span className="font-medium text-gray-800">{selectedPlant.plant_id}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Plant Name</span>
          <span className="font-medium text-gray-800">{selectedPlant.plant_name}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Raw Material Demand</span>
          <span className="font-medium text-gray-800">
            {selectedPlant.raw_material_demand?.toLocaleString()} MT
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Inventory Status</span>
          <span className="font-medium text-gray-800">{selectedPlant.inventory_status}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Priority Level</span>
          <span className="font-medium text-gray-800">
            {priorityMap[selectedPlant.priority_level]?.label}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Created At</span>
          <span className="font-medium text-gray-800">
            {selectedPlant.created_at
              ? new Date(selectedPlant.created_at).toLocaleString()
              : 'N/A'}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setSelectedPlant(null)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Plants;