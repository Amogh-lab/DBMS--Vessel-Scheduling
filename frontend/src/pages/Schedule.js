import { useEffect, useState } from "react";
import API from "../services/api";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    API.get("/schedules").then(res => setSchedules(res.data));
  }, []);

  return (
    <div>
      <h2>Schedule Management</h2>
      <table border="1">
        <tr>
          <th>Vessel</th>
          <th>Port</th>
          <th>Arrival</th>
          <th>Departure</th>
          <th>Status</th>
        </tr>
        {schedules.map(s => (
          <tr key={s.schedule_id}>
            <td>{s.vessel_name}</td>
            <td>{s.port_name}</td>
            <td>{s.arrival_time}</td>
            <td>{s.departure_time}</td>
            <td>{s.schedule_status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Schedule;
