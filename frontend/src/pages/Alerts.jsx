import React, { useState } from "react";

/* ── Sidebar Navigation ── */
const NAV_ITEMS = [
  { icon: "grid_view", label: "Dashboard", href: "/dashboard" },
  { icon: "radar", label: "Live Feed", href: "/livefeed" },
  { icon: "notification_important", label: "Alerts", href: "/alerts", active: true, badge: 12 },
  { icon: "videocam", label: "Camera Control", href: "/camera" },
  { icon: "tune", label: "Settings", href: "#" },
];

const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface-container-lowest border-r border-outline-variant flex flex-col justify-between py-6 z-50">
    <div>
      <div className="px-6 mb-8">
        <h1 className="text-[24px] leading-[32px] font-bold text-primary">TrafficFlow</h1>
        <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">Central Command</p>
      </div>
      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            className={
              item.active
                ? "flex items-center px-6 py-3 text-primary font-bold border-r-4 border-primary bg-surface-container-high transition-colors duration-200"
                : "flex items-center px-6 py-3 text-on-surface-variant hover:text-surface-bright hover:bg-surface-container-highest transition-colors duration-200"
            }
            href={item.href}
          >
            <div className="relative mr-3">
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-error-red text-on-error text-[9px] w-4 h-4 flex items-center justify-center rounded-full">{item.badge}</span>
              )}
            </div>
            <span className="text-[16px] leading-[24px]">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
    <div className="px-6 space-y-4">
      <button className="w-full bg-primary text-on-primary-fixed py-3 rounded-lg text-[12px] leading-[16px] tracking-[0.05em] font-semibold uppercase tracking-wider shadow-sm hover:opacity-90 transition-opacity">
        <span className="material-symbols-outlined mr-2 align-middle">emergency</span>
        Report Emergency
      </button>
      <div className="pt-6 border-t border-outline-variant">
        <a className="flex items-center py-2 text-on-surface-variant hover:text-primary transition-colors" href="#">
          <span className="material-symbols-outlined mr-3">contact_support</span>
          <span className="text-[14px] leading-[20px]">Support</span>
        </a>
        <a className="flex items-center py-2 text-on-surface-variant hover:text-error-red transition-colors" href="#">
          <span className="material-symbols-outlined mr-3">power_settings_new</span>
          <span className="text-[14px] leading-[20px]">Logout</span>
        </a>
      </div>
    </div>
  </aside>
);

/* ── Top Navbar ── */
const TopNav = () => {
  const [search, setSearch] = useState("");
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
        <button className="hover:bg-surface-container-high rounded-full p-2 transition-transform duration-150 active:scale-95">
          <span className="material-symbols-outlined text-on-surface-variant">light_mode</span>
        </button>
        <div className="h-8 w-px bg-outline-variant mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface">Officer Chen</p>
            <p className="text-[10px] text-outline uppercase font-bold">Shift Supervisor</p>
          </div>
          <img alt="User profile avatar" className="w-10 h-10 rounded-full border border-outline-variant shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUYD9da22iXPDyi10H8R0HxRnDUQCMBAFvQ6FLC4bm4VIg6YSXmIxNpNCG7_oHDyJgi9FjuSRM0EMsPvLmZtUKFqG5SMpV4vB1AE07L5Del39-Ae4ghH5iI4e9Mts5Jfiokj_qliL6mJTz19vpzFwNV0_N2KacYaKTeRCDGT5BkIJkA98-z8iknBG9A4sban92PImlIEDGXfHWysooaqutNczyE-7oOuXMgF4AVGy34Ido5jafPkA_H3B-jXlIM4Zakyjy_CZSImg" />
        </div>
      </div>
    </header>
  );
};

/* ── Summary Cards ── */
const SUMMARY = [
  { icon: "assignment", iconColor: "text-primary", iconBg: "bg-primary/20", label: "Alerts Issued", value: "89", badge: "+12% vs Yesterday", badgeColor: "text-success-green bg-success-green/10" },
  { icon: "pending_actions", iconColor: "text-secondary", iconBg: "bg-secondary/20", label: "Pending Review", value: "23", badge: "High Priority", badgeColor: "text-tertiary bg-tertiary-container/30" },
  { icon: "block", iconColor: "text-error-red", iconBg: "bg-error-container/30", label: "Duplicates Blocked", value: "14", badge: "Auto-Filtered", badgeColor: "text-outline" },
];

/* ── Violation Table Data ── */
const VIOLATIONS = [
  { id: "#SPD-2024-001", plate: "B-YX 8820", type: "Speeding > 20km/h", speed: "104 km/h", limit: "80", location: "Main St Northbound", camera: "CAM-042", time: "14:23:02", status: "Issued", statusColor: "bg-primary/20 text-primary", danger: true },
  { id: "#SPD-2024-002", plate: "A-KJ 3941", type: "Reckless Driving", speed: "112 km/h", limit: "60", location: "West Ave Tunnel", camera: "CAM-018", time: "14:18:45", status: "Pending", statusColor: "bg-secondary/20 text-secondary", danger: true },
  { id: "#SPD-2024-003", plate: "M-ZZ 9010", type: "Speeding > 10km/h", speed: "92 km/h", limit: "80", location: "Ring Road Exit 4", camera: "CAM-099", time: "13:55:12", status: "Resolved", statusColor: "bg-surface-container-highest text-outline", danger: false },
  { id: "#SPD-2024-004", plate: "T-RF 2244", type: "Speeding > 20km/h", speed: "108 km/h", limit: "80", location: "Downtown Overpass", camera: "CAM-022", time: "13:42:10", status: "Issued", statusColor: "bg-primary/20 text-primary", danger: true },
];

const TH = "px-6 py-4 text-left text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-outline";
const TD = "px-6 py-4 text-[14px] leading-[20px]";

/* ══════════════════════════════════════════
   Main Alerts Page
   ══════════════════════════════════════════ */
const Alerts = () => (
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
              <p className="text-[14px] leading-[20px] text-on-surface-variant">14 duplicate events blocked today from multiple camera syncs.</p>
            </div>
          </div>
          <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-success-green bg-success-green/20 px-3 py-1 rounded-full">System Healthy</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-[32px] font-bold text-on-surface">Penalty Alerts</h2>
          <p className="text-[16px] leading-[24px] text-on-surface-variant">Speed violation notices and enforcement actions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] mb-8">
          {SUMMARY.map((c) => (
            <div key={c.label} className="bg-surface-container border border-outline-variant p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className={`material-symbols-outlined ${c.iconColor} p-2 ${c.iconBg} rounded-lg`}>{c.icon}</span>
                <span className={`${c.badgeColor} text-[12px] leading-[16px] tracking-[0.05em] font-semibold px-2 py-1 rounded`}>{c.badge}</span>
              </div>
              <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-outline uppercase">{c.label}</p>
              <h4 className="text-3xl font-bold text-on-surface mt-1">{c.value}</h4>
            </div>
          ))}
        </div>

        {/* Violation Table */}
        <div className="bg-surface-container border border-outline-variant rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-high">
            <h3 className="text-[18px] leading-[24px] font-semibold text-on-surface">Recent Violation Log</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-lg text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:bg-surface-container-highest transition-colors text-on-surface">
                <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-lg text-[12px] leading-[16px] tracking-[0.05em] font-semibold hover:bg-surface-container-highest transition-colors text-on-surface">
                <span className="material-symbols-outlined text-[18px]">download</span> Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  {["Alert ID", "Plate", "Violation Type", "Speed", "Location", "Camera", "Time", "Status", "Actions"].map((h, i) => (
                    <th key={h} className={`${TH}${i === 8 ? " text-right" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {VIOLATIONS.map((v) => (
                  <tr key={v.id} className="hover:bg-surface-container-high transition-colors">
                    <td className={`${TD} text-primary font-bold`}>{v.id}</td>
                    <td className={`${TD} font-mono text-on-surface`}><span className="bg-surface-variant px-2 py-1 rounded">{v.plate}</span></td>
                    <td className={`${TD} text-on-surface`}>{v.type}</td>
                    <td className={`${TD} ${v.danger ? "text-error-red" : "text-on-surface"}`}>{v.speed} <span className="text-outline text-[11px]">(Limit {v.limit})</span></td>
                    <td className={`${TD} text-on-surface`}>{v.location}</td>
                    <td className={`${TD} text-outline`}>{v.camera}</td>
                    <td className={`${TD} text-on-surface`}>{v.time}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full ${v.statusColor} text-[10px] uppercase font-bold`}>{v.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="material-symbols-outlined text-outline hover:text-primary transition-colors">visibility</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-surface-container-high border-t border-outline-variant flex items-center justify-between">
            <p className="text-[14px] leading-[20px] text-outline">Showing 1-10 of 89 violations</p>
            <div className="flex gap-2">
              <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-highest disabled:opacity-30 text-on-surface" disabled>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-highest text-on-surface">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detail Cards */}
        <div className="grid grid-cols-12 gap-[24px] mt-8 mb-8">
          {/* Enforcement Card */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container border border-outline-variant rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative">
            <div className="z-10 flex-1">
              <h3 className="text-[24px] leading-[32px] font-semibold text-on-surface mb-2">Automated Enforcement Active</h3>
              <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-lg mb-6">Current detection sensitivity is set to +10km/h above limit. High-speed thresholds (&gt;100km/h) trigger immediate escalation to Shift Supervisor.</p>
              <div className="flex gap-4">
                <div className="bg-surface-container-low rounded-lg p-4 border border-outline-variant flex-1">
                  <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-outline uppercase mb-1">Last Update</p>
                  <p className="text-[18px] leading-[24px] font-semibold text-on-surface">2 mins ago</p>
                </div>
                <div className="bg-surface-container-low rounded-lg p-4 border border-outline-variant flex-1">
                  <p className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-outline uppercase mb-1">Global Limit</p>
                  <p className="text-[18px] leading-[24px] font-semibold text-on-surface">Adaptive</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block w-1/3 relative h-48 rounded-lg overflow-hidden border border-outline-variant bg-surface-dim">
              <img alt="Camera detection visualization" className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYZEfDDjJywxHoJ0P4CxVsP8RPgkkMHTVUUih9t3-nHH_j4UyETM-sPa_dBFY4SCvjO-0b0blRwreNT6Pa_I-ToJ3sif7WmAVatx56WpNTXJHOmulKwaLqvtkzfetm5Mz4at1YHIGzE6lq82eWp83G18mpcI9greqewIvmjZpkRFJVpp59fZAjHkG1RBxuh71n_vixvTih0rr_ZuyrJvyqb7s-B3jXw7t9DUZdR6Mty7OZIL_YSNif_MPBKXU2z8aNxjmUBLHvczE" />
            </div>
          </div>

          {/* Review Protocol Card */}
          <div className="col-span-12 lg:col-span-4 bg-secondary p-8 rounded-xl text-white flex flex-col justify-between shadow-lg">
            <div>
              <span className="material-symbols-outlined text-[40px] mb-4">verified_user</span>
              <h3 className="text-[24px] leading-[32px] font-semibold mb-2">Review Protocol</h3>
              <p className="text-[14px] leading-[20px] opacity-90 mb-4">All &quot;PENDING&quot; violations must be visually verified within 4 hours to comply with municipal legal requirements.</p>
            </div>
            <button className="bg-white text-secondary text-[12px] leading-[16px] tracking-[0.05em] font-semibold py-3 rounded-lg uppercase tracking-widest font-bold hover:bg-opacity-90 transition-all shadow-md">
              Verification Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant px-8 py-6 mt-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-left">
            <p className="text-[14px] leading-[20px] text-on-surface-variant">© 2024 TrafficFlow Central Command. All rights reserved.</p>
          </div>
          <div className="flex-1 flex justify-center gap-6">
            {["Privacy Policy", "Terms of Service", "System Documentation"].map((l) => (
              <a key={l} className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant hover:text-primary transition-colors" href="#">{l}</a>
            ))}
          </div>
          <div className="flex-1 flex justify-end items-center gap-4">
            <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-outline">v2.4.1-stable</span>
            <div className="h-4 w-px bg-outline-variant"></div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success-green animate-pulse"></span>
              <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">System Status: Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  </div>
);

export default Alerts;
