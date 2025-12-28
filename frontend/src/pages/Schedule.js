import React, { useState } from 'react';
import { Calendar, Plus, Clock, Download } from 'lucide-react';

const Schedule = () => {
  const [schedules] = useState([
    { 
      id: 1, 
      vessel: 'Pacific Trader', 
      port: 'Mumbai Port', 
      arrival: '2024-12-25 14:30', 
      departure: '2024-12-26 08:00', 
      duration: '17.5h',
      status: 'Scheduled',
      cargo: 'Steel',
      priority: 'High'
    },
    { 
      id: 2, 
      vessel: 'Atlantic Express', 
      port: 'Chennai Port', 
      arrival: '2024-12-24 18:00', 
      departure: '2024-12-25 12:00', 
      duration: '18h',
      status: 'In Progress',
      cargo: 'Containers',
      priority: 'Medium'
    },
    { 
      id: 3, 
      vessel: 'Nordic Carrier', 
      port: 'Vizag Port', 
      arrival: '2024-12-26 09:15', 
      departure: '2024-12-27 06:00', 
      duration: '20.75h',
      status: 'Delayed',
      cargo: 'Coal',
      priority: 'Low'
    },
    { 
      id: 4, 
      vessel: 'Mediterranean Queen', 
      port: 'Cochin Port', 
      arrival: '2024-12-27 10:00', 
      departure: '2024-12-28 04:00', 
      duration: '18h',
      status: 'Scheduled',
      cargo: 'Oil',
      priority: 'High'
    },
    { 
      id: 5, 
      vessel: 'Baltic Star', 
      port: 'Mumbai Port', 
      arrival: '2024-12-28 16:30', 
      departure: '2024-12-29 10:30', 
      duration: '18h',
      status: 'Scheduled',
      cargo: 'Grain',
      priority: 'Medium'
    }
  ]);

  const [view, setView] = useState('list'); // list or calendar

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-700';
      case 'In Progress': return 'bg-green-100 text-green-700';
      case 'Delayed': return 'bg-red-100 text-red-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Vessel Schedule</h2>
            <p className="text-gray-600 text-sm mt-1">Manage arrival and departure schedules</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Calendar size={18} />
              <span>{view === 'list' ? 'Calendar View' : 'List View'}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Download size={18} />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              <Plus size={18} />
              <span>Create Schedule</span>
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Schedules</p>
              <p className="text-2xl font-bold text-gray-800">{schedules.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">In Progress</p>
              <p className="text-2xl font-bold text-green-600">
                {schedules.filter(s => s.status === 'In Progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Upcoming</p>
              <p className="text-2xl font-bold text-blue-600">
                {schedules.filter(s => s.status === 'Scheduled').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Delayed</p>
              <p className="text-2xl font-bold text-red-600">
                {schedules.filter(s => s.status === 'Delayed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Vessel</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Port</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cargo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Arrival</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Departure</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedules.map(schedule => (
                <tr key={schedule.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{schedule.vessel}</td>
                  <td className="px-6 py-4 text-gray-600">{schedule.port}</td>
                  <td className="px-6 py-4 text-gray-600">{schedule.cargo}</td>
                  <td className="px-6 py-4 text-gray-600">{schedule.arrival}</td>
                  <td className="px-6 py-4 text-gray-600">{schedule.departure}</td>
                  <td className="px-6 py-4 text-gray-600">{schedule.duration}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(schedule.priority)}`}>
                      {schedule.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(schedule.status)}`}>
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timeline View */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Today's Schedule Timeline</h3>
        <div className="space-y-4">
          {schedules.slice(0, 3).map(schedule => (
            <div key={schedule.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${
                  schedule.status === 'In Progress' ? 'bg-green-500' :
                  schedule.status === 'Scheduled' ? 'bg-blue-500' :
                  'bg-red-500'
                }`}></div>
                <div className="w-0.5 h-16 bg-gray-300"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{schedule.vessel}</h4>
                  <span className="text-sm text-gray-600">{schedule.arrival}</span>
                </div>
                <p className="text-sm text-gray-600">{schedule.port} • {schedule.cargo}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Clock size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">Duration: {schedule.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;