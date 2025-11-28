import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Vessel from "./pages/Vessel";
import Schedule from "./pages/Schedule";
import Port from "./pages/Port";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vessels" element={<Vessel />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/ports" element={<Port />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
