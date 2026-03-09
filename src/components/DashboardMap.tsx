import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { vehicles } from "@/data/mockData";

const getIcon = (status: string) => {
  const color = status === "on-route" ? "#22c55e" : status === "delayed" ? "#f59e0b" : status === "alert" ? "#ef4444" : "#94a3b8";
  return L.divIcon({
    className: "",
    html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3m5 0a3 3 0 1 0 0 0m10 0h1V9h-5l-3-4H10m10 12a3 3 0 1 0 0 0"/></svg>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

const DashboardMap = () => (
  <MapContainer
    center={[22.5, 78.5]}
    zoom={5}
    className="w-full h-full"
    zoomControl={false}
    attributionControl={false}
  >
    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
    {vehicles.map((v) => (
      <Marker key={v.id} position={[v.lat, v.lng]} icon={getIcon(v.status)}>
        <Popup>
          <div className="text-xs space-y-1">
            <p className="font-bold">{v.id}</p>
            <p>{v.driver}</p>
            <p>{v.origin} → {v.destination}</p>
            <p>Speed: {v.speed} km/h</p>
          </div>
        </Popup>
      </Marker>
    ))}
  </MapContainer>
);

export default DashboardMap;
