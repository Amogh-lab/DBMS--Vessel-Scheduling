
import React, { useState, useEffect } from 'react';
import { Ship, UserPlus, LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { PostgresAPI } from '../services/api';


const Signup = ({ setShowSignup }) => {
  const [vessels, setVessels] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'VESSEL_OPERATOR',
    vessel_id: '',
    plant_id: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = [
    { value: 'VESSEL_OPERATOR', label: 'Vessel Operator' },
    { value: 'PORT_AUTHORITY', label: 'Port Authority' },
    { value: 'PLANT_MANAGER', label: 'Plant Manager' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Prepare data based on role
    const submitData = {
      username: formData.username,
      password: formData.password,
      role: formData.role,
      vessel_id: formData.role === 'VESSEL_OPERATOR' ? formData.vessel_id : null,
      plant_id: formData.role === 'PLANT_MANAGER' ? formData.plant_id : null
    };

    try {
      const response = await fetch('http://localhost:5001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setShowSignup(false);
        }, 2000);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Connection error. Please check if backend is running.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
  const fetchVessels = async () => {
    try {
      const res = await PostgresAPI.get('/vessels');
      setVessels(res.data);
    } catch (err) {
      console.error('Failed to fetch vessels', err);
    }
  };

  fetchVessels();
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
        {/* Left side - Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-600 p-12 flex-col justify-between text-white">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <Ship className="w-12 h-12" />
              <h1 className="text-3xl font-bold">IVSS</h1>
            </div>
            <h2 className="text-3xl font-bold mb-4">Join Our Platform</h2>
            <p className="text-blue-100 text-lg">Create your account and start optimizing maritime operations</p>
          </div>
          <div className="space-y-4">
            <div className="bg-blue-700 bg-opacity-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Available Roles:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Vessel Operator - Manage vessel operations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Port Authority - Oversee port activities</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Plant Manager - Coordinate plant logistics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right side - Signup form */}
        <div className="w-full md:w-1/2 p-12 overflow-y-auto max-h-screen">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Sign up to get started</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Signup Failed</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 font-medium">Success!</p>
                <p className="text-green-600 text-sm">Account created. Redirecting to login...</p>
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                style={{ color: '#111827' }}
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                style={{ color: '#111827' }}
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-900"
                style={{ color: '#111827' }}
                required
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value} style={{ color: '#111827' }}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

          {formData.role === 'VESSEL_OPERATOR' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vessel</label>
              <select
                name="vessel_id"
                value={formData.vessel_id}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white text-gray-900"
                style={{ color: '#111827' }}
                required
              >
                <option value="">Select a vessel</option>
                {vessels.map(vessel => (
                  <option key={vessel.vessel_id} value={vessel.vessel_id}>
                    {vessel.vessel_name} ({vessel.vessel_id})
                  </option>
                ))}

              </select>
              <p className="text-xs text-gray-500 mt-1">Select the vessel you operate</p>
            </div>
          )}


            {formData.role === 'PLANT_MANAGER' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plant ID</label>
                <input
                  type="text"
                  name="plant_id"
                  value={formData.plant_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
                  style={{ color: '#111827' }}
                  placeholder="e.g., P001"
                />
                <p className="text-xs text-gray-500 mt-1">Optional: Enter your plant ID if applicable</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading || success}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <button
                onClick={() => setShowSignup(false)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
