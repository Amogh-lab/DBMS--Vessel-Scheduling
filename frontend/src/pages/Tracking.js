import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, RefreshCw, AlertCircle, Ship, Brain, TrendingUp } from 'lucide-react';
import { API, PostgresAPI } from '../services/api';
import VesselRouteMap from './VesselRouteMap';

const Tracking = () => {
  const [vessels, setVessels] = useState([]);
  const [selectedVessel, setSelectedVessel] = useState(null);

  const [predictionData, setPredictionData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchVessels();
  }, []);

  /* ================= ACCESS CONTROL ================= */
  const canAccessVessel = (vesselId) => {
    if (!user) return false;

    if (user.role === "PORT_AUTHORITY") return true;

    if (
      user.role === "VESSEL_OPERATOR" &&
      user.vessel_id === vesselId
    ) {
      return true;
    }

    return false;
  };

  /* ================= FETCH VESSELS ================= */
const fetchVessels = async () => {
  try {
    setLoading(true);
    const response = await PostgresAPI.get("/vessels");
    setVessels(response.data);

    if (response.data.length === 0) return;

    let vesselIdToSelect = null;

    if (user.role === "PORT_AUTHORITY") {
      vesselIdToSelect = response.data[0].vessel_id;
    } else if (user.role === "VESSEL_OPERATOR") {
      vesselIdToSelect = user.vessel_id;
    }

    if (!vesselIdToSelect) {
      setError("No vessel assigned to this account");
      return;
    }

    setSelectedVessel(vesselIdToSelect);
    fetchPredictionLogs(vesselIdToSelect);
    setError("");
  } catch (err) {
    console.error("Error fetching vessels:", err);
    setError("Failed to load vessels.");
  } finally {
    setLoading(false);
  }
};

  /* ================= FETCH PREDICTION LOGS ================= */
  const fetchPredictionLogs = async (vesselId) => {
    try {
      setPredictionLoading(true);
      const res = await API.get(`/predictions/vessel/${vesselId}`);
      setPredictionData(res.data);
    } catch (err) {
      console.error("Prediction fetch failed:", err);
      setPredictionData([]);
    } finally {
      setPredictionLoading(false);
    }
  };

  /* ================= VESSEL CHANGE ================= */
const handleVesselChange = (vesselId) => {
  if (user.role === "VESSEL_OPERATOR") return;

  if (!canAccessVessel(vesselId)) {
    setError("You do not have access to this vessel");
    setPredictionData([]);
    return;
  }

  setError("");
  setSelectedVessel(vesselId);
  fetchPredictionLogs(vesselId);
};

  /* ================= REFRESH ================= */
  const handleRefresh = () => {
    if (selectedVessel && canAccessVessel(selectedVessel)) {
      fetchPredictionLogs(selectedVessel);
    }
  };

  /* ================= DERIVED DATA ================= */
  const selectedVesselData = vessels.find(
    v => v.vessel_id === selectedVessel
  );

  const latestEntry = predictionData.length > 0
    ? predictionData[0]
    : null;

  const latestAIS = latestEntry?.ais_log || null;
  const latestPrediction = latestEntry?.prediction || null;

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

  const visibleVessels =
  user?.role === "PORT_AUTHORITY"
    ? vessels
    : vessels.filter(v => v.vessel_id === user?.vessel_id);


return (
  <div className="space-y-6">
    {/* Header */}
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Real-time Vessel Tracking
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            GPS-based live tracking with AI-powered ETA predictions
          </p>
        </div>
        <div className="flex gap-3">
            <select
              value={selectedVessel || ""}
              onChange={(e) => handleVesselChange(e.target.value)}
              disabled={user?.role === "VESSEL_OPERATOR"}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {visibleVessels.map((vessel) => (
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
          <p className="text-red-800 font-medium">Access Restricted</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    )}

    {/* ML-Powered ETA Prediction Card */}
    {latestPrediction && (
      <div className="bg-white rounded-xl shadow-lg p-6 text-black">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8" />
          <div>
            <h3 className="text-xl font-bold">AI-Powered ETA Prediction</h3>
            <p className="text-sm text-gray-600">
              Based on real-time AIS and derived vessel data
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Predicted ETA</p>
            <p className="text-3xl font-bold">
              {latestPrediction.predicted_eta_hours?.toFixed(1)} hrs
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {latestPrediction.predicted_eta_minutes?.toFixed(0)} minutes
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Confidence Level</p>
            <p className="text-3xl font-bold">
              {(latestPrediction.confidence * 100).toFixed(0)}%
            </p>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-2">
              <div
                className="bg-white h-2 rounded-full transition-all"
                style={{
                  width: `${latestPrediction.confidence * 100}%`
                }}
              />
            </div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Last Updated</p>
            <p className="text-lg font-bold">
              {new Date(latestPrediction.created_at).toLocaleTimeString()}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              ML Model: Random Forest
            </p>
          </div>
        </div>
      </div>
    )}

    {predictionLoading && !latestPrediction && (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
        <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
        <p className="text-blue-800">Calculating ETA prediction...</p>
      </div>
    )}

    {/* Current Vessel Info */}
    {selectedVesselData && latestAIS && (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Ship className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {selectedVesselData.vessel_name}
            </h3>
            <p className="text-gray-600">
              Type: {selectedVesselData.vessel_type} | Capacity:{" "}
              {selectedVesselData.capacity?.toLocaleString()} MT
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
              <MapPin size={16} />
              Current Position
            </p>
            <p className="text-lg font-bold text-gray-800">
              {latestAIS.coordinates.lat.toFixed(4)},{" "}
              {latestAIS.coordinates.lon.toFixed(4)}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
              <Navigation size={16} />
              Speed
            </p>
            <p className="text-lg font-bold text-gray-800">
              {latestAIS.speed_knots.toFixed(1)} knots
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-1 flex items-center gap-2">
              <TrendingUp size={16} />
              Heading
            </p>
            <p className="text-lg font-bold text-gray-800">
              {latestAIS.heading}°
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Status</p>
            <p className="text-lg font-bold text-gray-800">
              {latestAIS.status}
            </p>
          </div>
        </div>
      </div>
    )}

    {/* Map Placeholder */}
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Vessel Route (AIS-based)
      </h3>

      {predictionData.length === 0 ? (
        <p className="text-gray-600 text-center py-12">
          No AIS route data available for this vessel.
        </p>
      ) : (
        <VesselRouteMap
          aisData={predictionData.map((p) => p.ais_log)}
        />
      )}
    </div>

    {/* AIS History */}
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        AIS Log History
      </h3>

      {predictionData.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          No AIS data available for this vessel.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Coordinates
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Speed
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Heading
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Predicted ETA
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {predictionData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-800">
                    {new Date(row.ais_log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {row.ais_log.coordinates.lat.toFixed(4)},{" "}
                    {row.ais_log.coordinates.lon.toFixed(4)}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {row.ais_log.speed_knots.toFixed(1)} kn
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {row.ais_log.heading}°
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {row.ais_log.status}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {row.ais_log.destination}
                  </td>
                  <td className="px-6 py-3 text-sm text-purple-700 font-semibold">
                    {row.prediction.predicted_eta_hours.toFixed(1)} hrs
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);
};

export default Tracking;