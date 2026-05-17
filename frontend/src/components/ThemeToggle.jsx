import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * ThemeToggle — icon button that switches between dark and light mode.
 * Reads from and writes to ThemeContext.
 * Drop it anywhere inside <ThemeProvider>.
 */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="hover:bg-surface-container-high rounded-full p-2 transition-transform duration-150 active:scale-95"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <span className="material-symbols-outlined text-on-surface-variant">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
