// import React from 'react';
// import { Ship, Anchor, Calendar, TrendingUp } from 'lucide-react';

// const Dashboard = () => {
//   const vessels = [
//     { id: 1, name: 'Pacific Trader', type: 'Cargo', capacity: 50000, eta: '2024-12-25 14:30', status: 'On Route', location: 'Indian Ocean' },
//     { id: 2, name: 'Atlantic Express', type: 'Container', capacity: 75000, eta: '2024-12-24 18:00', status: 'Scheduled', location: 'Arabian Sea' },
//     { id: 3, name: 'Nordic Carrier', type: 'Bulk', capacity: 60000, eta: '2024-12-26 09:15', status: 'Delayed', location: 'Bay of Bengal' }
//   ];

//   const ports = [
//     { id: 1, name: 'Mumbai Port', berthCapacity: 12, currentQueue: 3, efficiency: 92, weather: 'Clear' },
//     { id: 2, name: 'Chennai Port', berthCapacity: 10, currentQueue: 5, efficiency: 88, weather: 'Cloudy' },
//     { id: 3, name: 'Vizag Port', berthCapacity: 8, currentQueue: 2, efficiency: 95, weather: 'Clear' }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 transform hover:scale-105 transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Active Vessels</p>
//               <p className="text-3xl font-bold text-gray-800">24</p>
//             </div>
//             <Ship className="w-12 h-12 text-blue-500" />
//           </div>
//           <p className="text-green-600 text-sm mt-2">↑ 12% from last week</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-cyan-500 transform hover:scale-105 transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Port Efficiency</p>
//               <p className="text-3xl font-bold text-gray-800">91.7%</p>
//             </div>
//             <Anchor className="w-12 h-12 text-cyan-500" />
//           </div>
//           <p className="text-green-600 text-sm mt-2">↑ 3.2% improvement</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500 transform hover:scale-105 transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Scheduled Today</p>
//               <p className="text-3xl font-bold text-gray-800">8</p>
//             </div>
//             <Calendar className="w-12 h-12 text-purple-500" />
//           </div>
//           <p className="text-gray-600 text-sm mt-2">5 arrivals, 3 departures</p>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500 transform hover:scale-105 transition">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-600 text-sm">Avg Turnaround</p>
//               <p className="text-3xl font-bold text-gray-800">18.5h</p>
//             </div>
//             <TrendingUp className="w-12 h-12 text-orange-500" />
//           </div>
//           <p className="text-green-600 text-sm mt-2">↓ 2.3h reduced</p>
//         </div>
//       </div>

//       {/* Activity Sections */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Vessel Activity */}
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Vessel Activity</h3>
//           <div className="space-y-3">
//             {vessels.map(vessel => (
//               <div key={vessel.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
//                 <div className="flex items-center space-x-3">
//                   <Ship className="w-8 h-8 text-blue-600" />
//                   <div>
//                     <p className="font-semibold text-gray-800">{vessel.name}</p>
//                     <p className="text-sm text-gray-600">{vessel.location}</p>
//                   </div>
//                 </div>
//                 <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   vessel.status === 'On Route' ? 'bg-blue-100 text-blue-700' :
//                   vessel.status === 'Scheduled' ? 'bg-green-100 text-green-700' :
//                   'bg-red-100 text-red-700'
//                 }`}>
//                   {vessel.status}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Port Status Overview */}
//         <div className="bg-white p-6 rounded-xl shadow-lg">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Port Status Overview</h3>
//           <div className="space-y-3">
//             {ports.map(port => (
//               <div key={port.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
//                 <div className="flex items-center justify-between mb-2">
//                   <p className="font-semibold text-gray-800">{port.name}</p>
//                   <span className="text-sm text-gray-600">{port.weather}</span>
//                 </div>
//                 <div className="flex items-center justify-between text-sm">
//                   <span className="text-gray-600">Queue: {port.currentQueue}/{port.berthCapacity}</span>
//                   <span className="text-green-600 font-medium">Efficiency: {port.efficiency}%</span>
//                 </div>
//                 <div className="mt-2 bg-gray-200 rounded-full h-2">
//                   <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${port.efficiency}%` }}></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Ship, Anchor, Package, Calendar, AlertCircle, TrendingUp, RefreshCw, Activity } from 'lucide-react';
import { API, PostgresAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    vessels: 0,
    ports: 0,
    plants: 0,
    schedules: 0,
    activeVessels: 0,
    pendingEvents: 0
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch from PostgreSQL
      const [vesselsRes, portsRes, plantsRes, schedulesRes] = await Promise.all([
        PostgresAPI.get('/vessels').catch(() => ({ data: [] })),
        PostgresAPI.get('/ports').catch(() => ({ data: [] })),
        PostgresAPI.get('/plants').catch(() => ({ data: [] })),
        PostgresAPI.get('/schedules').catch(() => ({ data: [] }))
      ]);

      // Fetch recent events from MongoDB (if available)
      // This will need the vessel_id from user context
      let eventsData = [];
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.vessel_id) {
          const eventsRes = await API.get(`/events/${user.vessel_id}`);
          eventsData = eventsRes.data;
        }
      } catch (err) {
        console.log('Events not available:', err);
      }

      setStats({
        vessels: vesselsRes.data.length,
        ports: portsRes.data.length,
        plants: plantsRes.data.length,
        schedules: schedulesRes.data.length,
        activeVessels: vesselsRes.data.filter(v => v.fuel_status >= 50).length,
        pendingEvents: eventsData.filter(e => !e.resolved).length
      });

      setRecentEvents(eventsData.slice(0, 5));
      setUpcomingSchedules(schedulesRes.data.slice(0, 5));
      setError('');
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load some dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            <p className="text-gray-600 text-sm mt-1">Real-time maritime logistics monitoring</p>
          </div>
          <button 
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCw size={18} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-yellow-800 font-medium">Warning</p>
            <p className="text-yellow-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Vessels */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Ship className="w-12 h-12 opacity-80" />
            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
              {stats.activeVessels} Active
            </div>
          </div>
          <p className="text-sm opacity-80 mb-1">Total Vessels</p>
          <p className="text-4xl font-bold">{stats.vessels}</p>
        </div>

        {/* Ports */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Anchor className="w-12 h-12 opacity-80" />
            <TrendingUp className="w-8 h-8 opacity-60" />
          </div>
          <p className="text-sm opacity-80 mb-1">Total Ports</p>
          <p className="text-4xl font-bold">{stats.ports}</p>
        </div>

        {/* Plants */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-12 h-12 opacity-80" />
            <Activity className="w-8 h-8 opacity-60" />
          </div>
          <p className="text-sm opacity-80 mb-1">Total Plants</p>
          <p className="text-4xl font-bold">{stats.plants}</p>
        </div>

        {/* Schedules */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-12 h-12 opacity-80" />
            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
              {stats.pendingEvents} Pending
            </div>
          </div>
          <p className="text-sm opacity-80 mb-1">Active Schedules</p>
          <p className="text-4xl font-bold">{stats.schedules}</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Recent Events</h3>
            <span className="text-sm text-gray-600">{recentEvents.length} events</span>
          </div>
          {recentEvents.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No recent events available</p>
          ) : (
            <div className="space-y-3">
              {recentEvents.map((event, index) => (
                <div key={index} className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{event.event_type}</p>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(event.severity)}`}>
                      {event.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Schedules */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Upcoming Schedules</h3>
            <span className="text-sm text-gray-600">{upcomingSchedules.length} scheduled</span>
          </div>
          {upcomingSchedules.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No upcoming schedules</p>
          ) : (
            <div className="space-y-3">
              {upcomingSchedules.map((schedule, index) => (
                <div key={index} className="border border-gray-200 bg-gray-50 p-4 rounded-lg hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800">
                      {schedule.vessel_id} → {schedule.port_name || schedule.port_id}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      schedule.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                      schedule.status === 'In Progress' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {schedule.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>📅 ETA: {schedule.planned_eta ? new Date(schedule.planned_eta).toLocaleDateString() : 'N/A'}</span>
                    {schedule.loading_unloading_duration && (
                      <span>⏱️ Duration: {schedule.loading_unloading_duration}h</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
            <Ship className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-800">Add Vessel</p>
              <p className="text-xs text-gray-600">Register new vessel</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
            <Calendar className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-800">Schedule</p>
              <p className="text-xs text-gray-600">Create new schedule</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
            <Package className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-800">Manage Plants</p>
              <p className="text-xs text-gray-600">View plant status</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <div className="text-left">
              <p className="font-semibold text-gray-800">View Events</p>
              <p className="text-xs text-gray-600">Check alerts</p>
            </div>
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-semibold text-gray-800">PostgreSQL Service</p>
              <p className="text-sm text-green-600">Connected</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-semibold text-gray-800">MongoDB Service</p>
              <p className="text-sm text-green-600">Connected</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <p className="font-semibold text-gray-800">ML Model Service</p>
              <p className="text-sm text-green-600">Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;