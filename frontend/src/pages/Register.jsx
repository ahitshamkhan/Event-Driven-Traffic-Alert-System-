import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/* ── Feature items for branding panel ── */
const BRAND_FEATURES = [
  { icon: "videocam", title: "Access 12 live camera feeds", desc: "Instant connectivity to existing NHA infrastructure." },
  { icon: "notifications_active", title: "Real-time violation alerts", desc: "AI-powered detection of traffic infringements." },
  { icon: "history_edu", title: "Full audit trail of all events", desc: "Immutable logs for legal and administrative reporting." },
];

/* ── Role cards for Step 2 overlay ── */
const ROLES = [
  {
    icon: "local_police", title: "Traffic Officer", selected: false,
    perms: ["View 12 Live Feeds", "Issue Citations", "Real-time Alerts"],
  },
  {
    icon: "monitoring", title: "City Analyst", selected: true, badge: "Primary Role",
    perms: ["Historical Data Export", "Pattern AI Reports", "Infrastructure Planning"],
  },
  {
    icon: "admin_panel_settings", title: "System Admin", selected: false,
    perms: ["User Management", "System Logs", "Node Configuration"],
  },
];

/* ── Department options ── */
const DEPARTMENTS = [
  "Police Department",
  "NHA (National Highway Authority)",
  "Traffic Enforcement",
  "City Planning",
  "Emergency Services",
  "System Administration (ADMIN)",
];

/* ══════════════════════════════════════════
   Registration Form (Left Panel)
   ══════════════════════════════════════════ */
// Map UI department label → backend RBAC role
const DEPARTMENT_ROLE_MAP = {
  "Police Department":              "POLICE",
  "NHA (National Highway Authority)": "NHA",
  "Traffic Enforcement":            "POLICE",
  "City Planning":                  "NHA",
  "Emergency Services":             "POLICE",
  "System Administration (ADMIN)": "ADMIN",
};

const RegistrationForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName]               = useState("");
  const [email, setEmail]                     = useState("");
  const [badgeId, setBadgeId]                 = useState("");
  const [department, setDepartment]           = useState(DEPARTMENTS[0]);
  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError]                     = useState("");
  const [loading, setLoading]                 = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password) {
      setError("Full name, email, and password are required."); return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match."); return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters."); return;
    }

    const role = DEPARTMENT_ROLE_MAP[department] || "NHA";

    try {
      setLoading(true);
      await register({ name: fullName, email, password, role });
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full md:w-1/2 bg-white dark:bg-surface-container-low flex flex-col justify-center items-center px-[20px] md:px-[64px] py-[32px]">
      <div className="w-full max-w-[480px]">
        {/* Theme toggle */}
        <div className="flex justify-end mb-6">
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-muted hover:border-primary-container transition-all group"
            aria-label="Toggle Theme"
          >
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px] dark:hidden">dark_mode</span>
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[20px] hidden dark:block">light_mode</span>
            <span className="text-[12px] leading-[16px] font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">
              <span className="dark:hidden">Liquid Glass</span>
              <span className="hidden dark:inline">Professional</span>
            </span>
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-[8px] mb-[32px]">
          <div className="w-3 h-3 rounded-full bg-primary-container"></div>
          <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
          <div className="w-3 h-3 rounded-full bg-surface-variant"></div>
          <span className="ml-[8px] text-[12px] leading-[16px] font-medium text-on-surface-variant">Step 1: Account Details</span>
        </div>

        {/* Heading */}
        <div className="mb-[32px]">
          <h1 className="text-[32px] leading-[40px] font-bold text-surface-dim dark:text-on-surface mb-[8px]">Create an account</h1>
          <p className="text-[16px] leading-[24px] text-on-surface-variant">Register to the central management dashboard.</p>
        </div>

        {/* Form */}
        <form className="space-y-[16px]" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="space-y-[8px]">
            <label className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-surface-dim dark:text-on-surface">Full Name</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">person</span>
              <input className="w-full bg-surface-container border border-outline-muted rounded-lg py-3 pl-10 pr-4 text-on-surface focus:ring-2 focus:ring-primary-container focus:outline-none transition-all" placeholder="John Doe" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-[8px]">
            <label className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-surface-dim dark:text-on-surface">Email Address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">mail</span>
              <input className="w-full bg-surface-container border border-outline-muted rounded-lg py-3 pl-10 pr-4 text-on-surface focus:ring-2 focus:ring-primary-container focus:outline-none transition-all" placeholder="officer@citygov.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          {/* Badge ID & Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            <div className="space-y-[8px]">
              <label className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-surface-dim dark:text-on-surface">Badge/Officer ID</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">badge</span>
                <input className="w-full bg-surface-container border border-outline-muted rounded-lg py-3 pl-10 pr-4 text-on-surface focus:ring-2 focus:ring-primary-container focus:outline-none transition-all" placeholder="TF-2024-001" type="text" value={badgeId} onChange={(e) => setBadgeId(e.target.value)} />
              </div>
            </div>
            <div className="space-y-[8px]">
              <label className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-surface-dim dark:text-on-surface">Department</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">corporate_fare</span>
                <select className="w-full bg-surface-container border border-outline-muted rounded-lg py-3 pl-10 pr-4 text-on-surface focus:ring-2 focus:ring-primary-container focus:outline-none transition-all appearance-none" value={department} onChange={(e) => setDepartment(e.target.value)}>
                  {DEPARTMENTS.map((d) => (<option key={d}>{d}</option>))}
                </select>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-[8px]">
            <label className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-surface-dim dark:text-on-surface">Create Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">lock</span>
              <input className="w-full bg-surface-container border border-outline-muted rounded-lg py-3 pl-10 pr-4 text-on-surface focus:ring-2 focus:ring-primary-container focus:outline-none transition-all" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex gap-1 h-1.5 w-full mt-2">
              {[1, 2, 3, 4].map((level) => {
                const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 8 ? 2 : password.length < 12 ? 3 : 4;
                return (
                  <div
                    key={level}
                    className={`h-full flex-1 rounded-full transition-colors ${
                      level <= strength
                        ? strength === 1 ? "bg-error-red" : strength === 2 ? "bg-tertiary" : strength === 3 ? "bg-primary" : "bg-success-green"
                        : "bg-surface-variant"
                    }`}
                  ></div>
                );
              })}
            </div>
            <p className="text-[12px] leading-[16px] font-medium text-on-surface-variant mt-1">
              {password.length === 0 ? "Enter a password" : password.length < 6 ? "Weak: minimum 6 characters" : password.length < 8 ? "Fair: try adding numbers & symbols" : password.length < 12 ? "Good: strong password" : "Excellent: very strong password"}
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-[8px]">
            <label className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-surface-dim dark:text-on-surface">Confirm Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">lock_reset</span>
              <input className="w-full bg-surface-container border border-outline-muted rounded-lg py-3 pl-10 pr-4 text-on-surface focus:ring-2 focus:ring-primary-container focus:outline-none transition-all" placeholder="••••••••" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              {confirmPassword && confirmPassword === password && (
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-success-green">check_circle</span>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="w-full bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500 text-[18px]">error</span>
              <p className="text-[12px] font-medium text-red-500">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            className="w-full bg-primary-container hover:bg-inverse-primary text-white text-[14px] leading-[20px] tracking-[0.05em] font-semibold py-4 rounded-lg shadow-lg shadow-primary-container/20 transition-all transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-outline-muted"></div>
            <span className="flex-shrink mx-4 text-on-surface-variant text-[12px] font-medium">Or register with</span>
            <div className="flex-grow border-t border-outline-muted"></div>
          </div>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-[8px] border border-outline-muted bg-transparent hover:bg-surface-container py-3 rounded-lg text-on-surface transition-all" type="button">
            <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNz8TkkfU_6le777XdCsr6_hzsreY2EqtSRaodOv--l_tKS5R73EtzFQx8-9zxqf2wG5U7M4zXBMhpwsa-lucUI6MnTj9-phvS2v9TY5KfLM3NdIM0SvkRsLwo-4mdve3QhuXnGuG9ckSyFj77OGrhDmFzKhv-209gwAW4pPYRrxfRHtEhAZErOOcJy37LBGI8s4_HFTW9ndYSvJnEWtqiC5Hu2hpf5RtXS3yljDrrMMRW6Q-lRHB91_Zm6sqg2HdWHvpxRaloga8" />
            <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold">Register with Google</span>
          </button>
        </form>

        {/* Sign in link */}
        <p className="mt-[32px] text-center text-[16px] leading-[24px] text-on-surface-variant">
          Already have an account?{" "}
          <a className="text-primary-container font-bold hover:underline" href="/login">Sign in</a>
        </p>

        {/* JWT Info Box */}
        <div className="mt-[32px] p-[16px] bg-primary-container/10 border border-primary-container/20 rounded-xl flex gap-[8px]">
          <span className="material-symbols-outlined text-primary-container">info</span>
          <p className="text-[12px] font-medium text-primary-container/80 leading-relaxed">
            Security Notice: Accounts are protected with encrypted JWT (JSON Web Tokens) for stateless authentication. Sessions expire after 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════
   Branding Panel (Right Side)
   ══════════════════════════════════════════ */
const BrandingPanel = () => (
  <section className="hidden md:flex md:w-1/2 bg-surface-container-lowest relative overflow-hidden flex-col">
    {/* Background Decoration */}
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute top-20 left-20 w-3 h-3 bg-primary rounded-full pulse-green"></div>
      <div className="absolute top-40 right-40 w-3 h-3 bg-primary rounded-full pulse-green"></div>
      <div className="absolute bottom-60 left-1/2 w-3 h-3 bg-primary rounded-full pulse-green"></div>
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(59, 91, 219, 0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
    </div>

    {/* Top Logo */}
    <div className="p-[64px] flex justify-end w-full relative z-10">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-4xl text-white">traffic</span>
        <span className="text-[32px] leading-[40px] font-extrabold text-white tracking-tighter">TrafficFlow Ultra</span>
      </div>
    </div>

    {/* Content */}
    <div className="flex-grow flex flex-col justify-center px-[64px] relative z-10">
      <div className="max-w-xl">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container/20 border border-primary-container/30 text-primary-fixed text-[12px] leading-[16px] font-medium mb-[16px]">
          Institutional Command Center
        </span>
        <h2 className="text-[72px] leading-[80px] tracking-[-0.02em] font-extrabold text-white mb-[16px]">Join TrafficFlow Command</h2>
        <p className="text-[18px] leading-[28px] text-on-surface-variant mb-[120px] max-w-md">
          Start monitoring your city in minutes with our enterprise-grade infrastructure. Unified control for smarter urban mobility.
        </p>
        <div className="space-y-[32px]">
          {BRAND_FEATURES.map((f) => (
            <div key={f.icon} className="flex items-start gap-[16px] group">
              <div className="p-3 rounded-lg bg-surface-variant group-hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-white">{f.icon}</span>
              </div>
              <div>
                <h4 className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-white">{f.title}</h4>
                <p className="text-[12px] leading-[16px] font-medium text-on-surface-variant">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Dashboard Preview */}
    <div className="absolute bottom-0 right-0 p-[64px] transform translate-y-1/4 opacity-40 hover:opacity-100 transition-opacity duration-700">
      <div className="glass-card p-[32px] rounded-2xl w-[600px] h-[300px] flex items-center justify-center border-b-0 rounded-b-none">
        <img alt="Dashboard Preview" className="w-full h-full object-cover rounded-xl opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxsj8UGVzpVUw-yUyyvNhjBt7R-E3lZ2NSkcnALTwl2is4ljUgvtGSNxJTlqgQPcaaUPbZ647GYK1Fv0h1YiGzTqSELeyYQoafN6tcTrJeF7WqpIswoOcurCO99XVqKEnuTVb88B8gjqgf8cjcEh5pKdG1takKHy1lN_N53kGWENVTQzJJZQFBIzNLXSWaZSMR9FJT22r7D_7AdwQkGAzG_fs1wQdjk_wuTvQv_Vc6BszPOi4VZCXbvfV0T4UO-bTCLZeROZ7_1Lo" />
      </div>
    </div>
  </section>
);

/* ══════════════════════════════════════════
   Role Selection Overlay (Step 2)
   ══════════════════════════════════════════ */
const RoleOverlay = ({ visible, onComplete }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 bg-surface-dim/95 backdrop-blur-sm flex items-center justify-center px-[20px]">
      <div className="w-full max-w-[1280px] bg-surface-container border border-outline-muted rounded-3xl p-[32px] md:p-[120px] overflow-hidden relative">
        <div className="text-center mb-[32px]">
          <h3 className="text-[48px] leading-[56px] tracking-[-0.01em] font-bold text-white">Assign Your Mandate</h3>
          <p className="text-[18px] leading-[28px] text-on-surface-variant">Select the role that matches your departmental authorization level.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
          {ROLES.map((r) => (
            <div
              key={r.title}
              className={`glass-card p-[32px] rounded-2xl border-2 cursor-pointer transition-all ${
                r.selected
                  ? "border-primary-container bg-primary-container/10"
                  : "border-transparent hover:border-primary-container"
              }`}
            >
              {r.badge && (
                <div className="absolute top-4 right-4 bg-primary text-on-primary text-[12px] font-medium px-3 py-1 rounded-full">{r.badge}</div>
              )}
              <div className="w-16 h-16 rounded-2xl bg-primary-container/20 flex items-center justify-center mb-[16px]">
                <span className="material-symbols-outlined text-primary text-4xl">{r.icon}</span>
              </div>
              <h4 className="text-[32px] leading-[40px] font-bold text-white mb-[8px]">{r.title}</h4>
              <ul className="space-y-[8px] text-on-surface-variant text-[14px] leading-[20px] tracking-[0.05em] font-semibold">
                {r.perms.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">check</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-[120px] flex justify-center">
          <button
            className="bg-primary-container text-white px-[32px] py-[16px] rounded-lg text-[14px] leading-[20px] tracking-[0.05em] font-semibold hover:bg-inverse-primary transition-colors flex items-center gap-2"
            onClick={onComplete}
          >
            Complete Registration <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   Main Register Page
   ══════════════════════════════════════════ */
const Register = () => {
  const [showRoleOverlay, setShowRoleOverlay] = useState(false);

  return (
    <div className="bg-surface-dim text-on-surface min-h-screen">
      <main className="flex min-h-screen">
        <RegistrationForm />
        <BrandingPanel />
      </main>
      <RoleOverlay visible={showRoleOverlay} onComplete={() => setShowRoleOverlay(false)} />
    </div>
  );
};

export default Register;
