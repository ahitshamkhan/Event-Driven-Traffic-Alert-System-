import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/* ── Sidebar Navigation ── */
const NAV_ITEMS = [
  { icon: "grid_view", label: "Dashboard", href: "/dashboard" },
  { icon: "radar", label: "Live Feed", href: "/livefeed", active: true },
  { icon: "notification_important", label: "Alerts", href: "/alerts", badge: 12 },
  { icon: "videocam", label: "Camera Control", href: "/camera" },
  { icon: "tune", label: "Settings", href: "#" },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate("/login"); };

  return (
  <aside className="fixed left-0 top-0 h-screen w-[240px] border-r border-outline-variant bg-surface-container-lowest shadow-sm flex flex-col justify-between py-6 z-50">
    <div className="flex flex-col gap-8">
      <div className="px-6 flex flex-col gap-1">
        <h1 className="text-[32px] leading-[40px] font-extrabold text-primary">TrafficFlow</h1>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">Central Command</p>
      </div>
      <nav className="flex flex-col">
        {NAV_ITEMS.map((item) => (
          <a key={item.label} className={item.active ? "flex items-center gap-4 px-6 py-3 text-primary font-bold border-r-4 border-primary bg-primary/10" : "flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors duration-200"} href={item.href}>
            <span className="material-symbols-outlined" style={item.active ? { fontVariationSettings: "'FILL' 1" } : undefined}>{item.icon}</span>
            <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold">{item.label}</span>
            {item.badge && (<span className="ml-auto bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>)}
          </a>
        ))}
      </nav>
    </div>
    <div className="flex flex-col gap-4">
      <div className="px-6 mb-4">
        <button className="w-full py-3 bg-primary text-on-primary rounded-xl text-[14px] leading-[20px] tracking-[0.05em] font-semibold flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all">
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>emergency</span>
          Report Emergency
        </button>
      </div>
      <nav className="flex flex-col">
        <a className="flex items-center gap-4 px-6 py-2 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors duration-200" href="#">
          <span className="material-symbols-outlined">contact_support</span>
          <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Support</span>
        </a>
        <button onClick={handleLogout} className="flex items-center gap-4 px-6 py-2 text-on-surface-variant hover:text-error-red hover:bg-surface-container-low transition-colors duration-200 w-full text-left">
          <span className="material-symbols-outlined">power_settings_new</span>
          <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Logout</span>
        </button>
      </nav>
    </div>
  </aside>
  );
};

/* ── Top Navbar ── */
const TopNav = () => {
  const [search, setSearch] = useState("");
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-240px)] h-[64px] bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-[24px] z-40">
      <div className="flex items-center gap-[24px] w-1/2">
        <div className="relative w-full max-w-md group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full bg-surface-container-low border-none rounded-full pl-12 pr-4 py-2 text-[16px] leading-[24px] focus:ring-2 focus:ring-primary/20 placeholder:text-outline transition-all text-on-surface" placeholder="Search event ID, license plate, or camera..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="hover:bg-surface-container-low rounded-full p-2 text-on-surface-variant transition-transform active:scale-95 duration-150">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="hover:bg-surface-container-low rounded-full p-2 text-on-surface-variant transition-transform active:scale-95 duration-150">
          <span className="material-symbols-outlined">light_mode</span>
        </button>
        <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right">
            <p className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface leading-tight">Commander Smith</p>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">Duty Officer</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-primary/20">
            <img alt="User profile avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsN1tr4CHHIBnJ9aOOP7K8K6NQ7BVDrwZAOc9m6jq-6fCzRzslsyEJT6FCiioj9_TucszuQyn24oViysofqjWD_5AMgOfm327N5j5HZIG77bV8P4QfBof7xl4CB3erUkBtWG-CHmce8Qwk-TxQX9W8NjjYxgKFf7GcfCd2vojSdOxJi_sqy8OYHeb7obwsW3uzPCcFiEeyqgBomfr0ghC7-R_ju5IIJDzxt89TfY5QFuSO_5NpJuCPfm1stOnl_3-Hw-WLGCfSBXU" />
          </div>
        </div>
      </div>
    </header>
  );
};

/* ── Filter buttons ── */
const FILTERS = ["All", "Vehicle Detected", "Speed Violation", "Congestion Alert", "Traffic Cleared"];

/* ── Event Feed Data ── */
const EVENTS = [
  {
    type: "Speed Violation",
    severity: "High Severity",
    severityColor: "bg-error/10 text-error-red border-error/30",
    iconBg: "bg-error-container text-error-red",
    icon: "speed",
    hoverBorder: "hover:border-error",
    camera: "CAM-001",
    location: "Intersection 1",
    time: "14:05:22",
    details: [
      { label: "Plate", value: "ABC-1234", mono: true },
      { label: "Speed", value: "84 MPH", color: "text-error-red" },
      { label: "Lane", value: "Fast Track 2" },
    ],
    envelope: '{ "event_id": "evt_982k_110a", "schema_v": "1.0.4", "source_id": "node_nyc_cam_001", "precision": 0.992, "processing_ms": 42 }',
  },
  {
    type: "Vehicle Detected",
    severity: "Low Severity",
    severityColor: "bg-primary/10 text-primary border-primary/30",
    iconBg: "bg-primary/10 text-primary",
    icon: "directions_car",
    hoverBorder: "hover:border-primary",
    camera: "CAM-005",
    location: "Intersection 5",
    time: "14:04:58",
    details: [
      { label: "Type", value: "Heavy Truck" },
      { label: "Class", value: "Commercial" },
    ],
    envelope: '{ "event_id": "evt_331p_88bb", "schema_v": "1.0.4", "source_id": "node_nyc_cam_005", "precision": 0.94 }',
  },
  {
    type: "Congestion Alert",
    severity: "Medium Severity",
    severityColor: "bg-tertiary/10 text-tertiary-fixed-dim border-tertiary/30",
    iconBg: "bg-tertiary-container/20 text-tertiary",
    icon: "warning",
    hoverBorder: "hover:border-tertiary",
    camera: "CAM-012",
    location: "River Pass",
    time: "14:04:15",
    details: [
      { label: "Density", value: "88% Capacity" },
      { label: "Delay", value: "+12 Minutes", color: "text-tertiary-fixed-dim" },
    ],
    envelope: '{ "event_id": "evt_999z_554c", "schema_v": "1.0.4", "source_id": "node_nyc_cam_012" }',
  },
  {
    type: "Traffic Cleared",
    severity: "Info",
    severityColor: "bg-success-green/10 text-success-green border-success-green/30",
    iconBg: "bg-success-green/10 text-success-green",
    icon: "check_circle",
    hoverBorder: "hover:border-success-green",
    camera: "CAM-003",
    location: "West Gate",
    time: "14:03:45",
    details: [],
    envelope: null,
  },
];

/* ── Single Event Card ── */
const EventCard = ({ event }) => (
  <div className={`bg-surface-container border border-outline-variant rounded-xl p-5 shadow-sm ${event.hoverBorder} transition-all group`}>
    <div className="flex items-start justify-between">
      <div className="flex gap-4">
        <div className={`w-12 h-12 rounded-xl ${event.iconBg} flex items-center justify-center`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{event.icon}</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface text-lg">{event.type}</span>
            <span className={`px-3 py-0.5 rounded-full ${event.severityColor} text-[10px] uppercase font-semibold border`}>{event.severity}</span>
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant text-[16px] leading-[24px]">
            <span className="flex items-center gap-1 font-semibold"><span className="material-symbols-outlined text-[18px]">videocam</span> {event.camera}</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">location_on</span> {event.location}</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">schedule</span> {event.time}</span>
          </div>
          {event.details.length > 0 && (
            <div className="mt-3 p-3 bg-surface-container-low rounded-lg flex gap-8 text-[16px] leading-[24px]">
              {event.details.map((d) => (
                <div key={d.label}>
                  <span className="text-on-surface-variant text-xs uppercase tracking-wider block mb-1 font-semibold">{d.label}</span>
                  <span className={`font-bold ${d.mono ? "font-mono" : ""} ${d.color || "text-on-surface"}`}>{d.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <button className="text-outline hover:text-on-surface transition-colors">
        <span className="material-symbols-outlined">more_vert</span>
      </button>
    </div>
    {event.envelope && (
      <div className="mt-4 pt-4 border-t border-outline-variant/30">
        <details className="group/envelope cursor-pointer">
          <summary className="list-none flex items-center gap-2 text-on-surface-variant text-xs font-semibold hover:text-primary select-none">
            <span className="material-symbols-outlined text-[14px]">terminal</span>
            EVENT_ENVELOPE.JSON
            <span className="material-symbols-outlined text-[16px] transition-transform group-open/envelope:rotate-180">expand_more</span>
          </summary>
          <div className="mt-2 p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
            <code className="text-primary text-[11px] font-mono block leading-relaxed">{event.envelope}</code>
          </div>
        </details>
      </div>
    )}
  </div>
);

/* ══════════════════════════════════════════
   Main LiveFeed Page
   ══════════════════════════════════════════ */
const LiveFeed = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Sidebar />
      <TopNav />

      <main className="ml-[240px] mt-[64px] min-h-[calc(100vh-64px)] bg-background flex flex-col">
        <div className="p-8 max-w-6xl mx-auto flex flex-col gap-6 flex-grow w-full">
          {/* Page Header & Status */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[32px] leading-[40px] font-bold text-on-surface">Live Event Feed</h2>
              <div className="flex items-center gap-2 text-on-surface-variant text-[16px] leading-[24px] bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant">
                <span className="w-2 h-2 rounded-full bg-success-green animate-pulse"></span>
                Real-time Monitoring Active
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={
                    activeFilter === f
                      ? "px-6 py-2 rounded-full bg-primary text-on-primary text-[14px] leading-[20px] tracking-[0.05em] font-semibold shadow-sm"
                      : "px-6 py-2 rounded-full bg-surface-container border border-outline-variant text-on-surface-variant text-[14px] leading-[20px] tracking-[0.05em] font-semibold hover:bg-surface-container-high transition-colors"
                  }
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Feed List */}
          <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-6">
            {EVENTS.map((evt) => (
              <EventCard key={evt.type} event={evt} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-surface-container-lowest border-t border-outline-variant px-[64px] py-6 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[16px] leading-[24px] text-on-surface-variant text-center md:text-left text-sm">
              © 2024 TrafficFlow Central Command. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-[16px] leading-[24px] font-semibold text-primary text-sm">
              <a className="hover:underline" href="#">Privacy Policy</a>
              <a className="hover:underline" href="#">Terms</a>
              <a className="hover:underline" href="#">System Docs</a>
            </div>
            <div className="flex items-center gap-4 text-[16px] leading-[24px] text-on-surface-variant text-sm">
              <span className="bg-surface-container px-2 py-0.5 rounded font-mono text-[10px]">v2.4.1-stable</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-success-green"></span>
                <span>Operational</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LiveFeed;
