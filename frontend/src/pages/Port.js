import { useEffect, useState } from "react";
import API from "../services/api";

const Port = () => {
  const [ports, setPorts] = useState([]);

  useEffect(() => {
    API.get("/ports").then(res => setPorts(res.data));
  }, []);

  return (
    <div>
      <h2>Port Status</h2>
      <table border="1">
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Available Berths</th>
        </tr>
        {ports.map(p => (
          <tr key={p.port_id}>
            <td>{p.port_name}</td>
            <td>{p.port_status}</td>
            <td>{p.berth_capacity - p.current_occupied_berths}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Port;
