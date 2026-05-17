import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * useTheme — convenience hook to consume ThemeContext anywhere in the app.
 *
 * Usage:
 *   const { theme, isDark, toggleTheme } = useTheme();
 */
const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }

  return context;
};

export default useTheme;
