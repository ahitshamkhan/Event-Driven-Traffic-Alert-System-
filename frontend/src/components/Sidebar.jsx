import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NAV_ITEMS = [
  { icon: "dashboard", label: "Dashboard", to: "/dashboard", filled: true },
  { icon: "radar", label: "Live Feed", to: "/livefeed" },
  { icon: "notification_important", label: "Alerts", to: "/alerts", badge: 12 },
  { icon: "videocam", label: "Camera Control", to: "/camera" },
  { icon: "tune", label: "Settings", to: "/settings" },
];

/**
 * Sidebar — fixed left navigation used on all protected dashboard pages.
 * Active route is auto-detected via React Router NavLink.
 * Logout is wired to AuthContext via useAuth.
 */
const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface-container-lowest border-r border-outline-variant flex flex-col justify-between py-6 z-50">
      {/* Top: Logo + Nav */}
      <div>
        {/* Brand */}
        <div className="px-6 mb-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-container rounded flex items-center justify-center">
            <span
              className="material-symbols-outlined text-on-primary-container text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              traffic
            </span>
          </div>
          <div>
            <h1 className="text-[20px] font-bold text-primary leading-tight">
              TrafficFlow
            </h1>
            <p className="text-[10px] text-outline uppercase tracking-wider font-semibold">
              Central Command
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col px-3 gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-3 py-3 text-primary font-bold border-r-4 border-primary bg-surface-container-low rounded-l-lg transition-colors duration-200"
                  : "flex items-center gap-3 px-3 py-3 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors duration-200 rounded-lg"
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className="material-symbols-outlined"
                    style={
                      isActive || item.filled
                        ? { fontVariationSettings: '"FILL" 1' }
                        : undefined
                    }
                  >
                    {item.icon}
                  </span>
                  <span className="text-[16px] leading-[24px]">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-error-container text-on-error-container text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom: Emergency + Support + Logout */}
      <div className="flex flex-col gap-1 px-3">
        <button className="mb-3 bg-primary-container text-on-primary-container py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">emergency</span>
          Report Emergency
        </button>

        <div className="border-t border-outline-variant pt-3 flex flex-col gap-1">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors rounded-lg text-[14px]"
          >
            <span className="material-symbols-outlined">contact_support</span>
            Support
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-error-red hover:bg-surface-container transition-colors rounded-lg text-[14px] w-full text-left"
          >
            <span className="material-symbols-outlined">power_settings_new</span>
            Logout
          </button>
        </div>

        {/* Logged-in user hint */}
        {user && (
          <div className="mt-3 px-3 py-2 bg-surface-container rounded-lg border border-outline-variant">
            <p className="text-[11px] text-outline uppercase font-semibold tracking-wider">
              Logged in as
            </p>
            <p className="text-[13px] text-on-surface font-semibold truncate">
              {user.name || user.email}
            </p>
            <p className="text-[10px] text-primary uppercase font-bold tracking-wider">
              {user.role}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
