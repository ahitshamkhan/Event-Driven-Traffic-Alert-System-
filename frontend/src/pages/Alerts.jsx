import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import API from "../services/api";
import EmergencyModal from "../components/EmergencyModal";
import SettingsModal from "../components/SettingsModal";
import UserProfileDropdown from "../components/UserProfileDropdown";

/* ── Sidebar Navigation ── */
const NAV_ITEMS = [
  { icon: "grid_view",              label: "Dashboard",     href: "/dashboard" },
  { icon: "radar",                  label: "Live Feed",     href: "/livefeed" },
  { icon: "notification_important", label: "Alerts",        href: "/alerts", active: true },
  { icon: "videocam",               label: "Camera Control",href: "/camera" },
  { icon: "tune",                   label: "Settings",      href: "#" },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate   = useNavigate();
  const [showEmergency, setShowEmergency] = useState(false);
  const [showSettings,  setShowSettings]  = useState(false);
  const handleLogout = () => { logout(); navigate("/login"); };

  return (
  <>
  <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface-container-lowest border-r border-outline-variant flex flex-col justify-between py-6 z-50">
    <div>
      <div className="px-6 mb-8">
        <h1 className="text-[24px] leading-[32px] font-bold text-primary">TrafficFlow</h1>
        <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">Central Command</p>
      </div>
      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => (
          item.label === "Settings"
            ? <button key={item.label} onClick={() => setShowSettings(true)} className="flex items-center px-6 py-3 text-on-surface-variant hover:text-surface-bright hover:bg-surface-container-highest transition-colors duration-200 w-full text-left">
                <span className="material-symbols-outlined mr-3">{item.icon}</span>
                <span className="text-[16px] leading-[24px]">{item.label}</span>
              </button>
            : <a key={item.label} className={item.active ? "flex items-center px-6 py-3 text-primary font-bold border-r-4 border-primary bg-surface-container-high transition-colors duration-200" : "flex items-center px-6 py-3 text-on-surface-variant hover:text-surface-bright hover:bg-surface-container-highest transition-colors duration-200"} href={item.href}>
                <span className="material-symbols-outlined mr-3">{item.icon}</span>
                <span className="text-[16px] leading-[24px]">{item.label}</span>
              </a>
        ))}
      </nav>
    </div>
    <div className="px-6 space-y-4">
      <button onClick={() => setShowEmergency(true)} className="w-full bg-primary text-on-primary-fixed py-3 rounded-lg text-[12px] leading-[16px] font-semibold uppercase tracking-wider shadow-sm hover:opacity-90 transition-opacity">
        <span className="material-symbols-outlined mr-2 align-middle">emergency</span>
        Report Emergency
      </button>
      <div className="pt-6 border-t border-outline-variant">
        <a className="flex items-center py-2 text-on-surface-variant hover:text-primary transition-colors" href="#">
          <span className="material-symbols-outlined mr-3">contact_support</span>
          <span className="text-[14px] leading-[20px]">Support</span>
        </a>
        <button onClick={handleLogout} className="flex items-center py-2 text-on-surface-variant hover:text-error-red transition-colors w-full text-left">
          <span className="material-symbols-outlined mr-3">power_settings_new</span>
          <span className="text-[14px] leading-[20px]">Logout</span>
        </button>
      </div>
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
  const { isDark, toggleTheme } = useTheme();
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-240px)] h-[64px] bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-[24px] z-40">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary text-[14px] leading-[20px] text-on-surface" placeholder="Search violation records..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="hover:bg-surface-container-high rounded-full p-2 transition-transform duration-150 active:scale-95">
          <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
        </button>
        <button onClick={toggleTheme} title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"} className="hover:bg-surface-container-high rounded-full p-2 transition-transform duration-150 active:scale-95">
          <span className="material-symbols-outlined text-on-surface-variant">{isDark ? "light_mode" : "dark_mode"}</span>
        </button>
        <div className="h-8 w-px bg-outline-variant mx-2"></div>
        <UserProfileDropdown />
      </div>
    </header>
  );
};

/* ── Status style map ── */
const STATUS_STYLE = {
  PENDING:   "bg-secondary/20 text-secondary",
  VERIFIED:  "bg-primary/20 text-primary",
  DISMISSED: "bg-surface-container-highest text-outline",
};

const TH = "px-6 py-4 text-left text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-outline";
const TD = "px-6 py-4 text-[14px] leading-[20px]";

/* ══════════════════════════════════════════
   Main Alerts Page
   ══════════════════════════════════════════ */
const Alerts = () => {
  const [alerts, setAlerts]       = useState([]);
  const [stats, setStats]         = useState({ total: 0, pending: 0, duplicates: 0 });
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/alerts");
      const raw = res.data?.data;
      const list = Array.isArray(raw) ? raw : raw?.data || [];
      setAlerts(list);

      // Compute stats from real data
      const pending    = list.filter((a) => a.status === "PENDING").length;
      const total      = list.length;
      setStats({ total, pending, duplicates: 0 });
    } catch (err) {
      setError("Failed to load alerts. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAlerts(); }, [fetchAlerts]);

  const handleStatusChange = async (id, status) => {
    try {
      await API.patch(`/alerts/${id}/status`, { status });
      fetchAlerts(); // refresh after update
    } catch {}
  };

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Sidebar />
      <TopNav />

      <main className="ml-[240px] pt-[64px] min-h-screen flex flex-col bg-background">
        <div className="flex-grow p-8">

          {/* Idempotent Receiver Banner */}
          <div className="mb-8 bg-success-green/10 border border-success-green/30 rounded-xl px-6 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-success-green/20 p-2 rounded-full">
                <span className="material-symbols-outlined text-success-green font-bold">shield</span>
              </div>
              <div>
                <h3 className="text-[18px] leading-[24px] font-semibold text-on-surface">Idempotent Receiver Active</h3>
                <p className="text-[14px] leading-[20px] text-on-surface-variant">Duplicate events are automatically blocked and discarded by the EventBus.</p>
              </div>
            </div>
            <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-success-green bg-success-green/20 px-3 py-1 rounded-full">System Healthy</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-[32px] font-bold text-on-surface">Penalty Alerts</h2>
            <p className="text-[16px] leading-[24px] text-on-surface-variant">Speed violation notices and enforcement actions</p>
          </div>

          {/* Summary Cards — real counts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-8">
            <div className="bg-surface-container border border-outline-variant p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-primary p-2 bg-primary/20 rounded-lg">assignment</span>
                <span className="text-success-green text-[12px] font-semibold px-2 py-1 rounded bg-success-green/10">Total</span>
              </div>
              <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-outline uppercase">Alerts Issued</p>
              <h4 className="text-3xl font-bold text-on-surface mt-1">{loading ? "—" : stats.total}</h4>
            </div>
            <div className="bg-surface-container border border-outline-variant p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-secondary p-2 bg-secondary/20 rounded-lg">pending_actions</span>
                <span className="text-tertiary text-[12px] font-semibold px-2 py-1 rounded bg-tertiary-container/30">Awaiting Action</span>
              </div>
              <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-outline uppercase">Pending Review</p>
              <h4 className="text-3xl font-bold text-on-surface mt-1">{loading ? "—" : stats.pending}</h4>
            </div>
            <div className="bg-surface-container border border-outline-variant p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="material-symbols-outlined text-error-red p-2 bg-error-container/30 rounded-lg">block</span>
                <span className="text-outline text-[12px] font-semibold px-2 py-1 rounded">Auto-Filtered</span>
              </div>
              <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-outline uppercase">Duplicates Blocked</p>
              <h4 className="text-3xl font-bold text-on-surface mt-1">—</h4>
            </div>
          </div>

          {/* Violation Table */}
          <div className="bg-surface-container border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-high">
              <h3 className="text-[18px] leading-[24px] font-semibold text-on-surface">Recent Violation Log</h3>
              <button onClick={fetchAlerts} className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-lg text-[12px] font-semibold hover:bg-surface-container-highest transition-colors text-on-surface">
                <span className="material-symbols-outlined text-[18px]">refresh</span> Refresh
              </button>
            </div>
            <div className="overflow-x-auto">
              {loading && (
                <div className="flex items-center justify-center py-16 gap-3 text-on-surface-variant">
                  <span className="material-symbols-outlined animate-spin">sync</span>
                  <span>Loading alerts...</span>
                </div>
              )}
              {!loading && error && (
                <div className="p-6 text-error-red flex items-center gap-3">
                  <span className="material-symbols-outlined">error</span>
                  <p>{error}</p>
                </div>
              )}
              {!loading && !error && alerts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant gap-3">
                  <span className="material-symbols-outlined text-5xl text-outline">assignment</span>
                  <p className="text-[16px] font-semibold">No alerts yet</p>
                  <p className="text-[14px]">Publish a SPEED_VIOLATION event from Camera Control to generate an alert.</p>
                </div>
              )}
              {!loading && !error && alerts.length > 0 && (
                <table className="w-full border-collapse">
                  <thead className="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                      {["Alert ID", "Vehicle", "Type", "Speed", "Source", "Time", "Status", "Actions"].map((h, i) => (
                        <th key={h} className={`${TH}${i === 7 ? " text-right" : ""}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {alerts.map((a) => {
                      const payload = a.eventPayload || a.payload || {};
                      const isDanger = a.status === "PENDING";
                      return (
                        <tr key={a._id} className="hover:bg-surface-container-high transition-colors">
                          <td className={`${TD} text-primary font-bold font-mono text-[12px]`}>{a._id?.slice(-8).toUpperCase()}</td>
                          <td className={`${TD} font-mono text-on-surface`}><span className="bg-surface-variant px-2 py-1 rounded">{payload.vehicleNumber || payload.plate || "—"}</span></td>
                          <td className={`${TD} text-on-surface`}>{a.eventType?.replace(/_/g, " ") || "—"}</td>
                          <td className={`${TD} ${isDanger ? "text-error-red font-semibold" : "text-on-surface"}`}>{payload.speed ? `${payload.speed} km/h` : "—"} <span className="text-outline text-[11px]">{payload.limit ? `(Limit ${payload.limit})` : ""}</span></td>
                          <td className={`${TD} text-outline`}>{a.source || "—"}</td>
                          <td className={`${TD} text-on-surface`}>{new Date(a.createdAt || a.timestamp).toLocaleTimeString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full ${STATUS_STYLE[a.status] || "bg-surface-container text-outline"} text-[10px] uppercase font-bold`}>{a.status}</span>
                          </td>
                          <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                            {a.status === "PENDING" && (
                              <>
                                <button onClick={() => handleStatusChange(a._id, "VERIFIED")} className="text-[10px] px-2 py-1 rounded bg-primary/20 text-primary font-bold hover:bg-primary/30 transition-colors">Verify</button>
                                <button onClick={() => handleStatusChange(a._id, "DISMISSED")} className="text-[10px] px-2 py-1 rounded bg-error-container/30 text-error-red font-bold hover:bg-error-container/50 transition-colors">Dismiss</button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
            {!loading && alerts.length > 0 && (
              <div className="px-6 py-4 bg-surface-container-high border-t border-outline-variant">
                <p className="text-[14px] leading-[20px] text-outline">Showing {alerts.length} alert{alerts.length !== 1 ? "s" : ""}</p>
              </div>
            )}
          </div>

          {/* Enforcement Info Card */}
          <div className="mt-8 bg-surface-container border border-outline-variant rounded-xl p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-[24px] leading-[32px] font-semibold text-on-surface mb-2">Automated Enforcement Active</h3>
                <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-lg mb-6">Speed violations above the configured limit automatically generate penalty alerts. High-speed thresholds trigger immediate escalation.</p>
                <div className="flex gap-4">
                  <div className="bg-surface-container-low rounded-lg p-4 border border-outline-variant flex-1">
                    <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-outline uppercase mb-1">Auto Fine Formula</p>
                    <p className="text-[16px] font-semibold text-on-surface">PKR = excess km/h × 50</p>
                  </div>
                  <div className="bg-surface-container-low rounded-lg p-4 border border-outline-variant flex-1">
                    <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-outline uppercase mb-1">Alert Status Flow</p>
                    <p className="text-[16px] font-semibold text-on-surface">PENDING → VERIFIED | DISMISSED</p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 bg-secondary p-8 rounded-xl text-white flex flex-col justify-between shadow-lg min-w-[240px]">
                <div>
                  <span className="material-symbols-outlined text-[40px] mb-4">verified_user</span>
                  <h3 className="text-[20px] leading-[28px] font-semibold mb-2">Review Protocol</h3>
                  <p className="text-[14px] leading-[20px] opacity-90 mb-4">All PENDING violations must be verified or dismissed by an authorized officer.</p>
                </div>
                <button className="bg-white text-secondary text-[12px] leading-[16px] py-3 rounded-lg uppercase tracking-widest font-bold hover:bg-opacity-90 transition-all shadow-md">
                  Verification Dashboard
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="bg-surface-container-lowest border-t border-outline-variant px-8 py-6 mt-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[14px] leading-[20px] text-on-surface-variant">© 2024 TrafficFlow Central Command. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "System Documentation"].map((l) => (
                <a key={l} className="text-[12px] font-semibold text-on-surface-variant hover:text-primary transition-colors" href="#">{l}</a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-semibold text-outline">v2.4.1-stable</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-green animate-pulse"></span>
                <span className="text-[12px] font-semibold text-on-surface-variant">System Status: Operational</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Alerts;
