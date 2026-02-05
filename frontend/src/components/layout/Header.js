import React from 'react';
import { Bell } from 'lucide-react';

const Header = ({ currentPage, userRole }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
          </h1>
          <p className="text-gray-600 text-sm">Welcome back, {userRole}</p>
        </div>
        <div className="flex items-center space-x-4">
          {/* <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell size={24} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button> */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
              {userRole.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;