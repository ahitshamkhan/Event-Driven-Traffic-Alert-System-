import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages — public
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Pages — protected
import Dashboard from "./pages/Dashboard";
import LiveFeed from "./pages/LiveFeed";
import Alerts from "./pages/Alerts";
import CameraControl from "./pages/CameraControl";

// Route guard
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public routes ── */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── Protected routes (any authenticated user) ── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/livefeed" element={<LiveFeed />} />
          <Route path="/alerts" element={<Alerts />} />
        </Route>

        {/* ── Role-restricted routes (POLICE + ADMIN only) ── */}
        <Route element={<ProtectedRoute allowedRoles={["POLICE", "ADMIN"]} />}>
          <Route path="/camera" element={<CameraControl />} />
        </Route>

        {/* ── Fallback: redirect unknown paths to home ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
