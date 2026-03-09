import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, CheckCircle, Truck, MapPin, Clock, Camera, FileSignature } from "lucide-react";
import { trips } from "@/data/mockData";

type Filter = "all" | "in-transit" | "delivered" | "delayed";

const statusStyles: Record<string, string> = {
  "in-transit": "bg-primary/10 text-primary",
  delivered: "bg-success/10 text-success",
  delayed: "bg-warning/10 text-warning",
};

const TripPOD = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<typeof trips[0] | null>(null);
  const filtered = filter === "all" ? trips : trips.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Trip & POD</h1>

      {/* Filters */}
      <div className="flex gap-2">
        {(["all", "in-transit", "delivered", "delayed"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {f === "all" ? "All" : f === "in-transit" ? "In Transit" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Trip ID</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Route</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Driver</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Status</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">ETA</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">POD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((trip) => (
                <tr
                  key={trip.id}
                  onClick={() => trip.status === "delivered" && setSelected(trip)}
                  className={`hover:bg-secondary/30 transition-colors ${trip.status === "delivered" ? "cursor-pointer" : ""}`}
                >
                  <td className="px-5 py-3 font-medium text-foreground">{trip.id}</td>
                  <td className="px-5 py-3 text-foreground">{trip.route}</td>
                  <td className="px-5 py-3 text-foreground">{trip.driver}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[trip.status]}`}>
                      {trip.status === "in-transit" ? "In Transit" : trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{trip.eta}</td>
                  <td className="px-5 py-3">
                    {trip.pod === "submitted" ? (
                      <span className="text-success text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Submitted
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* POD Detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-card rounded-xl border border-border shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                {selected.id} — Proof of Delivery
              </h2>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Timeline */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              {[
                { icon: Truck, label: "Departed", time: "8:00 AM" },
                { icon: MapPin, label: "En Route", time: "8:30 AM" },
                { icon: Clock, label: "Arrived", time: "12:45 PM" },
                { icon: CheckCircle, label: "POD Submitted", time: "1:02 PM" },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-success/10 text-success rounded-full px-3 py-1.5 text-xs font-medium">
                    <step.icon className="w-3.5 h-3.5" />
                    <span>{step.label}</span>
                    <span className="opacity-70">{step.time}</span>
                  </div>
                  {i < 3 && <div className="w-6 h-0.5 bg-success/30" />}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4">
                <MapPin className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">GPS Coordinates</p>
                <p className="text-sm font-medium text-foreground">28.3942° N, 76.9366° E</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <Clock className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Timestamp</p>
                <p className="text-sm font-medium text-foreground">Mar 9, 2026 1:02 PM</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <FileSignature className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Signature</p>
                <p className="text-sm font-medium text-success">Captured ✓</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4">
                <Camera className="w-4 h-4 text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Photos</p>
                <p className="text-sm font-medium text-success">2 uploaded ✓</p>
              </div>
            </div>

            {selected.invoice && (
              <div className="mt-4 bg-primary/5 border border-primary/20 rounded-lg p-4 text-sm">
                <p className="text-foreground">
                  💰 Invoice auto-generated — <strong>₹{selected.invoice.toLocaleString()}</strong> — Sent to client ✓
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripPOD;
