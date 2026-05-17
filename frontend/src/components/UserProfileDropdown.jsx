import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ROLE_META = {
  POLICE:  { label: "Traffic Officer",         icon: "local_police",         color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  NHA:     { label: "NHA Authority",            icon: "monitoring",           color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  ADMIN:   { label: "System Administrator",     icon: "admin_panel_settings", color: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
};

const UserProfileDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref  = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const role     = user?.role || "UNKNOWN";
  const roleMeta = ROLE_META[role] || { label: role, icon: "person", color: "bg-surface-container-high text-on-surface-variant border-outline-variant" };

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 pl-2 rounded-xl hover:bg-surface-container-high px-2 py-1.5 transition-colors group"
      >
        <div className="text-right hidden sm:block">
          <p className="text-[14px] font-semibold text-on-surface leading-tight">{user?.name || "Guest"}</p>
          <p className="text-[10px] text-outline uppercase font-semibold">{role}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary-container border-2 border-primary-container/50 flex items-center justify-center group-hover:ring-2 group-hover:ring-primary/30 transition-all">
          <span className="text-on-primary-container font-bold text-sm">{initials}</span>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
          {open ? "expand_less" : "expand_more"}
        </span>
      </button>

      {/* Dropdown Card */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-surface-container border border-outline-variant rounded-2xl shadow-2xl z-[300] overflow-hidden">
          {/* Header */}
          <div className="bg-surface-container-high px-5 py-4 flex items-center gap-4 border-b border-outline-variant/50">
            <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center border-2 border-primary/20 shrink-0">
              <span className="text-on-primary-container font-bold text-xl">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[16px] font-bold text-on-surface truncate">{user?.name || "Guest"}</p>
              <p className="text-[12px] text-on-surface-variant truncate">{user?.email || "—"}</p>
              <span className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${roleMeta.color}`}>
                <span className="material-symbols-outlined text-[12px]">{roleMeta.icon}</span>
                {roleMeta.label}
              </span>
            </div>
          </div>

          {/* Info Rows */}
          <div className="px-3 py-2 divide-y divide-outline-variant/20">
            <div className="flex items-center gap-3 py-2.5 px-2">
              <span className="material-symbols-outlined text-outline text-[18px]">badge</span>
              <div>
                <p className="text-[10px] text-outline uppercase font-bold tracking-wider">Badge / Officer ID</p>
                <p className="text-[13px] font-semibold text-on-surface">{user?.badgeId || user?.badge || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 py-2.5 px-2">
              <span className="material-symbols-outlined text-outline text-[18px]">security</span>
              <div>
                <p className="text-[10px] text-outline uppercase font-bold tracking-wider">Auth Status</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-green animate-pulse"></span>
                  <p className="text-[13px] font-semibold text-success-green">JWT Active · 24h Session</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 py-2.5 px-2">
              <span className="material-symbols-outlined text-outline text-[18px]">schedule</span>
              <div>
                <p className="text-[10px] text-outline uppercase font-bold tracking-wider">Session Started</p>
                <p className="text-[13px] font-semibold text-on-surface">{new Date().toLocaleString("en-PK", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-3 pb-3 flex flex-col gap-1.5">
            <button
              onClick={() => setOpen(false)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors text-[13px] font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
              View Full Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-error-red hover:bg-error-red/10 transition-colors text-[13px] font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">power_settings_new</span>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
