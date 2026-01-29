import React, { useState, useEffect } from 'react';
import { Ship, Plus, Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';
import { PostgresAPI } from '../services/api';

const Vessels = () => {
  const [vessels, setVessels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVessel, setNewVessel] = useState({
    vessel_id: '',
    vessel_name: '',
    vessel_type: '',
    capacity: '',
    current_location: '',
    fuel_status: ''
  });

  // Fetch vessels from backend
  useEffect(() => {
    fetchVessels();
  }, []);

  const fetchVessels = async () => {
    try {
      setLoading(true);
      const response = await PostgresAPI.get('/vessels');
      setVessels(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching vessels:', err);
      setError('Failed to load vessels. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddVessel = async (e) => {
    e.preventDefault();
    try {
      await PostgresAPI.post('/vessels', newVessel);
      setShowAddModal(false);
      setNewVessel({
        vessel_id: '',
        vessel_name: '',
        vessel_type: '',
        capacity: '',
        current_location: '',
        fuel_status: ''
      });
      fetchVessels();
      alert('Vessel added successfully!');
    } catch (err) {
      console.error('Error adding vessel:', err);
      alert('Failed to add vessel: ' + (err.response?.data?.message || err.message));
    }
  };

  const getStatusColor = (fuelStatus) => {
    const fuel = parseFloat(fuelStatus);
    if (fuel >= 80) return 'bg-green-100 text-green-700';
    if (fuel >= 50) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const filteredVessels = vessels.filter(vessel =>
    vessel.vessel_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vessel.vessel_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading vessels...</p>
        </div>
      </div>
    );
  }

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
            <button 
              onClick={fetchVessels}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-600"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Fuel Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVessels.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No vessels found. Click "Add Vessel" to create one.
                  </td>
                </tr>
              ) : (
                filteredVessels.map(vessel => (
                  <tr key={vessel.vessel_id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Ship className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-800">{vessel.vessel_name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{vessel.vessel_type}</td>
                    <td className="px-6 py-4 text-gray-600">{vessel.capacity?.toLocaleString()} MT</td>
                    <td className="px-6 py-4 text-gray-600">{vessel.current_location || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(vessel.fuel_status)}`}>
                        {vessel.fuel_status}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {vessel.created_at ? new Date(vessel.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
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
          <p className="text-gray-600 text-sm">Cargo Ships</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {vessels.filter(v => v.vessel_type === 'Cargo').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Container Ships</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {vessels.filter(v => v.vessel_type === 'Container').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Avg Capacity</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {vessels.length > 0 ? Math.round(vessels.reduce((acc, v) => acc + (v.capacity || 0), 0) / vessels.length).toLocaleString() : 0} MT
          </p>
        </div>
      </div>

      {/* Add Vessel Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Vessel</h3>
            <form onSubmit={handleAddVessel} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vessel ID *</label>
                <input
                  type="text"
                  required
                  value={newVessel.vessel_id}
                  onChange={(e) => setNewVessel({...newVessel, vessel_id: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
                  placeholder="e.g., V001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vessel Name *</label>
                <input
                  type="text"
                  required
                  value={newVessel.vessel_name}
                  onChange={(e) => setNewVessel({...newVessel, vessel_name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
                  placeholder="e.g., Pacific Trader"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                <select
                  required
                  value={newVessel.vessel_type}
                  onChange={(e) => setNewVessel({...newVessel, vessel_type: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
                >
                  <option value="">Select type</option>
                  <option value="Cargo">Cargo</option>
                  <option value="Container">Container</option>
                  <option value="Bulk">Bulk</option>
                  <option value="Tanker">Tanker</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity (MT) *</label>
                <input
                  type="number"
                  required
                  value={newVessel.capacity}
                  onChange={(e) => setNewVessel({...newVessel, capacity: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
                  placeholder="e.g., 50000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
                <input
                  type="text"
                  value={newVessel.current_location}
                  onChange={(e) => setNewVessel({...newVessel, current_location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-600"
                  placeholder="e.g., Indian Ocean"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Status (%)</label>
              <select
                value={newVessel.fuel_status}
                onChange={(e) =>
                  setNewVessel({ ...newVessel, fuel_status: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white"
                required
              >
                <option value="">Select fuel status</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Vessel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vessels;