import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Route, Zap, Clock, IndianRupee, Truck, ArrowRight } from "lucide-react";

const disruptions = ["Road Closure", "Bharat Bandh", "Vehicle Breakdown", "Weather Delay"];
const corridors = ["Delhi–Mumbai NH-48", "Mumbai–Pune Expressway", "Delhi–Jaipur NH-48", "Bangalore–Chennai NH-44", "Ahmedabad–Surat NH-48"];

const SimulateRoute = () => {
  const [disruption, setDisruption] = useState(disruptions[0]);
  const [corridor, setCorridor] = useState(corridors[0]);
  const [duration, setDuration] = useState(12);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<boolean>(false);

  const runSimulation = () => {
    setLoading(true);
    setResults(false);
    setTimeout(() => {
      setLoading(false);
      setResults(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Route Simulation & Network Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">Simulate disruptions before they happen.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario builder */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-5">
          <h2 className="font-semibold text-foreground text-sm flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" /> Scenario Builder
          </h2>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Disruption Type</label>
            <select
              value={disruption}
              onChange={(e) => setDisruption(e.target.value)}
              className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {disruptions.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Affected Corridor</label>
            <select
              value={corridor}
              onChange={(e) => setCorridor(e.target.value)}
              className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {corridors.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
              Disruption Duration: <strong className="text-foreground">{duration} hrs</strong>
            </label>
            <input
              type="range"
              min={1}
              max={72}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>1 hr</span>
              <span>72 hrs</span>
            </div>
          </div>

          <button
            onClick={runSimulation}
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Computing...
              </>
            ) : (
              <>
                <Route className="w-4 h-4" />
                Run Simulation
              </>
            )}
          </button>
        </div>

        {/* Results */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-6 flex items-center justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Analyzing fleet impact...</p>
                <div className="w-48 h-1.5 bg-secondary rounded-full mt-3 mx-auto overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5 }}
                  />
                </div>
              </motion.div>
            )}

            {!loading && !results && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <Route className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Configure a scenario and run simulation</p>
              </motion.div>
            )}

            {!loading && results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full space-y-4"
              >
                <h3 className="font-semibold text-foreground text-sm">Simulation Results</h3>
                <p className="text-xs text-muted-foreground">
                  {disruption} on {corridor} for {duration} hrs
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                    <Truck className="w-4 h-4 text-destructive mb-1" />
                    <p className="text-lg font-bold text-foreground">7</p>
                    <p className="text-[10px] text-muted-foreground">Vehicles Impacted</p>
                  </div>
                  <div className="bg-warning/5 border border-warning/20 rounded-lg p-3">
                    <Clock className="w-4 h-4 text-warning mb-1" />
                    <p className="text-lg font-bold text-foreground">14.5 hrs</p>
                    <p className="text-[10px] text-muted-foreground">Total Delay</p>
                  </div>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                    <IndianRupee className="w-4 h-4 text-destructive mb-1" />
                    <p className="text-lg font-bold text-foreground">₹2.3L</p>
                    <p className="text-[10px] text-muted-foreground">Cost Impact</p>
                  </div>
                  <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                    <Route className="w-4 h-4 text-success mb-1" />
                    <p className="text-lg font-bold text-foreground">3</p>
                    <p className="text-[10px] text-muted-foreground">Reroute Options</p>
                  </div>
                </div>

                {/* Reroute suggestions */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground">Recommended Reroutes</h4>
                  {[
                    { from: "NH-48 via Udaipur", saves: "3.2 hrs", extra: "+45 km" },
                    { from: "NH-44 via Indore", saves: "2.8 hrs", extra: "+62 km" },
                    { from: "SH-17 via Nashik", saves: "1.5 hrs", extra: "+28 km" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between bg-secondary/50 rounded-lg px-4 py-2.5 text-xs">
                      <span className="text-foreground font-medium flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 text-primary" />
                        {r.from}
                      </span>
                      <span className="text-success font-medium">Saves {r.saves}</span>
                      <span className="text-muted-foreground">{r.extra}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SimulateRoute;
