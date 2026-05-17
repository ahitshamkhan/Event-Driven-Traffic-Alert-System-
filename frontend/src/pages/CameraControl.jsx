import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import API from "../services/api";

/* ── Sidebar ── */
const NAV_ITEMS = [
  { icon: "grid_view", label: "Dashboard", href: "/dashboard" },
  { icon: "radar", label: "Live Feed", href: "/livefeed" },
  { icon: "notification_important", label: "Alerts", href: "/alerts", badge: 12 },
  { icon: "videocam", label: "Camera Control", href: "/camera", active: true },
  { icon: "tune", label: "Settings", href: "#" },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate("/login"); };

  return (
  <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface-container border-r border-outline-variant shadow-lg flex flex-col justify-between py-6 z-50">
    <div>
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-container rounded flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary-container">traffic</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-primary">TrafficFlow</h1>
          <p className="text-[10px] font-semibold tracking-wider text-on-surface-variant uppercase">Central Command</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => {
          if (item.active) {
            return (
              <a key={item.label} className="flex items-center gap-3 px-3 py-3 text-[16px] leading-[24px] text-primary-fixed-dim font-bold border-r-4 border-primary-container bg-surface-container-high rounded-lg" href={item.href}>
                <span className="material-symbols-outlined">{item.icon}</span> {item.label}
              </a>
            );
          }
          if (item.badge) {
            return (
              <a key={item.label} className="flex items-center justify-between px-3 py-3 text-[16px] leading-[24px] text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg" href={item.href}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">{item.icon}</span> {item.label}
                </div>
                <span className="bg-error-container text-on-error-container text-[10px] font-bold px-1.5 rounded-full">{item.badge}</span>
              </a>
            );
          }
          return (
            <a key={item.label} className="flex items-center gap-3 px-3 py-3 text-[16px] leading-[24px] text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg" href={item.href}>
              <span className="material-symbols-outlined">{item.icon}</span> {item.label}
            </a>
          );
        })}
      </nav>
    </div>
    <div className="px-3 flex flex-col gap-4">
      <button className="bg-primary-container text-on-primary-container py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <span className="material-symbols-outlined">emergency</span> Report Emergency
      </button>
      <div className="flex flex-col gap-1 border-t border-outline-variant pt-4">
        <a className="flex items-center gap-3 px-3 py-2 text-[16px] leading-[24px] text-on-surface-variant hover:bg-surface-variant rounded-lg" href="#">
          <span className="material-symbols-outlined">contact_support</span> Support
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-[16px] leading-[24px] text-on-surface-variant hover:bg-surface-variant hover:text-error-red rounded-lg w-full text-left"
        >
          <span className="material-symbols-outlined">power_settings_new</span> Logout
        </button>
      </div>
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
    <header className="fixed top-0 right-0 w-[calc(100%-240px)] h-[64px] bg-surface border-b border-outline-variant flex justify-between items-center px-8 z-40">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 text-on-surface text-[16px] leading-[24px] focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all" placeholder="Search cameras, events, or locations..." type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="hover:bg-surface-variant rounded-full p-2 text-on-surface-variant transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="hover:bg-surface-variant rounded-full p-2 text-on-surface-variant transition-colors">
          <span className="material-symbols-outlined">light_mode</span>
        </button>
        <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-on-surface">{user?.name || "Guest"}</p>
            <p className="text-[10px] text-outline uppercase font-semibold">{user?.role || "—"}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-container border border-outline-variant flex items-center justify-center">
            <span className="text-on-primary-container font-bold text-sm">{initials}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

/* ── Camera Data ── */
const CAMERAS = [
  { id: "CAM-001", location: "Main St & 5th Ave Intersection", selected: true, hasImage: true, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjVr8dbEaPOW-9cgRaIIVFfHBNFJ2BClAtII3JfZdaIiKxfCE5H5mVzZBWyTynr9PdtWcqBxW1Y3wyTbNuIwzPKbafcKWvwy5SoOlm7HIXSUj1t-CnUKemvyrKx73xu7SNr2K0PzkAka8VzlV_hXWNY8m-E_nFN3Zqg1u-dPqhI3_P9UjIfdgfg2Qw6YngqVUQXMwxQdPz_KP2puLjZoGLDizIIbB1w4S-led2O6w4Xe_UkkprjTlxXK0sIY-QEUGD557GbT3FS4o" },
  { id: "CAM-002", location: "Northbound Exit 12B Ramp", hasImage: true, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDckKy_4CAzmk8NnMKnL2xYn6d_QlVMbnsA1SZwjn_xm8LxO13OvV6rjNP08YZQm788TwSBLa6p0xesTCFENA5dwYHtUQNeq12CimAKmjiZ56hLVCkgM0-KeTxpbdRGVLMByePA6b8GpFkFdKGGVP1vSQEu1WT5oktst_XcdOvb2mYxLduKqpHSHpxprHJ0wPCWtxu7fpRoD3Waz1ZDMYjk1c_NettjedYtxiWJ9G96CLIU_8RD_irfCyFPSa-sSPYnQr0i4qy_fqU" },
  { id: "CAM-003", location: "Maple Avenue Residential", hasImage: true, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7WI2NWImZvAVEzEkvnN_XKR6k21RaHbtP7d3-3vHqyNbgfMqtKjIwt1gfuFZJTwc5E_Fwa467QkJuGKMXgoVE6UUoRloeTegxRzkcKdc8GX59SIAyEvCbQR-RyucxG2Rx8CMLoZ7LyC9hRGRfBKeHOKQfbHMZF23UQ5tKuKwD9OpSaZfhhJ435Vn_gDtNWsp9tjuq1wva2_0ItW1w8p8tMcwor3ImDaTNPNVRaTYJ6-eM3NFhtTrpPYzHDar4g-WTrq0N5m6VQCU" },
  { id: "CAM-004", location: "Central Transit Hub North", hasImage: true, src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh5EcBxB4imlD25rBl04vrZctzLDs2AFyTX19-pA-HLXABGbBGEcPImIc0rFWN2rAHdZcXUqO-pcmRYrRpX_p8Nm9A05E50Wx0D0Mu4vFn-v6xjED8n-5KG21F04bh_r-KuAgiVezB6TxUubBCSBOKd_kQGH3wD1Uo1iGbtigk4udRaTzJzXNjkJ3ScBN2Ec5RxqA8nbXsNs0pzSVOeJ5DIlxooc0UNturtx-Xjmt8J9wjOAc8jeI6JSArLovLlUeac2EOOwpv6Uc" },
  { id: "CAM-005", location: "Broadway & 42nd St" },
  { id: "CAM-006", location: "Bridge Entry West" },
  { id: "CAM-007", location: "Industrial Zone 3 Loop" },
  { id: "CAM-008", location: "Airport Plaza Entry" },
];

/* ── Event Types ── */
const EVENT_TYPES = [
  { icon: "directions_car", label: "Vehicle Detected", active: true },
  { icon: "speed", label: "Speed Violation" },
  { icon: "traffic", label: "Congestion Alert" },
  { icon: "check_circle", label: "Traffic Cleared" },
];

/* ── Camera Card Component ── */
const CameraCard = ({ cam, onClick }) => {
  const isSelected = cam.selected;
  return (
    <div
      onClick={() => onClick(cam.id)}
      className={`${isSelected ? "bg-surface-container border-2 border-primary-container shadow-xl" : "bg-surface border border-outline-variant shadow-sm hover:border-primary-container hover:bg-surface-container-low"} rounded-xl p-4 relative cursor-pointer transition-all`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-bold tracking-wider uppercase ${isSelected ? "text-primary" : "text-on-surface-variant"}`}>{cam.id}</span>
        <span className="bg-success-green/10 text-success-green text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-success-green rounded-full"></span> Online
        </span>
      </div>
      <div className="aspect-video bg-surface-container-highest rounded-lg overflow-hidden mb-2 flex items-center justify-center">
        {cam.hasImage ? (
          <img className={`w-full h-full object-cover ${isSelected ? "grayscale-[0.2]" : "grayscale-[0.5]"}`} alt={cam.location} src={cam.src} />
        ) : (
          <span className="material-symbols-outlined text-outline text-4xl">videocam</span>
        )}
      </div>
      <p className="text-[10px] text-outline truncate">{cam.location}</p>
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-lg border border-background">
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════
   Main CameraControl Page
   ══════════════════════════════════════════ */
const CameraControl = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedCam, setSelectedCam]         = useState("CAM-001");
  const [activeEventType, setActiveEventType] = useState("Vehicle Detected");
  const [plate, setPlate]                     = useState("ABC-1234");
  const [speed, setSpeed]                     = useState("42");
  const [severity, setSeverity]               = useState("Medium (Standard)");
  const [vehicleCount, setVehicleCount]       = useState("12");
  const [publishing, setPublishing]           = useState(false);
  const [successMsg, setSuccessMsg]           = useState("");
  const [errorMsg, setErrorMsg]               = useState("");

  const EVENT_TYPE_MAP = {
    "Vehicle Detected":  "VEHICLE_DETECTED",
    "Speed Violation":   "SPEED_VIOLATION",
    "Congestion Alert":  "CONGESTION_ALERT",
    "Traffic Cleared":   "TRAFFIC_CLEARED",
  };

  const cameras = CAMERAS.map((c) => ({ ...c, selected: c.id === selectedCam }));
  const selectedCamera = cameras.find((c) => c.selected);

  const handleReset = () => {
    setPlate(""); setSpeed(""); setSeverity("Low (Routine)"); setVehicleCount("");
    setSuccessMsg(""); setErrorMsg("");
  };

  const handlePublish = async () => {
    setSuccessMsg(""); setErrorMsg("");
    if (!plate) { setErrorMsg("License plate is required."); return; }
    try {
      setPublishing(true);
      const payload = {
        eventType: EVENT_TYPE_MAP[activeEventType],
        source: selectedCam,
        payload: {
          vehicleNumber: plate.toUpperCase(),
          speed:         Number(speed) || 0,
          limit:         80,
          vehicleCount:  Number(vehicleCount) || 1,
          location:      selectedCamera?.location || selectedCam,
          severity,
        },
      };
      const res = await API.post("/camera/publish", payload);
      setSuccessMsg(`✅ Event published! ID: ${res.data.eventId}`);
      setPlate(""); setSpeed(""); setVehicleCount("");
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Failed to publish event.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Sidebar />
      <TopNav />

      <main className="ml-[240px] pt-[64px] min-h-screen flex flex-col bg-background">
        <div className="p-8 flex-grow">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-on-surface">Camera Control Panel</h2>
            <p className="text-on-surface-variant">Publish events from traffic cameras in the downtown district.</p>
          </div>

          {/* Camera Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {cameras.map((cam) => (
              <CameraCard key={cam.id} cam={cam} onClick={setSelectedCam} />
            ))}
          </section>

          {/* Publish Event Panel */}
          <section className="bg-surface-container-low border border-outline-variant rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">broadcast_on_home</span>
              </div>
              <h3 className="text-2xl font-bold text-on-surface">Publish Event</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-primary-fixed-dim mb-2 uppercase">Step 1: Target Selection</p>
                  <div className="bg-surface-container-high border border-primary-container rounded-xl p-4 flex items-center gap-4">
                    <div className="w-16 h-12 bg-primary-container/20 rounded-lg overflow-hidden border border-primary-container/30">
                      {selectedCamera?.hasImage ? (
                        <img alt="Selection thumbnail" className="w-full h-full object-cover" src={selectedCamera.src} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-outline">videocam</span></div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">{selectedCam}</h4>
                      <p className="text-[10px] text-outline">{selectedCamera?.location}</p>
                    </div>
                  </div>
                </div>

                {/* Idempotency Shield */}
                <div className="bg-surface-container-highest/50 border border-outline-variant p-4 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-tertiary">warning</span>
                    <div>
                      <p className="text-sm font-bold text-on-surface">Idempotency Shield Active</p>
                      <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed">Identical event fingerprints within 5 minutes will be automatically suppressed.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <button className="bg-surface-container-high hover:bg-surface-variant text-on-surface py-2.5 px-4 rounded-lg font-bold text-xs w-full transition-all border border-outline-variant">
                      Publish Duplicate Anyway
                    </button>
                    <p className="text-[10px] text-tertiary-fixed-dim font-medium text-center italic">Result: Duplicate blocked by Idempotent Receiver</p>
                  </div>
                </div>
              </div>

              {/* Steps 2 & 3 */}
              <div className="lg:col-span-2">
                {/* Step 2: Event Type */}
                <p className="text-[10px] font-bold tracking-widest text-primary-fixed-dim mb-4 uppercase">Step 2: Event Type Selector</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {EVENT_TYPES.map((et) => (
                    <button
                      key={et.label}
                      onClick={() => setActiveEventType(et.label)}
                      className={
                        activeEventType === et.label
                          ? "flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary-container bg-primary-container/10 text-primary-fixed-dim hover:bg-primary-container/20 transition-all shadow-lg"
                          : "flex flex-col items-center justify-center p-4 rounded-xl border border-outline-variant bg-surface text-on-surface-variant hover:border-primary-container transition-all"
                      }
                    >
                      <span className="material-symbols-outlined text-3xl mb-2">{et.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-center">{et.label}</span>
                    </button>
                  ))}
                </div>

                {/* Step 3: Event Details */}
                <p className="text-[10px] font-bold tracking-widest text-primary-fixed-dim mb-4 uppercase">Step 3: Event Details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">License Plate</label>
                    <input className="w-full bg-surface-container border border-outline-variant rounded-lg p-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none uppercase placeholder:text-outline-variant transition-all" type="text" value={plate} onChange={(e) => setPlate(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Detected Speed (MPH)</label>
                    <input className="w-full bg-surface-container border border-outline-variant rounded-lg p-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all" type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Severity Level</label>
                    <select className="w-full bg-surface-container border border-outline-variant rounded-lg p-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all appearance-none cursor-pointer" value={severity} onChange={(e) => setSeverity(e.target.value)}>
                      <option>Low (Routine)</option>
                      <option>Medium (Standard)</option>
                      <option>High (Urgent)</option>
                      <option>Critical (Emergency)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Vehicle Count</label>
                    <input className="w-full bg-surface-container border border-outline-variant rounded-lg p-3 text-sm font-medium text-on-surface focus:ring-2 focus:ring-primary-container focus:border-transparent outline-none transition-all" type="number" value={vehicleCount} onChange={(e) => setVehicleCount(e.target.value)} />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Precise GPS Location</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">location_on</span>
                      <input className="w-full bg-surface-container-high border border-outline-variant rounded-lg p-3 pl-10 text-sm font-medium text-on-surface-variant outline-none" readOnly type="text" value="40.7128° N, 74.0060° W" />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-10 space-y-3">
                  {successMsg && (
                    <div className="w-full bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-green-600 text-sm font-medium">{successMsg}</div>
                  )}
                  {errorMsg && (
                    <div className="w-full bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-500 text-sm font-medium">{errorMsg}</div>
                  )}
                  <div className="flex justify-end gap-4">
                    <button onClick={handleReset} className="px-6 py-3 rounded-xl border border-outline-variant text-on-surface-variant font-bold text-xs uppercase tracking-wider hover:bg-surface-variant transition-all">
                      Reset Form
                    </button>
                    <button
                      onClick={handlePublish}
                      disabled={publishing}
                      className="px-10 py-3 rounded-xl bg-primary-container text-on-primary-container font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-sm">send</span>
                      {publishing ? "Publishing..." : "Publish To Feed"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-auto border-t border-outline-variant bg-surface-container px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-on-surface-variant font-medium">© 2024 TrafficFlow Central Command. Secure Cloud Infrastructure.</p>
          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Documentation"].map((l) => (
              <a key={l} className="text-xs font-semibold text-primary-fixed-dim hover:text-primary transition-all" href="#">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-outline px-2.5 py-1.5 bg-surface-container-high rounded-lg border border-outline-variant uppercase tracking-widest">v2.4.1-stable</span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-success-green/10 rounded-full border border-success-green/20">
              <span className="w-2 h-2 bg-success-green rounded-full animate-pulse"></span>
              <p className="text-[10px] text-success-green font-bold uppercase tracking-wider">System Operational</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CameraControl;
