import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ArrowDown, Award, X } from "lucide-react";
import { driverLeaderboard, driverRadarData } from "@/data/mockData";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

const rankBadge = (rank: number) => {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return rank;
};

const DriverScores = () => {
  const [selectedDriver, setSelectedDriver] = useState<typeof driverLeaderboard[0] | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground">Driver Scores</h1>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Rank</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Driver Name</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Vehicle</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Safety Score</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Trips</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Incidents</th>
                <th className="text-left px-5 py-3 text-muted-foreground font-medium text-xs">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {driverLeaderboard.map((d) => (
                <tr
                  key={d.rank}
                  onClick={() => setSelectedDriver(d)}
                  className={`cursor-pointer hover:bg-secondary/30 transition-colors ${d.rank >= 9 ? "bg-destructive/5" : ""}`}
                >
                  <td className="px-5 py-3 text-lg">{rankBadge(d.rank)}</td>
                  <td className="px-5 py-3 font-medium text-foreground">{d.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{d.vehicle}</td>
                  <td className="px-5 py-3">
                    <span className={`font-bold ${d.score >= 80 ? "text-success" : d.score >= 70 ? "text-warning" : "text-destructive"}`}>
                      {d.score}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-foreground">{d.trips}</td>
                  <td className="px-5 py-3 text-foreground">{d.incidents}</td>
                  <td className="px-5 py-3">
                    {d.trend === "up" ? (
                      <ArrowUp className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-destructive" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Driver detail panel */}
      <AnimatePresence>
        {selectedDriver && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-card rounded-xl border border-border shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-foreground">{selectedDriver.name}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedDriver.score >= 80
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }`}>
                  {selectedDriver.score >= 80 ? "Safe Driver — 3 months streak" : "Needs Coaching"}
                </span>
              </div>
              <button onClick={() => setSelectedDriver(null)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radar chart */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Driving Profile</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={driverRadarData}>
                    <PolarGrid stroke="hsl(220, 13%, 91%)" />
                    <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: "hsl(220, 9%, 46%)" }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
                    <Radar dataKey="value" stroke="hsl(217, 91%, 50%)" fill="hsl(217, 91%, 50%)" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Last 5 trips */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Last 5 Trips</h3>
                <div className="space-y-2">
                  {[92, 88, 85, 79, 91].map((score, i) => (
                    <div key={i} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2.5 text-sm">
                      <span className="text-foreground">Trip #{i + 1}</span>
                      <span className={`font-bold ${score >= 80 ? "text-success" : "text-warning"}`}>{score}/100</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DriverScores;
