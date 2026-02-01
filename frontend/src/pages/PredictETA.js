import React, { useState } from 'react';
import { Brain, Clock, TrendingUp } from 'lucide-react';
import axios from 'axios';

const PredictETA = () => {
  const [features, setFeatures] = useState({
    distance_to_port_km: '',
    speed_knots: '',
    avg_speed_last_1hr: '',
    acceleration: '',
    heading_change: '',
    engine_health: '',
    wind_speed_kmph: '',
    wave_height_m: '',
    visibility_km: '',
    weather_severity: '',
    current_queue: '',
    berth_capacity: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (key, value) => {
    setFeatures({ ...features, [key]: Number(value) });
  };

  const handlePredict = async () => {
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/predict/eta', {
        features
      });

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Brain className="text-purple-600" />
          Manual ETA Prediction (Testing)
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          Directly send features to ML model
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow">
        {Object.keys(features).map(key => (
          <div key={key}>
            <label className="text-sm text-gray-600 capitalize">
              {key.replaceAll('_', ' ')}
            </label>
            <input
              type="number"
              className="w-full mt-1 px-3 py-2 border rounded text-gray-800"
              onChange={e => handleChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handlePredict}
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
      >
        {loading ? 'Predicting...' : 'Predict ETA'}
      </button>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm opacity-80">ETA (Minutes)</p>
              <p className="text-3xl font-bold">
                {result.predicted_eta_minutes}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-80">ETA (Hours)</p>
              <p className="text-3xl font-bold">
                {result.predicted_eta_hours}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-80">Confidence</p>
              <p className="text-3xl font-bold">
                {(result.confidence * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictETA;
