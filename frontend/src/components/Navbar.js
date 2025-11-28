import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-slate-900 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-cyan-400">
        🚢 Intelligent Vessel Scheduling
      </h1>

      <div className="flex gap-6">
        <NavLink to="/" className="hover:text-cyan-400">Dashboard</NavLink>
        <NavLink to="/vessels" className="hover:text-cyan-400">Vessels</NavLink>
        <NavLink to="/schedule" className="hover:text-cyan-400">Schedules</NavLink>
        <NavLink to="/ports" className="hover:text-cyan-400">Ports</NavLink>
      </div>
    </div>
  );
}
