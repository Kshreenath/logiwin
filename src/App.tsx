import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import DemoLayout from "./components/DemoLayout";
import Dashboard from "./pages/Dashboard";
import FleetMap from "./pages/FleetMap";
import FuelIntelligence from "./pages/FuelIntelligence";
import DriverScores from "./pages/DriverScores";
import MaintenanceAlerts from "./pages/MaintenanceAlerts";
import TripPOD from "./pages/TripPOD";
import SimulateRoute from "./pages/SimulateRoute";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DemoLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="fleet-map" element={<FleetMap />} />
            <Route path="fuel" element={<FuelIntelligence />} />
            <Route path="drivers" element={<DriverScores />} />
            <Route path="maintenance" element={<MaintenanceAlerts />} />
            <Route path="trips" element={<TripPOD />} />
            <Route path="simulate" element={<SimulateRoute />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
