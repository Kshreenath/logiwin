import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { vehicles } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type StatusFilter = "all" | "on-route" | "delayed" | "idle" | "alert";

const getIcon = (status: string) => {
  const color = status === "on-route" ? "#22c55e" : status === "delayed" ? "#f59e0b" : status === "alert" ? "#ef4444" : "#94a3b8";
  return L.divIcon({
    className: "",
    html: `<div style="width:32px;height:32px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3m5 0a3 3 0 1 0 0 0m10 0h1V9h-5l-3-4H10m10 12a3 3 0 1 0 0 0"/></svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const statusColors: Record<string, string> = {
  "on-route": "bg-success text-success-foreground",
  delayed: "bg-warning text-warning-foreground",
  alert: "bg-destructive text-destructive-foreground",
  idle: "bg-muted text-muted-foreground",
};

const filters: { label: string; value: StatusFilter }[] = [
  { label: "All Vehicles", value: "all" },
  { label: "On Route", value: "on-route" },
  { label: "Delayed", value: "delayed" },
  { label: "Idle", value: "idle" },
  { label: "Alert", value: "alert" },
];

const FleetMap = () => {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [selected, setSelected] = useState<typeof vehicles[0] | null>(null);

  const filtered = filter === "all" ? vehicles : vehicles.filter((v) => v.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Live Fleet Map</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {f.label}
            {f.value !== "all" && (
              <span className="ml-1.5 opacity-70">
                ({vehicles.filter((v) => v.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="relative rounded-xl overflow-hidden border border-border shadow-sm" style={{ height: "calc(100vh - 240px)" }}>
        <MapContainer
          center={[22.5, 78.5]}
          zoom={5}
          className="w-full h-full"
          zoomControl={true}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          {filtered.map((v) => (
            <Marker
              key={v.id}
              position={[v.lat, v.lng]}
              icon={getIcon(v.status)}
              eventHandlers={{ click: () => setSelected(v) }}
            >
              <Popup>
                <span className="text-xs font-bold">{v.id}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Side panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="absolute top-0 right-0 h-full w-80 bg-card border-l border-border shadow-xl z-[1000] overflow-y-auto"
            >
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">{selected.id}</h3>
                  <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Driver</p>
                    <p className="font-medium text-foreground">{selected.driver}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Current Speed</p>
                    <p className="font-medium text-foreground">{selected.speed} km/h</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Trip</p>
                    <p className="font-medium text-foreground">{selected.origin} → {selected.destination}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">ETA</p>
                    <p className="font-medium text-foreground">{selected.eta}</p>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted-foreground">Journey Progress</span>
                      <span className="font-medium text-foreground">{selected.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full animate-progress-fill"
                        style={{ width: `${selected.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-secondary rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Fuel Level</p>
                      <p className="font-bold text-foreground">{selected.fuel}%</p>
                    </div>
                    <div className="bg-secondary rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Driver Score</p>
                      <p className="font-bold text-foreground">{selected.driverScore}/100</p>
                    </div>
                  </div>

                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[selected.status]}`}>
                      {selected.status === "on-route" ? "On Route" : selected.status === "delayed" ? "Delayed" : selected.status === "alert" ? "Alert" : "Idle"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FleetMap;
