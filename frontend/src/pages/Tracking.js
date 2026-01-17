import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, RefreshCw, AlertCircle, Ship, Brain, TrendingUp } from 'lucide-react';
import { API, PostgresAPI } from '../services/api';

const Tracking = () => {
  const [vessels, setVessels] = useState([]);
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [aisData, setAisData] = useState([]);
  const [etaPrediction, setEtaPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVessels();
  }, []);

  const fetchVessels = async () => {
    try {
      setLoading(true);
      const response = await PostgresAPI.get('/vessels');
      setVessels(response.data);
      
      if (response.data.length > 0) {
        setSelectedVessel(response.data[0].vessel_id);
        fetchAISData(response.data[0].vessel_id);
        fetchETAPrediction(response.data[0].vessel_id);
      }
      setError('');
    } catch (err) {
      console.error('Error fetching vessels:', err);
      setError('Failed to load vessels. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAISData = async (vesselId) => {
    try {
      const response = await API.get(`/ais/${vesselId}`);
      setAisData(response.data);
    } catch (err) {
      console.error('Error fetching AIS data:', err);
      setAisData([]);
    }
  };

  const fetchETAPrediction = async (vesselId) => {
    try {
      setPredictionLoading(true);
      const response = await API.get(`/predictions/predict/${vesselId}`);
      setEtaPrediction(response.data);
    } catch (err) {
      console.error('Error fetching ETA prediction:', err);
      setEtaPrediction(null);
    } finally {
      setPredictionLoading(false);
    }
  };

  const handleVesselChange = (vesselId) => {
    setSelectedVessel(vesselId);
    fetchAISData(vesselId);
    fetchETAPrediction(vesselId);
  };

  const handleRefresh = () => {
    if (selectedVessel) {
      fetchAISData(selectedVessel);
      fetchETAPrediction(selectedVessel);
    }
  };

  const selectedVesselData = vessels.find(v => v.vessel_id === selectedVessel);
  const latestAIS = aisData.length > 0 ? aisData[0] : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading tracking data...</p>
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
            <h2 className="text-2xl font-bold text-gray-800">Real-time Vessel Tracking</h2>
            <p className="text-gray-600 text-sm mt-1">GPS-based live tracking with AI-powered ETA predictions</p>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedVessel || ''}
              onChange={(e) => handleVesselChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {vessels.map(vessel => (
                <option key={vessel.vessel_id} value={vessel.vessel_id}>
                  {vessel.vessel_name}
                </option>
              ))}
            </select>
            <button 
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <RefreshCw size={18} />
              <span>Refresh</span>
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

      {/* ML-Powered ETA Prediction Card */}
      {etaPrediction && (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8" />
            <div>
              <h3 className="text-xl font-bold">AI-Powered ETA Prediction</h3>
              <p className="text-sm text-purple-100">Based on real-time sensor data and weather conditions</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-purple-100 mb-1">Predicted ETA</p>
              <p className="text-3xl font-bold">{etaPrediction.predicted_eta_hours?.toFixed(1)} hrs</p>
              <p className="text-xs text-purple-100 mt-1">{etaPrediction.predicted_eta_minutes?.toFixed(0)} minutes</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-purple-100 mb-1">Confidence Level</p>
              <p className="text-3xl font-bold">{(etaPrediction.confidence * 100)?.toFixed(0)}%</p>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all"
                  style={{ width: `${etaPrediction.confidence * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-sm text-purple-100 mb-1">Last Updated</p>
              <p className="text-lg font-bold">{new Date(etaPrediction.timestamp).toLocaleTimeString()}</p>
              <p className="text-xs text-purple-100 mt-1">ML Model: Random Forest</p>
            </div>
          </div>
        </div>
      )}

      {predictionLoading && !etaPrediction && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
          <p className="text-blue-800">Calculating ETA prediction...</p>
        </div>
      )}

      {/* Current Vessel Info */}
      {selectedVesselData && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Ship className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{selectedVesselData.vessel_name}</h3>
              <p className="text-gray-600">Type: {selectedVesselData.vessel_type} | Capacity: {selectedVesselData.capacity?.toLocaleString()} MT</p>
            </div>
          </div>

          {latestAIS && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
                  <MapPin size={16} />
                  Current Position
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {latestAIS.coordinates?.lat?.toFixed(4)}, {latestAIS.coordinates?.lon?.toFixed(4)}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
                  <Navigation size={16} />
                  Speed
                </p>
                <p className="text-lg font-bold text-gray-800">{latestAIS.speed_knots?.toFixed(1)} knots</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
                  <TrendingUp size={16} />
                  Heading
                </p>
                <p className="text-lg font-bold text-gray-800">{latestAIS.heading}°</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Status</p>
                <p className="text-lg font-bold text-gray-800">{latestAIS.status || 'En Route'}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Map Placeholder */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-blue-300">
          <div className="text-center">
            <MapPin className="w-20 h-20 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Map View</h3>
            <p className="text-gray-600 mb-4">Live vessel positions and routes with GPS tracking</p>
            {latestAIS && (
              <p className="text-sm text-gray-700 mb-4">
                Current Position: {latestAIS.coordinates?.lat?.toFixed(4)}, {latestAIS.coordinates?.lon?.toFixed(4)}
              </p>
            )}
            <div className="flex gap-4 justify-center text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>On Route</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>At Port</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Delayed</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AIS History */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">AIS Log History</h3>
        {aisData.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No AIS data available for this vessel.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Timestamp</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Coordinates</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Speed</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Heading</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Destination</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {aisData.slice(0, 10).map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-800">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {log.coordinates?.lat?.toFixed(4)}, {log.coordinates?.lon?.toFixed(4)}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{log.speed_knots?.toFixed(1)} kn</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{log.heading}°</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{log.status || 'N/A'}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{log.destination || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Tracking Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <Navigation className="w-8 h-8 text-blue-600" />
            <h3 className="font-bold text-gray-800">Active Routes</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{vessels.length}</p>
          <p className="text-sm text-gray-600 mt-1">Vessels currently tracked</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-green-600" />
            <h3 className="font-bold text-gray-800">AIS Logs</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{aisData.length}</p>
          <p className="text-sm text-gray-600 mt-1">Position updates logged</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-orange-600" />
            <h3 className="font-bold text-gray-800">Last Update</h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">
            {latestAIS ? new Date(latestAIS.timestamp).toLocaleTimeString() : 'N/A'}
          </p>
          <p className="text-sm text-gray-600 mt-1">Most recent position</p>
        </div>
      </div>
    </div>
  );
};

export default Tracking;