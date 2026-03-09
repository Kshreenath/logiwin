import { motion } from "framer-motion";
import { Fuel, ShieldAlert, TrendingDown } from "lucide-react";
import { fuelData, fuelChartData } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from "recharts";

const stats = [
  { label: "Total Fuel Cost This Month", value: "₹18.4L", icon: Fuel, color: "text-primary" },
  { label: "Pilferage Detected", value: "₹43,200 saved", icon: ShieldAlert, color: "text-destructive" },
  { label: "Avg Efficiency", value: "4.2 km/L", icon: TrendingDown, color: "text-success" },
];

const FuelIntelligence = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Fuel & Expense Intelligence</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children">
        {stats.map((s) => (
          <motion.div key={s.label} whileHover={{ y: -2 }} className="bg-card rounded-xl p-5 border border-border shadow-sm">
            <s.icon className={`w-5 h-5 ${s.color} mb-3`} />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground text-sm">Vehicle Fuel Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Vehicle No.</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Driver</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Fuel Level</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Last Fill</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Efficiency</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {fuelData.map((row) => (
                <tr key={row.vehicle} className={`${row.status === "pilferage" ? "bg-destructive/5" : ""} hover:bg-secondary/30 transition-colors`}>
                  <td className="px-5 py-3 font-medium text-foreground">{row.vehicle}</td>
                  <td className="px-5 py-3 text-foreground">{row.driver}</td>
                  <td className="px-5 py-3 text-foreground">{row.fuelLevel}%</td>
                  <td className="px-5 py-3 text-muted-foreground">{row.lastFill}</td>
                  <td className="px-5 py-3 text-foreground">{row.efficiency} km/L</td>
                  <td className="px-5 py-3">
                    {row.status === "pilferage" ? (
                      <span className="bg-destructive/10 text-destructive text-xs font-medium px-2.5 py-1 rounded-full">
                        ⚠ Pilferage Alert
                      </span>
                    ) : (
                      <span className="bg-success/10 text-success text-xs font-medium px-2.5 py-1 rounded-full">Normal</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fuel Chart */}
      <div className="bg-card rounded-xl border border-border shadow-sm p-5">
        <h2 className="font-semibold text-foreground text-sm mb-4">Fuel Level — MH12-AB-4421 (24hr)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fuelChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }} domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="level" stroke="hsl(217, 91%, 50%)" strokeWidth={2} dot={false} />
            <ReferenceLine x="14:00" stroke="hsl(0, 84%, 60%)" strokeDasharray="5 5">
              <Label value="Suspected pilferage — 18L drop" position="top" fill="hsl(0, 84%, 60%)" fontSize={11} />
            </ReferenceLine>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FuelIntelligence;
