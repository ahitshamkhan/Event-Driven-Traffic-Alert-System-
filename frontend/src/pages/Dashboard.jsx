import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/* ── Sidebar ── */
const NAV_ITEMS = [
  { icon: "dashboard", label: "Dashboard", href: "/dashboard", active: true, filled: true },
  { icon: "radar", label: "Live Feed", href: "/livefeed" },
  { icon: "notification_important", label: "Alerts", href: "/alerts", badge: 12 },
  { icon: "videocam", label: "Camera Control", href: "/camera" },
  { icon: "tune", label: "Settings", href: "#" },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
  <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface-container-lowest border-r border-outline-muted shadow-none flex flex-col justify-between py-6 z-50">
    <div>
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-container rounded flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary-container text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>traffic</span>
        </div>
        <div>
          <h1 className="text-[20px] font-bold text-primary">TrafficFlow</h1>
          <p className="text-[10px] text-outline uppercase tracking-wider font-semibold">Central Command</p>
        </div>
      </div>
      <nav className="flex flex-col px-3 gap-1">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            className={
              item.active
                ? "flex items-center gap-3 px-3 py-3 text-primary font-bold border-r-4 border-primary bg-surface-container-low transition-colors duration-200"
                : "flex items-center gap-3 px-3 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-200"
            }
            href={item.href}
          >
            <span className="material-symbols-outlined" style={item.filled ? { fontVariationSettings: '"FILL" 1' } : undefined}>{item.icon}</span>
            <span className="text-[16px] leading-[24px]">{item.label}</span>
            {item.badge && <span className="ml-auto bg-error-container text-on-error-container text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
          </a>
        ))}
      </nav>
    </div>
    <div className="flex flex-col gap-1 px-3">
      <button className="mb-4 bg-primary-container text-on-primary-container py-3 px-4 rounded-xl text-[14px] leading-[20px] tracking-[0.05em] font-semibold flex items-center justify-center gap-2 active:opacity-80 transition-opacity">
        <span className="material-symbols-outlined">warning</span> Report Emergency
      </button>
      <a className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors rounded-lg" href="#">
        <span className="material-symbols-outlined">contact_support</span><span className="text-[16px] leading-[24px]">Support</span>
      </a>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-error-red hover:bg-surface-container transition-colors rounded-lg w-full text-left"
      >
        <span className="material-symbols-outlined">power_settings_new</span>
        <span className="text-[16px] leading-[24px]">Logout</span>
      </button>
    </div>
  </aside>
  );
};

/* ── Top Nav ── */
const TopNav = () => {
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-240px)] h-[64px] bg-surface-container-lowest border-b border-outline-muted shadow-none flex justify-between items-center px-[24px] z-40">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-[16px] leading-[24px] text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-container" placeholder="Search intersections, cameras, or events..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="hover:bg-surface-container-high rounded-full p-2 transition-transform duration-150 active:scale-95">
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
        </button>
        <button className="hover:bg-surface-container-high rounded-full p-2 transition-transform duration-150 active:scale-95">
          <span className="material-symbols-outlined text-on-surface-variant">light_mode</span>
        </button>
        <div className="h-8 w-[1px] bg-outline-muted mx-2"></div>
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-[14px] font-semibold text-on-surface">{user?.name || "Guest"}</p>
            <p className="text-[10px] text-outline uppercase font-semibold">{user?.role || "—"}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-container border-2 border-primary-container flex items-center justify-center">
            <span className="text-on-primary-container font-bold text-sm">{initials}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

/* ── Stat Cards Data ── */
const STATS = [
  { icon: "analytics", iconBg: "bg-primary-container/20", iconColor: "text-primary", label: "Total Events Today", value: "1,247", badge: "12%", badgeIcon: "trending_up", badgeColor: "text-success-green bg-success-green/10 border-success-green/20" },
  { icon: "warning", iconBg: "bg-error-container/20", iconColor: "text-error-red", label: "Active Alerts", value: "23", badge: "4%", badgeIcon: "trending_up", badgeColor: "text-error-red bg-error-container/50 border-error-red/20" },
  { icon: "videocam", iconBg: "bg-secondary-container/20", iconColor: "text-secondary", label: "Cameras Online", value: "12/12", badge: "STABLE", badgeIcon: null, badgeColor: "text-outline bg-surface-container-high" },
  { icon: "gavel", iconBg: "bg-tertiary-container/20", iconColor: "text-tertiary", label: "Violations Today", value: "89", badge: "8%", badgeIcon: "trending_down", badgeColor: "text-success-green bg-success-green/10 border-success-green/20" },
];

/* ── Feed Items ── */
const FEED_ITEMS = [
  { icon: "car_crash", iconBg: "bg-error-container/20 text-error-red", border: "border-error-red", title: "Major Accident - 5th & Main", time: "2 MIN AGO", desc: "Multi-vehicle collision reported. Emergency services dispatched. Traffic diverted to 6th Avenue.", tags: [{ text: "High Priority", cls: "bg-error-container text-on-error-container" }, { text: "Zone 4", cls: "bg-surface-container-highest text-on-surface-variant" }] },
  { icon: "traffic_cone", iconBg: "bg-primary-container/20 text-primary", border: "border-primary-container", title: "Road Maintenance Start", time: "15 MIN AGO", desc: "Scheduled maintenance begun on Broadway bridge. Right lane closed for 4 hours.", tags: [{ text: "Scheduled", cls: "bg-primary-fixed text-on-primary-fixed-variant" }, { text: "Zone 1", cls: "bg-surface-container-highest text-on-surface-variant" }] },
  { icon: "videocam", iconBg: "bg-tertiary-container/20 text-tertiary", border: "border-tertiary", title: "Violation Detected: Speeding", time: "28 MIN AGO", desc: "Automated enforcement captured speeding vehicle (84 MPH in 55 MPH zone) at Intersection 12-A.", tags: [{ text: "Violation", cls: "bg-tertiary-fixed text-on-tertiary-fixed-variant" }, { text: "Zone 2", cls: "bg-surface-container-highest text-on-surface-variant" }] },
];

/* ── System Status ── */
const SYSTEMS = [
  { icon: "storage", name: "Database Clusters" },
  { icon: "videocam", name: "CCTV Streaming Engine" },
  { icon: "satellite_alt", name: "IoT Telemetry Uplink" },
  { icon: "map", name: "GIS Geofencing API" },
];

/* ── Chart Data ── */
const CHART_DAYS = [
  { day: "Mon", events: "65%", critical: "12%" },
  { day: "Tue", events: "78%", critical: "22%" },
  { day: "Wed", events: "92%", critical: "35%" },
  { day: "Thu", events: "68%", critical: "28%" },
  { day: "Fri", events: "85%", critical: "18%" },
  { day: "Sat", events: "42%", critical: "8%" },
  { day: "Sun", events: "38%", critical: "5%" },
];

/* ══════════════════════════════════════════
   Main Dashboard Page
   ══════════════════════════════════════════ */
const Dashboard = () => (
  <div className="bg-background text-on-background min-h-screen">
    <Sidebar />
    <TopNav />

    <main className="ml-[240px] mt-[64px] p-[24px] min-h-[calc(100vh-64px)] flex flex-col bg-background">
      <div className="flex-grow">
        {/* Header */}
        <div className="mb-[24px]">
          <h2 className="text-[32px] leading-[40px] font-bold text-on-surface">Traffic Dashboard</h2>
          <p className="text-on-surface-variant text-[16px] leading-[24px]">Real-time monitoring across all city intersections</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-[24px]">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface-container p-5 rounded-xl border border-outline-muted shadow-sm flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div className={`p-2 ${s.iconBg} rounded-lg`}>
                  <span className={`material-symbols-outlined ${s.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                </div>
                <span className={`${s.badgeColor} flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border`}>
                  {s.badgeIcon && <span className="material-symbols-outlined text-[14px]">{s.badgeIcon}</span>} {s.badge}
                </span>
              </div>
              <div>
                <p className="text-outline uppercase text-[11px] tracking-wider font-semibold">{s.label}</p>
                <h3 className="text-[32px] text-on-surface font-bold">{s.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Middle Content */}
        <div className="grid grid-cols-12 gap-[24px] mb-[24px]">
          {/* Live Event Feed */}
          <div className="col-span-12 lg:col-span-7 bg-surface-container rounded-xl border border-outline-muted shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-outline-muted flex justify-between items-center bg-surface-container-high/30">
              <div className="flex items-center gap-3">
                <h3 className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface">Live Event Feed</h3>
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-success-green/10 text-success-green rounded-full text-[10px] font-bold uppercase tracking-widest border border-success-green/20">
                  <span className="w-1.5 h-1.5 bg-success-green rounded-full pulse-live"></span> Live
                </div>
              </div>
              <button className="text-primary text-[14px] leading-[20px] tracking-[0.05em] font-semibold hover:underline">View All</button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto max-h-[440px]">
              {FEED_ITEMS.map((f) => (
                <div key={f.title} className={`flex items-start gap-4 p-4 bg-surface-container-high/40 rounded-xl border-l-4 ${f.border} hover:bg-surface-container-high transition-colors`}>
                  <div className={`${f.iconBg} p-2 rounded-lg`}>
                    <span className="material-symbols-outlined">{f.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface">{f.title}</h4>
                      <span className="text-[10px] text-outline font-semibold">{f.time}</span>
                    </div>
                    <p className="text-[16px] leading-[24px] text-sm text-on-surface-variant mb-2">{f.desc}</p>
                    <div className="flex gap-2">
                      {f.tags.map((t) => (
                        <span key={t.text} className={`px-2 py-0.5 ${t.cls} text-[10px] font-bold rounded uppercase`}>{t.text}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Cards */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-[24px]">
            {/* Active Alerts */}
            <div className="bg-surface-container rounded-xl border border-outline-muted shadow-sm overflow-hidden">
              <h3 className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface px-6 py-4 border-b border-outline-muted bg-surface-container-high/30">Active Critical Alerts</h3>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-error-container/10 border border-error-red/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-error-red">gpp_maybe</span>
                    <span className="text-sm font-semibold text-on-error-container">Intersection Offline: 12th St</span>
                  </div>
                  <button className="bg-error-red text-on-error text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg">Action</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary-container/10 border border-secondary/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">signal_cellular_alt</span>
                    <span className="text-sm font-semibold text-on-secondary-container">Congestion Threshold: South Pkwy</span>
                  </div>
                  <button className="bg-secondary text-on-secondary text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg">View</button>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-surface-container rounded-xl border border-outline-muted shadow-sm flex-1 overflow-hidden">
              <h3 className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface px-6 py-4 border-b border-outline-muted bg-surface-container-high/30">System Status</h3>
              <div className="p-6 space-y-5">
                {SYSTEMS.map((sys) => (
                  <div key={sys.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-outline">{sys.icon}</span>
                      <span className="text-[16px] leading-[24px] text-sm">{sys.name}</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-success-green font-bold text-[11px] uppercase tracking-tighter">
                      <span className="w-2 h-2 bg-success-green rounded-full"></span> Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-surface-container rounded-xl border border-outline-muted shadow-sm mb-[24px]">
          <div className="p-6 border-b border-outline-muted flex flex-wrap justify-between items-center bg-surface-container-high/30">
            <div>
              <h3 className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface">Event Statistics — Weekly Overview</h3>
              <p className="text-xs text-outline">Monitoring total incident volume vs critical alerts</p>
            </div>
            <div className="flex items-center gap-6 mt-2 sm:mt-0">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-on-surface-variant"><span className="w-2.5 h-2.5 bg-primary-container rounded-sm"></span> Total Events</span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-on-surface-variant"><span className="w-2.5 h-2.5 bg-error-red rounded-sm"></span> Critical Alerts</span>
              </div>
              <select className="bg-surface-container-high border-outline-muted text-on-surface text-sm font-semibold rounded-lg focus:ring-1 focus:ring-primary-container py-1 px-3">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
          </div>
          <div className="p-6 h-[340px] relative">
            <div className="w-full h-full flex items-end justify-between relative chart-grid pt-10">
              {/* Y-Axis */}
              <div className="absolute -left-2 top-0 h-[280px] flex flex-col justify-between text-[10px] text-outline pointer-events-none pr-4">
                {["1500", "1200", "900", "600", "300", "0"].map((v) => (<span key={v}>{v}</span>))}
              </div>
              {/* Bars */}
              {CHART_DAYS.map((d) => (
                <div key={d.day} className="flex-1 flex flex-col items-center group relative h-full">
                  <div className="w-full max-w-[48px] flex items-end justify-center gap-1 h-[280px] relative">
                    <div className="w-full bg-primary-container rounded-t hover:brightness-110 transition-all cursor-pointer" style={{ height: d.events }}></div>
                    <div className="w-full bg-error-red rounded-t hover:brightness-110 transition-all cursor-pointer" style={{ height: d.critical }}></div>
                  </div>
                  <span className="mt-4 text-[11px] font-bold text-outline uppercase">{d.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto pt-8 pb-10 border-t border-outline-muted">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-outline text-sm text-center md:text-left">© 2024 TrafficFlow Central Command. All rights reserved.</div>
          <div className="flex items-center gap-6 text-on-surface-variant font-semibold text-sm">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">System Documentation</a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="text-outline text-[11px] font-semibold">System Status:</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-success-green/10 text-success-green rounded-full text-[10px] font-bold uppercase tracking-wider border border-success-green/20">
                <span className="w-1.5 h-1.5 bg-success-green rounded-full"></span> Operational
              </div>
            </div>
            <span className="text-outline text-[10px] font-medium">v2.4.1-stable</span>
          </div>
        </div>
      </footer>
    </main>

    {/* Floating Map Button */}
    <div className="fixed bottom-6 right-6 z-50">
      <div className="group relative">
        <button className="w-14 h-14 bg-primary-container text-on-primary-container rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-[32px]">map</span>
        </button>
        <div className="absolute bottom-full right-0 mb-4 w-[280px] bg-surface-container border border-outline-muted rounded-xl shadow-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
          <div className="h-32 bg-surface-container-highest">
            <img alt="City grid satellite view" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3mU_VrnrtAulfbeAGlfnR8jLbgGUXYwOHbGOjTUkyaoNSAlcQYrG_uTdaQ7FppedifEHiRvDBSeU9coW4Oo85m20XVOLW6vlpIQ2tln69UpP6UgZr_f7WTM-HlEhtMWi7s9HBPYP3W5aHaidyhNH2ZQTw-DwOUrR1VIMMyXi2Hx4smwOUimrii6lqvC2XwifdAO0BAHtLx4Zaix-UK5mGmXEmNVzmsV5YyxBgLo8ciV2OReMvpemuZ7EqnfqFc3e0Kc6ZWOfxFfU" />
          </div>
          <div className="p-4">
            <h4 className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-sm text-on-surface">City-wide Map View</h4>
            <p className="text-[11px] text-on-surface-variant">Click to expand intersection heatmap and live camera overlays.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
