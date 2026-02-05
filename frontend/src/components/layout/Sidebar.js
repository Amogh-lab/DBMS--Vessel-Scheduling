import React from 'react';
import { Ship, Anchor, Calendar, TrendingUp, Package, MapPin, Settings, LogOut, Menu, X } from 'lucide-react';
import { Brain } from 'lucide-react';


const Sidebar = ({ sidebarOpen, setSidebarOpen, currentPage, setCurrentPage, handleLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: TrendingUp, label: 'Dashboard' },
    { id: 'vessels', icon: Ship, label: 'Vessels' },
    { id: 'ports', icon: Anchor, label: 'Ports' },
    { id: 'schedule', icon: Calendar, label: 'Schedule' },
    { id: 'plants', icon: Package, label: 'Plants' },
    { id: 'tracking', icon: MapPin, label: 'Tracking' },
    { id: 'predict', icon: Brain, label: 'Predict ETA' }

  ];

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 flex flex-col`}>
      <div className="p-6 flex items-center justify-between border-b border-blue-700">
        {sidebarOpen && (
          <div className="flex items-center space-x-3">
            <Ship className="w-8 h-8" />
            <span className="font-bold text-xl">IVSS</span>
          </div>
        )}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-blue-700 rounded">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${
              currentPage === item.id ? 'bg-blue-700 shadow-lg' : 'hover:bg-blue-800'
            }`}
          >
            <item.icon size={20} />
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-700 space-y-2">
        {/* <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-800 transition">
          <Settings size={20} />
          {sidebarOpen && <span>Settings</span>}
        </button> */}
        <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-700 transition">
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;