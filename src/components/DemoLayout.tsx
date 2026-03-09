import { NavLink, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard, Map, Fuel, Users, Wrench, FileText, Route, Settings, ChevronLeft, ChevronRight, Menu,
} from "lucide-react";
import { useState } from "react";
import logiwinLogo from "@/assets/logiwin-logo.png";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Live Fleet Map", icon: Map, path: "/dashboard/fleet-map" },
  { label: "Fuel Intelligence", icon: Fuel, path: "/dashboard/fuel" },
  { label: "Driver Scores", icon: Users, path: "/dashboard/drivers" },
  { label: "Maintenance Alerts", icon: Wrench, path: "/dashboard/maintenance" },
  { label: "Trip & POD", icon: FileText, path: "/dashboard/trips" },
  { label: "Simulate Route", icon: Route, path: "/dashboard/simulate" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const DemoLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top demo banner */}
      <div className="bg-primary text-primary-foreground text-center text-xs py-1.5 px-4 font-medium shrink-0 z-50">
        📍 Live Demo — Shivani Logistics Pvt. Ltd. | Logiwin Fleet Intelligence Platform
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 bg-foreground/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={`
            ${collapsed ? "w-16" : "w-60"} 
            bg-navy text-sidebar-foreground flex flex-col shrink-0 transition-all duration-300 z-50
            fixed lg:relative inset-y-0 left-0 lg:translate-x-0
            ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            pt-[30px] lg:pt-0
          `}
        >
          {/* Logo */}
          <div className={`flex items-center gap-3 px-4 py-5 border-b border-navy-lighter ${collapsed ? "justify-center" : ""}`}>
            <img src={logiwinLogo} alt="Logiwin" className="w-8 h-8" />
            {!collapsed && <span className="font-bold text-primary-foreground text-lg tracking-tight">Logiwin</span>}
          </div>

          {/* Nav */}
          <nav className="flex-1 py-3 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === "/dashboard" && location.pathname === "/dashboard");
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-all
                    ${isActive
                      ? "bg-sidebar-active text-primary-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-primary-foreground"
                    }
                    ${collapsed ? "justify-center px-2" : ""}
                  `}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>

          {/* Collapse toggle (desktop) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center justify-center py-3 border-t border-navy-lighter text-sidebar-foreground hover:text-primary-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-14 bg-card border-b border-border flex items-center px-4 gap-4 shrink-0">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex items-center gap-3 flex-1">
              <span className="font-semibold text-foreground text-sm">Shivani Logistics Pvt. Ltd.</span>
              <span className="text-muted-foreground text-xs">|</span>
              <span className="text-muted-foreground text-xs">47 Active Vehicles</span>
              <span className="text-muted-foreground text-xs">|</span>
              <span className="flex items-center gap-1.5 text-xs text-success">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" />
                Live
              </span>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DemoLayout;
