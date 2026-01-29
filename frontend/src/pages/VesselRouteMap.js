import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const VesselRouteMap = ({ aisData }) => {
  if (!aisData || aisData.length === 0) return null;

  const route = [...aisData]
    .reverse()
    .map(log => [log.coordinates.lat, log.coordinates.lon]);

  const start = route[0];
  const current = route[route.length - 1];

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border">
      <MapContainer center={current} zoom={6} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* Vessel Route */}
        <Polyline positions={route} color="#2563eb" weight={4} />

        {/* Start Marker */}
        <Marker position={start}>
          <Popup>Journey Start</Popup>
        </Marker>

        {/* Current Position */}
        <Marker position={current}>
          <Popup>Current Position</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default VesselRouteMap;
