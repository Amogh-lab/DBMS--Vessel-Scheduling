// import React, { useState } from 'react';
// import { Ship, TrendingUp, Calendar, Anchor } from 'lucide-react';
// import Sidebar from './components/layout/Sidebar';
// import Header from './components/layout/Header';
// import Dashboard from './pages/dashboard/Dashboard';
// import Vessels from './pages/Vessels';
// import Ports from './pages/Ports';
// import Schedule from './pages/Schedule';
// import Plants from './pages/Plants';
// import Tracking from './pages/Tracking';
// import './App.css';

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [loginForm, setLoginForm] = useState({ email: '', password: '' });
//   const [userRole, setUserRole] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (loginForm.email && loginForm.password) {
//       setIsAuthenticated(true);
//       setUserRole(loginForm.email.includes('admin') ? 'Admin' : 'Port Manager');
//     }
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setLoginForm({ email: '', password: '' });
//     setCurrentPage('dashboard');
//   };

//   // Login Page
//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex items-center justify-center p-4">
//         <div className="absolute inset-0 bg-black opacity-20"></div>
        
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//           <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
//         </div>

//         <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex">
//           <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-cyan-600 p-12 flex-col justify-between text-white">
//             <div>
//               <div className="flex items-center space-x-3 mb-8">
//                 <Ship className="w-12 h-12" />
//                 <h1 className="text-3xl font-bold">IVSS</h1>
//               </div>
//               <h2 className="text-3xl font-bold mb-4">Intelligent Vessel Scheduling System</h2>
//               <p className="text-blue-100 text-lg">AI-powered maritime logistics optimization for ports and vessels</p>
//             </div>
//             <div className="space-y-4">
//               <div className="flex items-center space-x-3">
//                 <TrendingUp className="w-6 h-6" />
//                 <span>Predictive Analytics</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Calendar className="w-6 h-6" />
//                 <span>Dynamic Scheduling</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <Anchor className="w-6 h-6" />
//                 <span>Real-time Port Management</span>
//               </div>
//             </div>
//           </div>
//       <div className="w-full md:w-1/2 p-12">
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
//           <p className="text-gray-600">Sign in to access the system</p>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
//             <input
//               type="email"
//               value={loginForm.email}
//               onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               placeholder="admin@ivss.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               value={loginForm.password}
//               onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
//               onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//               placeholder="Enter your password"
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <label className="flex items-center">
//               <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
//               <span className="ml-2 text-sm text-gray-600">Remember me</span>
//             </label>
//             <button className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</button>
//           </div>

//           <button
//             onClick={handleLogin}
//             className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition duration-200 shadow-lg"
//           >
//             Sign In
//           </button>
//         </div>

//         <div className="mt-6 text-center text-sm text-gray-600">
//           Demo: Enter any email and password to login
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }
// // Render Current Page
// const renderPage = () => {
// switch (currentPage) {
// case 'dashboard': return <Dashboard />;
// case 'vessels': return <Vessels />;
// case 'ports': return <Ports />;
// case 'schedule': return <Schedule />;
// case 'plants': return <Plants />;
// case 'tracking': return <Tracking />;
// default: return <Dashboard />;
// }
// };
// return (
// <div className="flex h-screen bg-gray-100">
// <Sidebar 
//      sidebarOpen={sidebarOpen}
//      setSidebarOpen={setSidebarOpen}
//      currentPage={currentPage}
//      setCurrentPage={setCurrentPage}
//      handleLogout={handleLogout}
//    />
//   <div className="flex-1 flex flex-col overflow-hidden">
//     <Header currentPage={currentPage} userRole={userRole} />
//     <main className="flex-1 overflow-y-auto p-8">
//       {renderPage()}
//     </main>
//   </div>
// </div>
// );
// };
// export default App;
              

import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/dashboard/Dashboard';
import Vessels from './pages/Vessels';
import Ports from './pages/Ports';
import Schedule from './pages/Schedule';
import Plants from './pages/Plants';
import Tracking from './pages/Tracking';
import PredictETA from './pages/PredictETA';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('dashboard');
  };

  // Show Signup Page
  if (showSignup && !isAuthenticated) {
    return <Signup setShowSignup={setShowSignup} />;
  }

  // Show Login Page
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} setShowSignup={setShowSignup} />;
  }

  // Render Current Page based on selection
const renderPage = () => {
  switch (currentPage) {
    case 'dashboard':
      return <Dashboard />;
    case 'vessels':
      return <Vessels />;
    case 'ports':
      return <Ports />;
    case 'schedule':
      return <Schedule />;
    case 'plants':
      return <Plants />;
    case 'tracking':
      return <Tracking />;
    case 'predict':
      return <PredictETA />;   // 👈 THIS LINE
    default:
      return <Dashboard />;
  }
};


  // Main Application Layout (after authentication)
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          currentPage={currentPage} 
          userRole={user?.role || 'User'}
          username={user?.username || 'User'}
        />
        <main className="flex-1 overflow-y-auto p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;