export const vehicles = [
  { id: "MH12-AB-4421", driver: "Rajesh Patil", lat: 18.9, lng: 73.1, status: "alert" as const, speed: 0, origin: "Mumbai", destination: "Pune", eta: "2:45 PM", progress: 45, fuel: 52, driverScore: 68, trip: "T-1021" },
  { id: "DL01-CD-9981", driver: "Amar Singh", lat: 28.2, lng: 76.8, status: "delayed" as const, speed: 35, origin: "Delhi", destination: "Jaipur", eta: "6:30 PM", progress: 62, fuel: 68, driverScore: 81, trip: "T-1022" },
  { id: "HR26-EF-1123", driver: "Vikram Yadav", lat: 28.3, lng: 76.5, status: "on-route" as const, speed: 72, origin: "Gurgaon", destination: "Dharuhera", eta: "1:15 PM", progress: 88, fuel: 74, driverScore: 91, trip: "T-1023" },
  { id: "UP32-GH-7723", driver: "Sunil Kumar", lat: 26.8, lng: 80.9, status: "on-route" as const, speed: 65, origin: "Lucknow", destination: "Kanpur", eta: "3:00 PM", progress: 55, fuel: 81, driverScore: 77, trip: "T-1024" },
  { id: "RJ14-JK-3302", driver: "Mohan Lal", lat: 26.9, lng: 75.7, status: "on-route" as const, speed: 78, origin: "Jaipur", destination: "Ajmer", eta: "12:30 PM", progress: 72, fuel: 63, driverScore: 84, trip: "T-1025" },
  { id: "GJ05-LM-8891", driver: "Kiran Patel", lat: 23.0, lng: 72.5, status: "on-route" as const, speed: 60, origin: "Ahmedabad", destination: "Surat", eta: "4:00 PM", progress: 38, fuel: 71, driverScore: 79, trip: "T-1026" },
  { id: "MH04-NP-2210", driver: "Sachin More", lat: 19.9, lng: 75.3, status: "delayed" as const, speed: 22, origin: "Aurangabad", destination: "Nagpur", eta: "8:00 PM", progress: 30, fuel: 55, driverScore: 72, trip: "T-1027" },
  { id: "MP09-QR-5567", driver: "Deepak Jain", lat: 23.2, lng: 77.4, status: "on-route" as const, speed: 70, origin: "Bhopal", destination: "Indore", eta: "5:15 PM", progress: 48, fuel: 66, driverScore: 86, trip: "T-1028" },
  { id: "KA01-ST-6643", driver: "Ramesh Gowda", lat: 12.9, lng: 77.5, status: "on-route" as const, speed: 55, origin: "Bangalore", destination: "Mysore", eta: "2:00 PM", progress: 65, fuel: 78, driverScore: 88, trip: "T-1029" },
  { id: "TN07-UV-9901", driver: "Muthu Krishnan", lat: 13.0, lng: 80.2, status: "idle" as const, speed: 0, origin: "Chennai", destination: "Coimbatore", eta: "—", progress: 0, fuel: 90, driverScore: 82, trip: "T-1030" },
];

export const alerts = [
  { type: "red" as const, icon: "🔴", message: "Fuel drop detected — MH12-AB-4421 — Pune Highway", time: "2 min ago" },
  { type: "yellow" as const, icon: "🟡", message: "Off-route — DL01-CD-9981 — 4 km deviation", time: "5 min ago" },
  { type: "green" as const, icon: "🟢", message: "POD submitted — HR26-EF-1123 — Delivered at Dharuhera", time: "8 min ago" },
  { type: "red" as const, icon: "🔴", message: "Harsh braking — MH04-NP-2210 — Aurangabad Highway", time: "12 min ago" },
  { type: "yellow" as const, icon: "🟡", message: "Idle > 30 min — TN07-UV-9901 — Chennai depot", time: "18 min ago" },
];

export const driverLeaderboard = [
  { rank: 1, name: "Vikram Yadav", vehicle: "HR26-EF-1123", score: 91, trips: 24, incidents: 0, trend: "up" as const },
  { rank: 2, name: "Ramesh Gowda", vehicle: "KA01-ST-6643", score: 88, trips: 22, incidents: 1, trend: "up" as const },
  { rank: 3, name: "Deepak Jain", vehicle: "MP09-QR-5567", score: 86, trips: 19, incidents: 1, trend: "up" as const },
  { rank: 4, name: "Mohan Lal", vehicle: "RJ14-JK-3302", score: 84, trips: 21, incidents: 2, trend: "up" as const },
  { rank: 5, name: "Muthu Krishnan", vehicle: "TN07-UV-9901", score: 82, trips: 18, incidents: 1, trend: "down" as const },
  { rank: 6, name: "Amar Singh", vehicle: "DL01-CD-9981", score: 81, trips: 20, incidents: 2, trend: "down" as const },
  { rank: 7, name: "Kiran Patel", vehicle: "GJ05-LM-8891", score: 79, trips: 17, incidents: 3, trend: "up" as const },
  { rank: 8, name: "Sunil Kumar", vehicle: "UP32-GH-7723", score: 77, trips: 23, incidents: 3, trend: "down" as const },
  { rank: 9, name: "Sachin More", vehicle: "MH04-NP-2210", score: 72, trips: 15, incidents: 4, trend: "down" as const },
  { rank: 10, name: "Rajesh Patil", vehicle: "MH12-AB-4421", score: 68, trips: 16, incidents: 5, trend: "down" as const },
];

export const fuelData = vehicles.map(v => ({
  vehicle: v.id,
  driver: v.driver,
  fuelLevel: v.fuel,
  lastFill: `${Math.floor(Math.random() * 3) + 1} days ago`,
  efficiency: (3.5 + Math.random() * 1.5).toFixed(1),
  status: v.id === "MH12-AB-4421" || v.id === "MH04-NP-2210" ? "pilferage" as const : "normal" as const,
}));

export const fuelChartData = Array.from({ length: 24 }, (_, i) => {
  let level = 85 - i * 1.2;
  if (i === 14) level = 85 - 13 * 1.2 - 18; // sharp pilferage drop
  if (i > 14) level = 85 - 13 * 1.2 - 18 - (i - 14) * 1.1;
  return { hour: `${i}:00`, level: Math.max(Math.round(level), 12) };
});

export const trips = [
  { id: "T-1023", route: "Gurgaon → Dharuhera", driver: "Vikram Yadav", status: "delivered" as const, eta: "1:15 PM", pod: "submitted", invoice: 14500 },
  { id: "T-1021", route: "Mumbai → Pune", driver: "Rajesh Patil", status: "delayed" as const, eta: "2:45 PM", pod: "pending", invoice: null },
  { id: "T-1022", route: "Delhi → Jaipur", driver: "Amar Singh", status: "in-transit" as const, eta: "6:30 PM", pod: "pending", invoice: null },
  { id: "T-1025", route: "Jaipur → Ajmer", driver: "Mohan Lal", status: "in-transit" as const, eta: "12:30 PM", pod: "pending", invoice: null },
  { id: "T-1026", route: "Ahmedabad → Surat", driver: "Kiran Patel", status: "in-transit" as const, eta: "4:00 PM", pod: "pending", invoice: null },
  { id: "T-1029", route: "Bangalore → Mysore", driver: "Ramesh Gowda", status: "delivered" as const, eta: "2:00 PM", pod: "submitted", invoice: 18200 },
  { id: "T-1024", route: "Lucknow → Kanpur", driver: "Sunil Kumar", status: "in-transit" as const, eta: "3:00 PM", pod: "pending", invoice: null },
  { id: "T-1027", route: "Aurangabad → Nagpur", driver: "Sachin More", status: "delayed" as const, eta: "8:00 PM", pod: "pending", invoice: null },
];

export const maintenanceAlerts = [
  {
    vehicle: "MH12-AB-4421",
    risk: "high" as const,
    riskScore: 92,
    issue: "Engine coolant temp abnormal + DTC P0128",
    recommendation: "Service within 48 hrs",
  },
  {
    vehicle: "DL01-CD-9981",
    risk: "medium" as const,
    riskScore: 58,
    issue: "Brake wear pattern detected",
    recommendation: "Inspect within 2 weeks",
  },
  {
    vehicle: "UP32-GH-7723",
    risk: "low" as const,
    riskScore: 25,
    issue: "Routine service due in 800 km",
    recommendation: "Schedule at next depot stop",
  },
];

export const driverRadarData = [
  { skill: "Braking", value: 85 },
  { skill: "Acceleration", value: 78 },
  { skill: "Speeding", value: 90 },
  { skill: "Phone Use", value: 95 },
  { skill: "Night Driving", value: 72 },
];
