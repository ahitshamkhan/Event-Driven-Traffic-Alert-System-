import React, { createContext, useState, useEffect, useCallback } from "react";
import { login as loginService, logout as logoutService, getCurrentUser, isAuthenticated } from "../services/auth.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // true while we check localStorage on mount

  // On first load, restore session from localStorage
  useEffect(() => {
    const storedUser = getCurrentUser();
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  /**
   * Login — calls auth service, updates state
   * @param {Object} credentials - { email, password }
   */
  const login = useCallback(async (credentials) => {
    const data = await loginService(credentials);
    setUser(data.user);
    setToken(data.token);
    return data;
  }, []);

  /**
   * Logout — clears service + state
   */
  const logout = useCallback(() => {
    logoutService();
    setUser(null);
    setToken(null);
  }, []);

  /**
   * Check if the current user has a required role
   * @param {string|string[]} roles
   */
  const hasRole = useCallback(
    (roles) => {
      if (!user) return false;
      const roleList = Array.isArray(roles) ? roles : [roles];
      return roleList.includes(user.role);
    },
    [user]
  );

  const value = {
    user,
    token,
    loading,
    isAuthenticated: isAuthenticated(),
    login,
    logout,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
