import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";

/**
 * Navbar — fixed top header used on all protected dashboard pages.
 * Includes search bar, notifications, theme toggle, and user profile.
 *
 * Props:
 *   placeholder {string} Optional search placeholder text
 *   onSearch    {Function} Optional callback with search value
 */
const Navbar = ({
  placeholder = "Search intersections, cameras, or events...",
  onSearch,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-240px)] h-[64px] bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-[24px] z-40">
      {/* Search */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder={placeholder}
            className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-[14px] text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary-container outline-none transition-all"
          />
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2 ml-4">
        {/* Notifications */}
        <button className="hover:bg-surface-container-high rounded-full p-2 transition-transform duration-150 active:scale-95">
          <span className="material-symbols-outlined text-on-surface-variant">
            notifications
          </span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        <div className="h-8 w-[1px] bg-outline-variant mx-2"></div>

        {/* User profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-3 cursor-pointer hover:bg-surface-container-high rounded-lg px-2 py-1 transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[12px] font-semibold text-on-surface leading-tight">
                {user?.name || "Officer"}
              </p>
              <p className="text-[10px] text-outline uppercase font-bold">
                {user?.role || "User"}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center border-2 border-primary/20 overflow-hidden flex-shrink-0">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span
                  className="material-symbols-outlined text-on-primary-container text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  person
                </span>
              )}
            </div>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-[180px] bg-surface-container border border-outline-variant rounded-xl shadow-xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-outline-variant">
                <p className="text-[12px] font-semibold text-on-surface truncate">
                  {user?.name || user?.email}
                </p>
                <p className="text-[10px] text-primary uppercase font-bold">
                  {user?.role}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-[14px] text-on-surface-variant hover:text-error-red hover:bg-surface-container-high transition-colors text-left"
              >
                <span className="material-symbols-outlined text-[18px]">
                  power_settings_new
                </span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
