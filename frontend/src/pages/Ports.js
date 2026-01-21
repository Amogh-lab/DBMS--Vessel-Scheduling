// import React, { useState } from 'react';
// import { Anchor, Plus, TrendingUp, AlertCircle } from 'lucide-react';

// const Ports = () => {
//   const [ports] = useState([
//     { 
//       id: 1, 
//       name: 'Mumbai Port', 
//       berthCapacity: 12, 
//       currentQueue: 3, 
//       efficiency: 92, 
//       weather: 'Clear',
//       vesselsToday: 8,
//       avgWaitTime: '2.5h'
//     },
//     { 
//       id: 2, 
//       name: 'Chennai Port', 
//       berthCapacity: 10, 
//       currentQueue: 5, 
//       efficiency: 88, 
//       weather: 'Cloudy',
//       vesselsToday: 6,
//       avgWaitTime: '3.2h'
//     },
//     { 
//       id: 3, 
//       name: 'Vizag Port', 
//       berthCapacity: 8, 
//       currentQueue: 2, 
//       efficiency: 95, 
//       weather: 'Clear',
//       vesselsToday: 5,
//       avgWaitTime: '1.8h'
//     },
//     { 
//       id: 4, 
//       name: 'Cochin Port', 
//       berthCapacity: 9, 
//       currentQueue: 4, 
//       efficiency: 90, 
//       weather: 'Rainy',
//       vesselsToday: 7,
//       avgWaitTime: '2.9h'
//     }
//   ]);

//   const getEfficiencyColor = (efficiency) => {
//     if (efficiency >= 90) return 'text-green-600';
//     if (efficiency >= 80) return 'text-yellow-600';
//     return 'text-red-600';
//   };

//   const getWeatherIcon = (weather) => {
//     switch (weather) {
//       case 'Clear': return '☀️';
//       case 'Cloudy': return '⛅';
//       case 'Rainy': return '🌧️';
//       default: return '🌤️';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">Port Management</h2>
//             <p className="text-gray-600 text-sm mt-1">Monitor and manage port operations</p>
//           </div>
//           <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
//             <Plus size={18} />
//             <span>Add Port</span>
//           </button>
//         </div>
//       </div>

//       {/* Port Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {ports.map(port => (
//           <div key={port.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
//             {/* Port Header */}
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="bg-blue-100 p-3 rounded-lg">
//                   <Anchor className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-800">{port.name}</h3>
//                   <p className="text-sm text-gray-600 flex items-center gap-1">
//                     <span>{getWeatherIcon(port.weather)}</span>
//                     <span>{port.weather}</span>
//                   </p>
//                 </div>
//               </div>
//               {port.currentQueue > port.berthCapacity * 0.7 && (
//                 <AlertCircle className="w-5 h-5 text-orange-500" />
//               )}
//             </div>

//             {/* Port Stats */}
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 text-sm">Berth Capacity</p>
//                 <p className="text-xl font-bold text-gray-800">{port.berthCapacity}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 text-sm">Current Queue</p>
//                 <p className="text-xl font-bold text-gray-800">{port.currentQueue}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 text-sm">Vessels Today</p>
//                 <p className="text-xl font-bold text-gray-800">{port.vesselsToday}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 text-sm">Avg Wait Time</p>
//                 <p className="text-xl font-bold text-gray-800">{port.avgWaitTime}</p>
//               </div>
//             </div>

//             {/* Efficiency Bar */}
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <span className="text-sm text-gray-600">Port Efficiency</span>
//                 <span className={`text-sm font-bold ${getEfficiencyColor(port.efficiency)}`}>
//                   {port.efficiency}%
//                 </span>
//               </div>
//               <div className="bg-gray-200 rounded-full h-3">
//                 <div 
//                   className={`h-3 rounded-full transition-all ${
//                     port.efficiency >= 90 ? 'bg-green-500' :
//                     port.efficiency >= 80 ? 'bg-yellow-500' :
//                     'bg-red-500'
//                   }`}
//                   style={{ width: `${port.efficiency}%` }}
//                 ></div>
//               </div>
//             </div>

//             {/* Queue Status */}
//             <div className="flex items-center justify-between pt-4 border-t border-gray-200">
//               <span className="text-sm text-gray-600">Queue Status</span>
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 port.currentQueue < port.berthCapacity * 0.5 ? 'bg-green-100 text-green-700' :
//                 port.currentQueue < port.berthCapacity * 0.8 ? 'bg-yellow-100 text-yellow-700' :
//                 'bg-red-100 text-red-700'
//               }`}>
//                 {port.currentQueue < port.berthCapacity * 0.5 ? 'Light' :
//                  port.currentQueue < port.berthCapacity * 0.8 ? 'Moderate' :
//                  'Heavy'}
//               </span>
//             </div>

//             {/* Action Button */}
//             <button className="w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition font-medium">
//               View Details
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Overall Statistics */}
//       <div className="bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <TrendingUp className="w-6 h-6 text-blue-600" />
//           Overall Port Statistics
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="text-center p-4 bg-blue-50 rounded-lg">
//             <p className="text-gray-600 text-sm">Total Ports</p>
//             <p className="text-3xl font-bold text-blue-600 mt-1">{ports.length}</p>
//           </div>
//           <div className="text-center p-4 bg-green-50 rounded-lg">
//             <p className="text-gray-600 text-sm">Avg Efficiency</p>
//             <p className="text-3xl font-bold text-green-600 mt-1">
//               {(ports.reduce((acc, p) => acc + p.efficiency, 0) / ports.length).toFixed(1)}%
//             </p>
//           </div>
//           <div className="text-center p-4 bg-purple-50 rounded-lg">
//             <p className="text-gray-600 text-sm">Total Capacity</p>
//             <p className="text-3xl font-bold text-purple-600 mt-1">
//               {ports.reduce((acc, p) => acc + p.berthCapacity, 0)}
//             </p>
//           </div>
//           <div className="text-center p-4 bg-orange-50 rounded-lg">
//             <p className="text-gray-600 text-sm">Current Queue</p>
//             <p className="text-3xl font-bold text-orange-600 mt-1">
//               {ports.reduce((acc, p) => acc + p.currentQueue, 0)}
//             </p>
//           </div>
//         </div>
//         </div>
//     </div>
//   );
// };
// export default Ports;


import React, { useState, useEffect } from 'react';
import { Anchor, Plus, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import { PostgresAPI } from '../services/api';

const Ports = () => {
  const [ports, setPorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPort, setNewPort] = useState({
    port_id: '',
    port_name: '',
    berth_capacity: '',
    current_queue: '',
    weather_status: 'Clear',
    port_efficiency_rating: ''
  });

  useEffect(() => {
    fetchPorts();
  }, []);

  const fetchPorts = async () => {
    try {
      setLoading(true);
      const response = await PostgresAPI.get('/ports');
      setPorts(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching ports:', err);
      setError('Failed to load ports. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPort = async (e) => {
    e.preventDefault();
    try {
      await PostgresAPI.post('/ports', newPort);
      setShowAddModal(false);
      setNewPort({
        port_id: '',
        port_name: '',
        berth_capacity: '',
        current_queue: '',
        weather_status: 'Clear',
        port_efficiency_rating: ''
      });
      fetchPorts();
      alert('Port added successfully!');
    } catch (err) {
      console.error('Error adding port:', err);
      alert('Failed to add port: ' + (err.response?.data?.message || err.message));
    }
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading ports...</p>
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
            <h2 className="text-2xl font-bold text-gray-800">Port Management</h2>
            <p className="text-gray-600 text-sm mt-1">Monitor and manage port operations</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={fetchPorts}
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
              <span>Add Port</span>
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

      {/* Port Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ports.length === 0 ? (
          <div className="col-span-2 bg-white rounded-xl shadow-lg p-12 text-center">
            <Anchor className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No ports found. Click "Add Port" to create one.</p>
          </div>
        ) : (
          ports.map(port => (
            <div key={port.port_id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
              {/* Port Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Anchor className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{port.port_name}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <span>{getWeatherIcon(port.weather_status)}</span>
                      <span>{port.weather_status}</span>
                    </p>
                  </div>
                </div>
                {port.current_queue > port.berth_capacity * 0.7 && (
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                )}
              </div>

              {/* Port Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-sm">Berth Capacity</p>
                  <p className="text-xl font-bold text-gray-800">{port.berth_capacity}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-600 text-sm">Current Queue</p>
                  <p className="text-xl font-bold text-gray-800">{port.current_queue}</p>
                </div>
              </div>

              {/* Efficiency Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Port Efficiency</span>
                  <span className={`text-sm font-bold ${getEfficiencyColor(port.port_efficiency_rating)}`}>
                    {port.port_efficiency_rating}%
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all ${
                      port.port_efficiency_rating >= 90 ? 'bg-green-500' :
                      port.port_efficiency_rating >= 80 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${port.port_efficiency_rating}%` }}
                  ></div>
                </div>
              </div>

              {/* Queue Status */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Queue Status</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  port.current_queue < port.berth_capacity * 0.5 ? 'bg-green-100 text-green-700' :
                  port.current_queue < port.berth_capacity * 0.8 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {port.current_queue < port.berth_capacity * 0.5 ? 'Light' :
                   port.current_queue < port.berth_capacity * 0.8 ? 'Moderate' :
                   'Heavy'}
                </span>
              </div>
            </div>
          ))
        )}
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
              {ports.length > 0 ? (ports.reduce((acc, p) => acc + p.port_efficiency_rating, 0) / ports.length).toFixed(1) : 0}%
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-gray-600 text-sm">Total Capacity</p>
            <p className="text-3xl font-bold text-purple-600 mt-1">
              {ports.reduce((acc, p) => acc + p.berth_capacity, 0)}
            </p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-gray-600 text-sm">Current Queue</p>
            <p className="text-3xl font-bold text-orange-600 mt-1">
              {ports.reduce((acc, p) => acc + p.current_queue, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Add Port Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Port</h3>
            <form onSubmit={handleAddPort} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Port ID *</label>
                <input
                  type="text"
                  required
                  value={newPort.port_id}
                  onChange={(e) => setNewPort({...newPort, port_id: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., P001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Port Name *</label>
                <input
                  type="text"
                  required
                  value={newPort.port_name}
                  onChange={(e) => setNewPort({...newPort, port_name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Mumbai Port"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Berth Capacity *</label>
                <input
                  type="number"
                  required
                  value={newPort.berth_capacity}
                  onChange={(e) => setNewPort({...newPort, berth_capacity: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Queue *</label>
                <input
                  type="number"
                  required
                  value={newPort.current_queue}
                  onChange={(e) => setNewPort({...newPort, current_queue: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weather Status</label>
                <select
                  value={newPort.weather_status}
                  onChange={(e) => setNewPort({...newPort, weather_status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Clear">Clear</option>
                  <option value="Cloudy">Cloudy</option>
                  <option value="Rainy">Rainy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Efficiency Rating (%) *</label>
                <input
                  type="number"
                  required
                  value={newPort.port_efficiency_rating}
                  onChange={(e) => setNewPort({...newPort, port_efficiency_rating: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 92"
                  min="0"
                  max="100"
                />
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
                  Add Port
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ports;