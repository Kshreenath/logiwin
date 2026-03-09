import { motion } from "framer-motion";
import { Wrench, AlertTriangle, CheckCircle } from "lucide-react";
import { maintenanceAlerts } from "@/data/mockData";
import { toast } from "sonner";

const riskConfig = {
  high: { icon: AlertTriangle, color: "border-destructive/30 bg-destructive/5", badge: "bg-destructive text-destructive-foreground", label: "HIGH RISK" },
  medium: { icon: Wrench, color: "border-warning/30 bg-warning/5", badge: "bg-warning text-warning-foreground", label: "MEDIUM" },
  low: { icon: CheckCircle, color: "border-success/30 bg-success/5", badge: "bg-success text-success-foreground", label: "LOW" },
};

const MaintenanceAlerts = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Predictive Maintenance Engine</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 stagger-children">
        {maintenanceAlerts.map((alert) => {
          const config = riskConfig[alert.risk];
          const Icon = config.icon;
          return (
            <motion.div
              key={alert.vehicle}
              whileHover={{ y: -2 }}
              className={`rounded-xl border-2 ${config.color} p-5 shadow-sm`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon className="w-5 h-5" />
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.badge}`}>
                  {config.label}
                </span>
              </div>
              <p className="font-bold text-foreground text-sm mb-1">{alert.vehicle}</p>
              <p className="text-sm text-foreground mb-1">"{alert.issue}"</p>
              <p className="text-xs text-muted-foreground mb-4">Recommended: {alert.recommendation}</p>

              {/* Risk score bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Risk Score</span>
                  <span className="font-bold text-foreground">{alert.riskScore}/100</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full animate-progress-fill ${
                      alert.risk === "high" ? "bg-destructive" : alert.risk === "medium" ? "bg-warning" : "bg-success"
                    }`}
                    style={{ width: `${alert.riskScore}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => toast.success(`Service scheduled for ${alert.vehicle}`)}
                className="w-full rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Schedule Service
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MaintenanceAlerts;
