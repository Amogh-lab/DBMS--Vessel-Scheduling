// import React, { useState } from 'react';
// import { Package, TrendingUp, AlertTriangle, Plus } from 'lucide-react';

// const Plants = () => {
//   const [plants] = useState([
//     {
//       id: 1,
//       name: 'Steel Manufacturing Plant A',
//       location: 'Mumbai',
//       rawMaterialDemand: 45000,
//       inventoryStatus: 78,
//       priorityLevel: 'High',
//       upcomingDeliveries: 3,
//       lastDelivery: '2024-12-20',
//       contactPerson: 'Rajesh Kumar'
//     },
//     {
//       id: 2,
//       name: 'Oil Refinery B',
//       location: 'Chennai',
//       rawMaterialDemand: 60000,
//       inventoryStatus: 45,
//       priorityLevel: 'Critical',
//       upcomingDeliveries: 2,
//       lastDelivery: '2024-12-22',
//       contactPerson: 'Priya Sharma'
//     },
//     {
//       id: 3,
//       name: 'Chemical Plant C',
//       location: 'Vizag',
//       rawMaterialDemand: 30000,
//       inventoryStatus: 85,
//       priorityLevel: 'Medium',
//       upcomingDeliveries: 1,
//       lastDelivery: '2024-12-23',
//       contactPerson: 'Amit Patel'
//     },
//     {
//       id: 4,
//       name: 'Cement Factory D',
//       location: 'Cochin',
//       rawMaterialDemand: 50000,
//       inventoryStatus: 62,
//       priorityLevel: 'High',
//       upcomingDeliveries: 4,
//       lastDelivery: '2024-12-21',
//       contactPerson: 'Sneha Reddy'
//     }
//   ]);

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'Critical': return 'bg-red-100 text-red-700 border-red-300';
//       case 'High': return 'bg-orange-100 text-orange-700 border-orange-300';
//       case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
//       case 'Low': return 'bg-green-100 text-green-700 border-green-300';
//       default: return 'bg-gray-100 text-gray-700 border-gray-300';
//     }
//   };

//   const getInventoryColor = (status) => {
//     if (status >= 70) return 'bg-green-500';
//     if (status >= 50) return 'bg-yellow-500';
//     return 'bg-red-500';
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">Plant Operations</h2>
//             <p className="text-gray-600 text-sm mt-1">Manage plant-level requirements and inventory</p>
//           </div>
//           <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
//             <Plus size={18} />
//             <span>Add Plant</span>
//           </button>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 p-3 rounded-lg">
//               <Package className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-gray-600 text-sm">Total Plants</p>
//               <p className="text-2xl font-bold text-gray-800">{plants.length}</p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <div className="flex items-center gap-3">
//             <div className="bg-red-100 p-3 rounded-lg">
//               <AlertTriangle className="w-6 h-6 text-red-600" />
//             </div>
//             <div>
//               <p className="text-gray-600 text-sm">Critical Priority</p>
//               <p className="text-2xl font-bold text-red-600">
//                 {plants.filter(p => p.priorityLevel === 'Critical').length}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <div className="flex items-center gap-3">
//             <div className="bg-green-100 p-3 rounded-lg">
//               <TrendingUp className="w-6 h-6 text-green-600" />
//             </div>
//             <div>
//               <p className="text-gray-600 text-sm">Avg Inventory</p>
//               <p className="text-2xl font-bold text-green-600">
//                 {Math.round(plants.reduce((acc, p) => acc + p.inventoryStatus, 0) / plants.length)}%
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <div className="flex items-center gap-3">
//             <div className="bg-purple-100 p-3 rounded-lg">
//               <Package className="w-6 h-6 text-purple-600" />
//             </div>
//             <div>
//               <p className="text-gray-600 text-sm">Total Demand</p>
//               <p className="text-2xl font-bold text-purple-600">
//                 {(plants.reduce((acc, p) => acc + p.rawMaterialDemand, 0) / 1000).toFixed(0)}K MT
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Plants Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {plants.map(plant => (
//           <div key={plant.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
//             {/* Plant Header */}
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex-1">
//                 <h3 className="text-xl font-bold text-gray-800 mb-1">{plant.name}</h3>
//                 <p className="text-sm text-gray-600 flex items-center gap-1">
//                   📍 {plant.location}
//                 </p>
//               </div>
//               <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(plant.priorityLevel)}`}>
//                 {plant.priorityLevel}
//               </span>
//             </div>

//             {/* Plant Stats Grid */}
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 text-xs mb-1">Raw Material Demand</p>
//                 <p className="text-lg font-bold text-gray-800">{plant.rawMaterialDemand.toLocaleString()} MT</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 text-xs mb-1">Upcoming Deliveries</p>
//                 <p className="text-lg font-bold text-gray-800">{plant.upcomingDeliveries}</p>
//               </div>
//             </div>

//             {/* Inventory Status */}
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-sm text-gray-600">Inventory Status</span>
//                 <span className={`text-sm font-bold ${
//                   plant.inventoryStatus >= 70 ? 'text-green-600' :
//                   plant.inventoryStatus >= 50 ? 'text-yellow-600' :
//                   'text-red-600'
//                 }`}>
//                   {plant.inventoryStatus}%
//                 </span>
//               </div>
//               <div className="bg-gray-200 rounded-full h-3">
//                 <div 
//                   className={`h-3 rounded-full transition-all ${getInventoryColor(plant.inventoryStatus)}`}
//                   style={{ width: `${plant.inventoryStatus}%` }}
//                 ></div>
//               </div>
//               {plant.inventoryStatus < 50 && (
//                 <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
//                   <AlertTriangle size={12} />
//                   Low inventory - urgent delivery needed
//                 </p>
//               )}
//             </div>

//             {/* Additional Info */}
//             <div className="border-t border-gray-200 pt-4 space-y-2">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Last Delivery:</span>
//                 <span className="font-medium text-gray-800">{plant.lastDelivery}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Contact Person:</span>
//                 <span className="font-medium text-gray-800">{plant.contactPerson}</span>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-2 mt-4">
//               <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition font-medium text-sm">
//                 View Details
//               </button>
//               <button className="flex-1 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition font-medium text-sm">
//                 Schedule Delivery
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Demand Forecast */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Demand Forecast</h3>
//         <div className="grid grid-cols-7 gap-2">
//           {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
//             <div key={day} className="text-center">
//               <p className="text-xs text-gray-600 mb-2">{day}</p>
//               <div className="bg-gray-100 rounded-lg p-3">
//                 <p className="text-sm font-bold text-gray-800">{(Math.random() * 50 + 30).toFixed(0)}K</p>
//                 <p className="text-xs text-gray-600">MT</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Plants;

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
    inventory_status: '',
    priority_level: 'Medium'
  });

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await PostgresAPI.get('/plants');
      setPlants(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching plants:', err);
      setError('Failed to load plants. Please check if backend is running.');
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
        raw_material_demand: '',
        inventory_status: '',
        priority_level: 'Medium'
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
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              <span>Add Plant</span>
            </button>
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
                {plants.filter(p => p.priority_level === 'Critical').length}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plants.length === 0 ? (
          <div className="col-span-2 bg-white rounded-xl shadow-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No plants found. Click "Add Plant" to create one.</p>
          </div>
        ) : (
          plants.map(plant => (
            <div key={plant.plant_id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              {/* Plant Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{plant.plant_name}</h3>
                  <p className="text-sm text-gray-600">ID: {plant.plant_id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(plant.priority_level)}`}>
                  {plant.priority_level}
                </span>
              </div>

              {/* Plant Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-xs mb-1">Raw Material Demand</p>
                  <p className="text-lg font-bold text-gray-800">{plant.raw_material_demand?.toLocaleString()} MT</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-xs mb-1">Inventory Status</p>
                  <p className="text-lg font-bold text-gray-800">{plant.inventory_status}%</p>
                </div>
              </div>

              {/* Inventory Status Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Inventory Level</span>
                  <span className={`text-sm font-bold ${
                    plant.inventory_status >= 70 ? 'text-green-600' :
                    plant.inventory_status >= 50 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {plant.inventory_status}%
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all ${getInventoryColor(plant.inventory_status)}`}
                    style={{ width: `${plant.inventory_status}%` }}
                  ></div>
                </div>
                {plant.inventory_status < 50 && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    Low inventory - urgent delivery needed
                  </p>
                )}
              </div>

              {/* Additional Info */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium text-gray-800">
                    {plant.created_at ? new Date(plant.created_at).toLocaleDateString() : 'N/A'}
                  </span>
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
          ))
        )}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 45000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Inventory Status (%) *</label>
                <input
                  type="number"
                  required
                  value={newPlant.inventory_status}
                  onChange={(e) => setNewPlant({...newPlant, inventory_status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 78"
                  min="0"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level *</label>
                <select
                  required
                  value={newPlant.priority_level}
                  onChange={(e) => setNewPlant({...newPlant, priority_level: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
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
    </div>
  );
};

export default Plants;