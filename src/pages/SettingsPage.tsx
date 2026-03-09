import { Settings as SettingsIcon, Bell, Shield, Globe } from "lucide-react";

const SettingsPage = () => (
  <div className="space-y-6 max-w-2xl">
    <h1 className="text-xl font-bold text-foreground">Settings</h1>

    <div className="bg-card rounded-xl border border-border shadow-sm divide-y divide-border">
      {[
        { icon: SettingsIcon, label: "General", desc: "Company name, timezone, language preferences" },
        { icon: Bell, label: "Notifications", desc: "Alert thresholds, email notifications, SMS alerts" },
        { icon: Shield, label: "Security", desc: "API keys, user access, role management" },
        { icon: Globe, label: "Integrations", desc: "GPS providers, ERP connectors, fuel card APIs" },
      ].map((item) => (
        <div key={item.label} className="flex items-center gap-4 p-5 hover:bg-secondary/30 transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <item.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <p className="text-xs text-muted-foreground text-center">
      This is a demo environment. Settings changes are not persisted.
    </p>
  </div>
);

export default SettingsPage;
