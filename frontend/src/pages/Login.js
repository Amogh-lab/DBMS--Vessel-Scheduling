import React, { useState } from 'react';
import { Ship, LogIn, AlertCircle } from 'lucide-react';

const Login = ({ onLogin, setShowSignup }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        onLogin(data.user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex">

        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-600 p-12 flex-col justify-between text-white">
          <div>
            <div className="flex items-center space-x-3 mb-8">
              <Ship className="w-12 h-12" />
              <h1 className="text-3xl font-bold">IVSS</h1>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Intelligent Vessel Scheduling System
            </h2>
            <p className="text-blue-100 text-lg">
              AI-powered maritime logistics optimization for ports and vessels
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-8">Sign in to access the system</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-medium">Login Failed</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* USERNAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           text-gray-900 bg-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg
                           text-gray-900 bg-white placeholder-gray-400
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3
                         rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700
                         transform hover:scale-105 transition duration-200 shadow-lg
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => setShowSignup(true)}
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

