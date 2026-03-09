import { motion } from "framer-motion";
import { Truck, Fuel, Clock, Users, AlertTriangle } from "lucide-react";
import { alerts } from "@/data/mockData";
import DashboardMap from "@/components/DashboardMap";

const kpis = [
  { label: "Active Vehicles", value: "47/52", icon: Truck, color: "text-primary" },
  { label: "Fuel Alerts Today", value: "3", icon: Fuel, color: "text-destructive", badge: true },
  { label: "Deliveries On-Time", value: "89%", icon: Clock, color: "text-success" },
  { label: "Avg Driver Score", value: "74/100", icon: Users, color: "text-warning" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {kpis.map((kpi) => (
          <motion.div
            key={kpi.label}
            whileHover={{ y: -2 }}
            className="bg-card rounded-xl p-5 border border-border shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              {kpi.badge && (
                <span className="bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  ALERT
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Fleet Map */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
          <h2 className="font-semibold text-foreground text-sm">Live Fleet Overview</h2>
        </div>
        <div className="h-[400px]">
          <DashboardMap />
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-card rounded-xl border border-border shadow-sm">
        <div className="px-5 py-4 border-b border-border flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <h2 className="font-semibold text-foreground text-sm">Recent Alerts</h2>
        </div>
        <div className="divide-y divide-border">
          {alerts.map((alert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="px-5 py-3 flex items-center gap-3 text-sm hover:bg-secondary/50 transition-colors"
            >
              <span className="text-lg">{alert.icon}</span>
              <span className="flex-1 text-foreground">{alert.message}</span>
              <span className="text-muted-foreground text-xs shrink-0">{alert.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
