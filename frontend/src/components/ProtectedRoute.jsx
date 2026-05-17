import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * ProtectedRoute — blocks unauthenticated users and optionally
 * restricts access by role.
 *
 * Usage:
 *   // Auth only
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 *
 *   // Role restricted (police + admin only)
 *   <Route element={<ProtectedRoute allowedRoles={["police", "admin"]} />}>
 *     <Route path="/camera" element={<CameraControl />} />
 *   </Route>
 *
 * Props:
 *   allowedRoles {string[]}  Optional list of roles that may access the route.
 *                            If omitted, any authenticated user is allowed.
 *   children     {ReactNode} Used when wrapping a single element directly.
 */
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Still checking localStorage — show nothing to avoid flash
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="material-symbols-outlined text-primary animate-spin text-[48px]">
          progress_activity
        </span>
      </div>
    );
  }

  // Not logged in → redirect to /login, remember where they came from
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but wrong role → redirect to /dashboard
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAccess = allowedRoles.includes(user?.role);
    if (!hasAccess) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // All checks passed — render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
