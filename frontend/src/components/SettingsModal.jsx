import React from "react";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

const SYSTEM_INFO = [
  { label: "System Version",   value: "v2.4.1-stable" },
  { label: "Architecture",     value: "Event-Driven (Pub/Sub)" },
  { label: "Pattern",          value: "Idempotent Receiver" },
  { label: "Database",         value: "MongoDB (Local)" },
  { label: "Auth",             value: "JWT (24h expiry)" },
  { label: "Real-time",        value: "Socket.IO / EventBus" },
];

const SettingsModal = ({ isOpen, onClose }) => {
  const { user }           = useAuth();
  const { isDark, toggleTheme } = useTheme();

  if (!isOpen) return null;

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg bg-surface-container border border-outline-variant rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-surface-container-high border-b border-outline-variant px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            <h2 className="text-[18px] font-bold text-on-surface">Settings</h2>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors p-1 rounded-lg hover:bg-surface-container-highest">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">

          {/* Profile Card */}
          <div>
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-3">Your Profile</p>
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center border-2 border-primary-container/50">
                <span className="text-on-primary-container font-bold text-lg">{initials}</span>
              </div>
              <div className="flex-1">
                <p className="text-[16px] font-bold text-on-surface">{user?.name || "Guest"}</p>
                <p className="text-[12px] text-on-surface-variant">{user?.email || "—"}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-primary-container/20 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {user?.role || "UNKNOWN"}
                </span>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div>
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-3">Appearance</p>
            <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    {isDark ? "dark_mode" : "light_mode"}
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-on-surface">{isDark ? "Dark Mode" : "Light Mode"}</p>
                    <p className="text-[11px] text-on-surface-variant">Toggle interface theme</p>
                  </div>
                </div>
                {/* Toggle switch */}
                <button
                  onClick={toggleTheme}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
                    isDark ? "bg-primary-container" : "bg-outline-variant"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                      isDark ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div>
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-3">System Information</p>
            <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant/30">
              {SYSTEM_INFO.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-[12px] text-on-surface-variant">{item.label}</span>
                  <span className="text-[12px] font-semibold text-on-surface font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Indicators */}
          <div>
            <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-3">Service Status</p>
            <div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant/30">
              {[
                { name: "API Server",     status: "Online",     color: "bg-success-green" },
                { name: "MongoDB",        status: "Connected",  color: "bg-success-green" },
                { name: "EventBus",       status: "Active",     color: "bg-success-green" },
                { name: "JWT Auth",       status: "Valid",      color: "bg-success-green" },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between px-4 py-2.5">
                  <span className="text-[12px] text-on-surface-variant">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${s.color} animate-pulse`}></span>
                    <span className="text-[12px] font-semibold text-success-green">{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-full py-3 bg-surface-container-high border border-outline-variant rounded-xl text-on-surface text-[13px] font-semibold hover:bg-surface-container-highest transition-colors"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
