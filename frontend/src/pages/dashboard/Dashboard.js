

import React, { useState, useEffect } from 'react';
import { Ship, Anchor, Package, Calendar, AlertCircle, TrendingUp, RefreshCw, Activity } from 'lucide-react';
import { API, PostgresAPI } from '../../services/api';

const Dashboard = () => {
  const userRole = JSON.parse(localStorage.getItem('user'))?.role;
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
  const [vessels, setVessels] = useState([]);
  const [selectedVesselId, setSelectedVesselId] = useState('');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    event_type: '',
    description: '',
    severity: 'Low'
  });


  useEffect(() => {
    fetchDashboardData();
  }, []);

const handleAddEvent = async () => {
  if (!newEvent.event_type || !newEvent.description) return;

  const user = JSON.parse(localStorage.getItem('user'));

  try {
    await API.post('/events', {
      ...newEvent,
      vessel_id: user.vessel_id   // ✅ EXPLICIT
    });

    setNewEvent({
      event_type: '',
      description: '',
      severity: 'Low'
    });

    setShowAddEvent(false);
    fetchDashboardData();
  } catch (err) {
    console.error('Failed to add event:', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Failed to add event');
  }
};


 const fetchDashboardData = async () => {
  try {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));

    // Fetch base PostgreSQL data
    const [vesselsRes, portsRes, plantsRes] = await Promise.all([
      PostgresAPI.get('/vessels').catch(() => ({ data: [] })),
      PostgresAPI.get('/ports').catch(() => ({ data: [] })),
      PostgresAPI.get('/plants').catch(() => ({ data: [] })),
    ]);

    setVessels(vesselsRes.data);

    // ---------- SCHEDULES (ROLE AWARE) ----------
    let schedulesData = [];

    if (user?.role === 'VESSEL_OPERATOR' && user.vessel_id) {
      const res = await PostgresAPI.get(`/schedules/vessel/${user.vessel_id}`);
      schedulesData = res.data;
    }

    if (user?.role === 'PLANT_MANAGER' && user.plant_id) {
      const res = await PostgresAPI.get(`/schedules/plant/${user.plant_id}`);
      schedulesData = res.data;
    }

    if (user?.role === 'PORT_AUTHORITY') {
      const res = await PostgresAPI.get('/schedules');
      schedulesData = res.data;
    }

    // ---------- EVENTS ----------
    let eventsData = [];

    try {
      if (user?.role === 'VESSEL_OPERATOR' && user.vessel_id) {
        const eventsRes = await API.get(`/events/${user.vessel_id}`);
        eventsData = eventsRes.data;
      }

      if (user?.role === 'PORT_AUTHORITY' && selectedVesselId) {
        const eventsRes = await API.get(`/events/${selectedVesselId}`);
        eventsData = eventsRes.data;
      }
    } catch (err) {
      console.log('Events not available:', err);
    }

    // ---------- STATS ----------
    setStats({
      vessels: vesselsRes.data.length,
      ports: portsRes.data.length,
      plants: plantsRes.data.length,
      schedules: schedulesData.length, // ✅ FIXED
      activeVessels: vesselsRes.data.filter(v => v.fuel_status >= 50).length,
      pendingEvents: eventsData.filter(e => !e.resolved).length
    });

    setRecentEvents(eventsData.slice(0, 5));
    setUpcomingSchedules(schedulesData.slice(0, 5)); // ✅ FIXED
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

  useEffect(() => {
  if (userRole === 'PORT_AUTHORITY' && selectedVesselId) {
    fetchDashboardData();
  }
}, [selectedVesselId]);

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
            <h3 className="text-xl font-bold text-gray-800">Events</h3>

          <div className="flex items-center gap-3">

            {userRole === 'PORT_AUTHORITY' && (
              <select
                value={selectedVesselId}
                onChange={(e) => setSelectedVesselId(e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="">Select vessel</option>
                {vessels.map(v => (
                  <option key={v.vessel_id} value={v.vessel_id}>
                    {v.vessel_name} ({v.vessel_id})
                  </option>
                ))}
              </select>
            )}

            {userRole === 'VESSEL_OPERATOR' && (
              <button
                onClick={() => setShowAddEvent(prev => !prev)}
                className="text-sm text-blue-600 font-medium"
              >
                Add Event
              </button>

            )}

            <span className="text-sm text-gray-600">{recentEvents.length} events</span>
          </div>

          </div>
                    {userRole === 'VESSEL_OPERATOR' && showAddEvent && (
                    <div className="mb-4 p-4 border border-blue-200 bg-blue-50 rounded-lg space-y-3">
                      
                      <input
                        type="text"
                        placeholder="Event type (e.g. Engine Issue)"
                        value={newEvent.event_type}
                        onChange={(e) => setNewEvent({ ...newEvent, event_type: e.target.value })}
                        className="w-full px-3 py-2 border rounded text-sm text-gray-600"
                      />

                      <textarea
                        placeholder="Description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        className="w-full px-3 py-2 border rounded text-sm text-gray-600"
                        rows={2}
                      />


                      <select
                        value={newEvent.severity}
                        onChange={(e) => setNewEvent({ ...newEvent, severity: e.target.value })}
                        className="px-3 py-2 border rounded text-sm"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>

                      <div className="flex gap-3">
                        <button
                          onClick={handleAddEvent}
                          className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                        >
                          Submit
                        </button>

                        <button
                          onClick={() => setShowAddEvent(false)}
                          className="px-4 py-2 text-sm text-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                    {userRole === 'PLANT_MANAGER' ? ( 
            <p className="text-gray-600 text-center py-8">No access</p>
          )
           : recentEvents.length === 0 ? (

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
                      {userRole === 'VESSEL_OPERATOR' && (
                      <button className="mt-2 text-xs text-blue-600 font-medium">
                        Change Status
                      </button>
                    )}

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
            <h3 className="text-xl font-bold text-gray-800">Schedules</h3>
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
                    <span> ETA: {schedule.planned_eta ? new Date(schedule.planned_eta).toLocaleDateString() : 'N/A'}</span>
                    {schedule.loading_unloading_duration && (
                      <span> Duration: {schedule.loading_unloading_duration}h</span>
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