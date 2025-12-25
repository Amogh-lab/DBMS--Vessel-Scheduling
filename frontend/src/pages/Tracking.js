import React from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';

const Tracking = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Real-time Vessel Tracking</h2>
          <p className="text-gray-600 text-sm mt-1">GPS-based live tracking of all vessels</p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-blue-300">
          <div className="text-center">
            <MapPin className="w-20 h-20 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Map View</h3>
            <p className="text-gray-600 mb-4">Live vessel positions and routes with GPS tracking</p>
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

      {/* Tracking Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <Navigation className="w-8 h-8 text-blue-600" />
            <h3 className="font-bold text-gray-800">Active Routes</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">18</p>
          <p className="text-sm text-gray-600 mt-1">Vessels currently in transit</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-green-600" />
            <h3 className="font-bold text-gray-800">At Ports</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">6</p>
          <p className="text-sm text-gray-600 mt-1">Vessels docked at ports</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-orange-600" />
            <h3 className="font-bold text-gray-800">Avg Speed</h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">14.2</p>
          <p className="text-sm text-gray-600 mt-1">knots across fleet</p>
        </div>
      </div>
    </div>
  );
};

export default Tracking;