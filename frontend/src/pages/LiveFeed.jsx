import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import API from "../services/api";
import EmergencyModal from "../components/EmergencyModal";
import SettingsModal from "../components/SettingsModal";

/* ── Sidebar Navigation ── */
const NAV_ITEMS = [
  { icon: "grid_view",             label: "Dashboard",     href: "/dashboard" },
  { icon: "radar",                 label: "Live Feed",     href: "/livefeed", active: true },
  { icon: "notification_important",label: "Alerts",        href: "/alerts" },
  { icon: "videocam",              label: "Camera Control",href: "/camera" },
  { icon: "tune",                  label: "Settings",      href: "#" },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const [showEmergency, setShowEmergency] = useState(false);
  const [showSettings,  setShowSettings]  = useState(false);
  const handleLogout = () => { logout(); navigate("/login"); };

  return (
  <>
  <aside className="fixed left-0 top-0 h-screen w-[240px] border-r border-outline-variant bg-surface-container-lowest shadow-sm flex flex-col justify-between py-6 z-50">
    <div className="flex flex-col gap-8">
      <div className="px-6 flex flex-col gap-1">
        <h1 className="text-[32px] leading-[40px] font-extrabold text-primary">TrafficFlow</h1>
        <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-semibold">Central Command</p>
      </div>
      <nav className="flex flex-col">
        {NAV_ITEMS.map((item) => (
          item.label === "Settings"
            ? <button key={item.label} onClick={() => setShowSettings(true)} className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors duration-200 w-full text-left">
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold">{item.label}</span>
              </button>
            : <a key={item.label} className={item.active ? "flex items-center gap-4 px-6 py-3 text-primary font-bold border-r-4 border-primary bg-primary/10" : "flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors duration-200"} href={item.href}>
                <span className="material-symbols-outlined" style={item.active ? { fontVariationSettings: "'FILL' 1" } : undefined}>{item.icon}</span>
                <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold">{item.label}</span>
              </a>
        ))}
      </nav>
    </div>
    <div className="flex flex-col gap-4">
      <div className="px-6 mb-4">
        <button onClick={() => setShowEmergency(true)} className="w-full py-3 bg-primary text-on-primary rounded-xl text-[14px] leading-[20px] tracking-[0.05em] font-semibold flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all">
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
  <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />
  <SettingsModal  isOpen={showSettings}  onClose={() => setShowSettings(false)}  />
  </>
  );
};

/* ── Top Navbar ── */
const TopNav = () => {
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";
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
        <button onClick={toggleTheme} title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"} className="hover:bg-surface-container-low rounded-full p-2 text-on-surface-variant transition-transform active:scale-95 duration-150">
          <span className="material-symbols-outlined">{isDark ? "light_mode" : "dark_mode"}</span>
        </button>
        <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right">
            <p className="text-[14px] font-semibold text-on-surface leading-tight">{user?.name || "Guest"}</p>
            <p className="text-[10px] text-on-surface-variant uppercase font-semibold">{user?.role || "—"}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-primary/20">
            <span className="text-on-primary-container font-bold text-sm">{initials}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

/* ── Filter Buttons ── */
const FILTERS = ["All", "VEHICLE_DETECTED", "SPEED_VIOLATION", "CONGESTION_ALERT", "TRAFFIC_CLEARED"];
const FILTER_LABELS = {
  All: "All",
  VEHICLE_DETECTED: "Vehicle Detected",
  SPEED_VIOLATION: "Speed Violation",
  CONGESTION_ALERT: "Congestion Alert",
  TRAFFIC_CLEARED: "Traffic Cleared",
};

/* ── Map event type to icon + colors ── */
const TYPE_STYLE = {
  SPEED_VIOLATION:   { icon: "speed",         iconBg: "bg-error-container text-error-red",         severityColor: "bg-error/10 text-error-red border-error/30",       hoverBorder: "hover:border-error",         severity: "High Severity" },
  VEHICLE_DETECTED:  { icon: "directions_car", iconBg: "bg-primary/10 text-primary",               severityColor: "bg-primary/10 text-primary border-primary/30",     hoverBorder: "hover:border-primary",       severity: "Low Severity" },
  CONGESTION_ALERT:  { icon: "warning",        iconBg: "bg-tertiary-container/20 text-tertiary",   severityColor: "bg-tertiary/10 text-tertiary border-tertiary/30",  hoverBorder: "hover:border-tertiary",      severity: "Medium Severity" },
  TRAFFIC_CLEARED:   { icon: "check_circle",   iconBg: "bg-success-green/10 text-success-green",   severityColor: "bg-success-green/10 text-success-green border-success-green/30", hoverBorder: "hover:border-success-green", severity: "Info" },
};

/* ── Single Event Card ── */
const EventCard = ({ event }) => {
  const style = TYPE_STYLE[event.eventType] || TYPE_STYLE.VEHICLE_DETECTED;
  const payload = event.payload || {};
  const details = Object.entries(payload).map(([k, v]) => ({
    label: k.replace(/_/g, " ").toUpperCase(),
    value: String(v),
    color: k.toLowerCase().includes("speed") ? "text-error-red" : undefined,
    mono: k.toLowerCase().includes("plate") || k.toLowerCase().includes("number"),
  }));
  const envelopeStr = JSON.stringify({ eventId: event.eventId, eventType: event.eventType, source: event.source, version: event.version, timestamp: event.timestamp }, null, 2);
  return (
    <div className={`bg-surface-container border border-outline-variant rounded-xl p-5 shadow-sm ${style.hoverBorder} transition-all group`}>
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className={`w-12 h-12 rounded-xl ${style.iconBg} flex items-center justify-center`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{style.icon}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface text-lg">{event.eventType?.replace(/_/g, " ")}</span>
              <span className={`px-3 py-0.5 rounded-full ${style.severityColor} text-[10px] uppercase font-semibold border`}>{style.severity}</span>
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant text-[14px]">
              <span className="flex items-center gap-1 font-semibold"><span className="material-symbols-outlined text-[18px]">videocam</span>{event.source}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">schedule</span>{new Date(event.timestamp).toLocaleTimeString()}</span>
            </div>
            {details.length > 0 && (
              <div className="mt-3 p-3 bg-surface-container-low rounded-lg flex flex-wrap gap-6 text-[14px]">
                {details.map((d) => (
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
      <div className="mt-4 pt-4 border-t border-outline-variant/30">
        <details className="group/envelope cursor-pointer">
          <summary className="list-none flex items-center gap-2 text-on-surface-variant text-xs font-semibold hover:text-primary select-none">
            <span className="material-symbols-outlined text-[14px]">terminal</span>
            EVENT_ENVELOPE.JSON
            <span className="material-symbols-outlined text-[16px] transition-transform group-open/envelope:rotate-180">expand_more</span>
          </summary>
          <div className="mt-2 p-3 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
            <code className="text-primary text-[11px] font-mono block leading-relaxed whitespace-pre">{envelopeStr}</code>
          </div>
        </details>
      </div>
    </div>
  );
};

/* ── Empty State ── */
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant gap-4">
    <span className="material-symbols-outlined text-6xl text-outline">radar</span>
    <p className="text-[18px] font-semibold">No events yet</p>
    <p className="text-[14px]">Publish a camera event from Camera Control to see it here.</p>
  </div>
);

/* ══════════════════════════════════════════
   Main LiveFeed Page
   ══════════════════════════════════════════ */
const LiveFeed = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [events, setEvents]             = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const params = activeFilter !== "All" ? { type: activeFilter } : {};
        const res = await API.get("/events", { params });
        // Backend returns { success, data: [...] } or { success, data: { data: [...] } }
        const raw = res.data?.data;
        setEvents(Array.isArray(raw) ? raw : raw?.data || []);
      } catch (err) {
        setError("Failed to load events. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [activeFilter]);

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Sidebar />
      <TopNav />

      <main className="ml-[240px] mt-[64px] min-h-[calc(100vh-64px)] bg-background flex flex-col">
        <div className="p-8 max-w-6xl mx-auto flex flex-col gap-6 flex-grow w-full">
          {/* Page Header */}
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
                  {FILTER_LABELS[f]}
                </button>
              ))}
            </div>
          </div>

          {/* Feed Content */}
          <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-6">
            {loading && (
              <div className="flex items-center justify-center py-24 text-on-surface-variant gap-3">
                <span className="material-symbols-outlined animate-spin">sync</span>
                <span className="text-[16px]">Loading events...</span>
              </div>
            )}
            {!loading && error && (
              <div className="bg-error/10 border border-error/30 rounded-xl p-6 text-error-red flex items-center gap-3">
                <span className="material-symbols-outlined">error</span>
                <p>{error}</p>
              </div>
            )}
            {!loading && !error && events.length === 0 && <EmptyState />}
            {!loading && !error && events.map((evt) => (
              <EventCard key={evt._id || evt.eventId} event={evt} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-surface-container-lowest border-t border-outline-variant px-[64px] py-6 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[16px] leading-[24px] text-on-surface-variant text-sm">© 2024 TrafficFlow Central Command. All rights reserved.</div>
            <div className="flex items-center gap-6 text-[16px] leading-[24px] font-semibold text-primary text-sm">
              <a className="hover:underline" href="#">Privacy Policy</a>
              <a className="hover:underline" href="#">Terms</a>
              <a className="hover:underline" href="#">System Docs</a>
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant text-sm">
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
