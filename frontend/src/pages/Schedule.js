import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Clock, Download } from 'lucide-react';
import { PostgresAPI } from '../services/api';

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const schedule_id = `SCH-${Date.now()}`;
  const [view, setView] = useState('list'); // list or calendar
 const [showAddModal, setShowAddModal] = useState(false);
  
const [newSchedule, setNewSchedule] = useState({
  vessel_id: '',
  port_id: '',
  planned_eta: '',
  loading_unloading_duration: ''
});

  const [vessels, setVessels] = useState([]);
  const [ports, setPorts] = useState([]);

useEffect(() => {
  const fetchSchedules = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem('user'));
      let response;

      if (user?.role === 'PORT_AUTHORITY') {
        response = await PostgresAPI.get('/schedules');
      } 
      else if (user?.role === 'VESSEL_OPERATOR' && user.vessel_id) {
        response = await PostgresAPI.get(`/schedules/vessel/${user.vessel_id}`);
      } 
      else if (user?.role === 'PLANT_MANAGER' && user.plant_id) {
        response = await PostgresAPI.get(`/schedules/plant/${user.plant_id}`);
      } 
      else {
        setSchedules([]);
        return;
      }

      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setSchedules([]);
    } finally {
      setLoading(false);
    }
  };

  fetchSchedules();
}, []);


  const handleGenerateSchedule = async () => {
    try {
      const response = await PostgresAPI.get('/schedules/generate');
      // Assuming the response has the schedule data
      alert('Intelligent schedule generated successfully!');
      // Refresh schedules
      const schedulesResponse = await PostgresAPI.get('/schedules');
      setSchedules(schedulesResponse.data);
    } catch (error) {
      console.error('Error generating schedule:', error);
      alert('Failed to generate schedule');
    }
  };

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
const handleAddSchedule = async () => {
 
  try {
    if (
      !newSchedule.vessel_id ||
      !newSchedule.port_id ||
      !newSchedule.planned_eta
    ) {
      alert('All fields are required');
      return;
    }

    await PostgresAPI.post('/schedules', {
      vessel_id: newSchedule.vessel_id,
      port_id: newSchedule.port_id,
      planned_eta: newSchedule.planned_eta,
      loading_unloading_duration: Number(newSchedule.loading_unloading_duration),
      status: 'Scheduled'
    });

    setShowAddModal(false);
    setNewSchedule({
      vessel_id: '',
      port_id: '',
      planned_eta: '',
      loading_unloading_duration: ''
    });

    const res = await PostgresAPI.get('/schedules');
    setSchedules(res.data);

  } catch (err) {
    console.error('Add schedule failed', err.response?.data || err.message);
    alert(err.response?.data?.message || 'Failed to add schedule');
  }
};



useEffect(() => {
  const fetchMeta = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role !== 'PORT_AUTHORITY') return;

    try {
      const [vRes, pRes] = await Promise.all([
        PostgresAPI.get('/vessels'),
        PostgresAPI.get('/ports')
      ]);

      setVessels(vRes.data);
      setPorts(pRes.data);
    } catch (err) {
      console.error('Failed to load vessels/ports', err);
    }
  };

  fetchMeta();
}, []);


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
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700"
            >
              <Calendar size={18} />
              <span>{view === 'list' ? 'Calendar View' : 'List View'}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700">
              <Download size={18} />
              <span>Export</span>
            </button>
            <button 
              onClick={handleGenerateSchedule}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              <Plus size={18} />
              <span>Generate Intelligent Schedule</span>
            </button>
            {JSON.parse(localStorage.getItem('user'))?.role === 'PORT_AUTHORITY' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus size={18} />
                <span>Create Schedule</span>
              </button>
            )}
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
              <p className="text-2xl font-bold text-gray-800 ">{schedules.length}</p>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">L/UL Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Priority</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedules.map(schedule => (
                <tr key={schedule.id} className="hover:bg-gray-50 transition cursor-pointer text-gray-600">
                <td className="px-6 py-4 font-medium text-gray-800">
                  {schedule.vessel_id}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {schedule.port_name || schedule.port_id}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {schedule.cargo_type || '—'}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {schedule.planned_eta
                    ? new Date(schedule.planned_eta).toLocaleString()
                    : 'N/A'}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {schedule.departure_time
                    ? new Date(schedule.departure_time).toLocaleString()
                    : 'N/A'}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {schedule.loading_unloading_duration
                    ? `${schedule.loading_unloading_duration} hrs`
                    : '—'}
                </td>

                  <td className="px-6 py-4 text-gray-600">
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
              <div className="flex-1 ">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">
                    {schedule.vessel_id}
                  </h4>

                  <span className="text-sm text-gray-600">
                    {schedule.planned_eta
                      ? new Date(schedule.planned_eta).toLocaleTimeString()
                      : 'N/A'}
                  </span>

                  <p className="text-sm text-gray-600">
                    {schedule.port_name || schedule.port_id}
                  </p>

                  <span className="text-sm text-gray-800">
                    Duration: {schedule.loading_unloading_duration || '—'} hrs
                  </span>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
{showAddModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Add Schedule</h3>

      <div className="space-y-3">
        <input
          placeholder="Schedule ID"
          value={newSchedule.schedule_id}
          onChange={e => setNewSchedule({ ...newSchedule, schedule_id: e.target.value })}
          className="w-full border px-3 py-2 rounded text-gray-800"
        />

        <select
          value={newSchedule.vessel_id}
          onChange={e => setNewSchedule({ ...newSchedule, vessel_id: e.target.value })}
          className="w-full border px-3 py-2 rounded text-gray-800"
        >
          <option value="">Select Vessel</option>
          {vessels.map(v => (
            <option key={v.vessel_id} value={v.vessel_id}>
              {v.vessel_name} ({v.vessel_id})
            </option>
          ))}
        </select>

        <select
          value={newSchedule.port_id}
          onChange={e => setNewSchedule({ ...newSchedule, port_id: e.target.value })}
          className="w-full border px-3 py-2 rounded text-gray-800"
        >
          <option value="">Select Port</option>
          {ports.map(p => (
            <option key={p.port_id} value={p.port_id}>
              {p.port_name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={newSchedule.planned_eta}
          onChange={e => setNewSchedule({ ...newSchedule, planned_eta: e.target.value })}
          className="w-full border px-3 py-2 rounded text-gray-800"
        />

        <input
          type="number"
          placeholder="Loading / Unloading Duration (hrs)"
          value={newSchedule.loading_unloading_duration}
          onChange={e =>
            setNewSchedule({
              ...newSchedule,
              loading_unloading_duration: Number(e.target.value)
            })
          }
          className="w-full border px-3 py-2 rounded text-gray-800"
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setShowAddModal(false)}
          className="px-4 py-2 border rounded text-gray-800"
        >
          Cancel
        </button>

        <button
          onClick={handleAddSchedule}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>  
  </div>
)}

    </div>
    
  );
};

export default Schedule;