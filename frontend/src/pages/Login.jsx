import React, { useState } from "react";

/* ── Feature checklist items ── */
const FEATURES = [
  "Real-time event monitoring",
  "Instant violation alerts",
  "Duplicate-proof processing",
];

/* ══════════════════════════════════════════
   Left Branding Panel
   ══════════════════════════════════════════ */
const BrandingPanel = () => (
  <section className="hidden md:flex md:w-1/2 relative flex-col justify-between p-[64px] bg-[#0F172A] overflow-hidden">
    {/* Background Gradient */}
    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary-container/20 to-transparent pointer-events-none"></div>

    {/* Logo */}
    <div className="relative z-10 flex items-center gap-2">
      <span className="material-symbols-outlined text-primary text-[32px]">traffic</span>
      <span className="text-[32px] leading-[40px] font-extrabold text-white tracking-tighter">TrafficFlow Ultra</span>
    </div>

    {/* Center Content */}
    <div className="relative z-10 max-w-lg">
      <h1 className="text-[72px] leading-[80px] tracking-[-0.02em] font-extrabold text-white mb-[16px]">Welcome Back, Officer</h1>
      <p className="text-[18px] leading-[28px] text-on-surface-variant mb-[32px]">
        Monitor your city's traffic in real-time with enterprise-grade precision and predictive analytics.
      </p>
      <ul className="space-y-[16px]">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-center gap-[16px]">
            <div className="w-8 h-8 rounded-full bg-success-green/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-success-green text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface">{f}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Bottom Stats Card */}
    <div className="relative z-10 glass-card p-[32px] rounded-xl flex justify-between items-center max-w-md">
      <div>
        <p className="text-[12px] leading-[16px] font-medium text-on-surface-variant uppercase tracking-widest mb-1">Live Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-success-green pulse-green"></div>
          <span className="text-[16px] leading-[24px] text-white font-semibold">12/12 Cameras Online</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[12px] leading-[16px] font-medium text-on-surface-variant uppercase tracking-widest mb-1">Events Today</p>
        <span className="text-[32px] leading-[40px] font-bold text-primary tracking-tight">1,247</span>
      </div>
    </div>

    {/* Abstract Visual Element */}
    <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-64 h-96 opacity-10">
      <img
        className="w-full h-full object-cover rounded-3xl grayscale"
        alt="Smart city grid"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiO6IGlL2LNzOXKRH_VkzU-PgdJYOcNUDZuCv9NyqetzT0Zt_rwGMP2wiEz9xcN7Pc9uKCMO6tIIN4Q6paJoxT2xvEnzyhXklsKEuICYOO_UiU5XWg1HGtYDgeIbhas04RBLsSQWyLuNPdhrbo6LAO7FxcqsfXnRB6TegBUit3PE4zc1ow5bEJSX7qMcXZmojjPL2OcJbBLXsvAYQABNGZuyHDz6ki9-iWlKmiGS7UTjyuJCJ17tlWLQHkD5awYOJoDxs4Dok62jo"
      />
    </div>
  </section>
);

/* ══════════════════════════════════════════
   Right Login Form
   ══════════════════════════════════════════ */
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend auth
  };

  return (
    <section className="w-full md:w-1/2 bg-white flex items-center justify-center p-[20px] md:p-[64px]">
      <div className="w-full max-w-[420px] flex flex-col items-center">
        {/* Form Header */}
        <div className="w-full text-center mb-[32px]">
          <div className="flex justify-center mb-[16px]">
            <span className="material-symbols-outlined text-surface-dim text-[48px]">traffic</span>
          </div>
          <h2 className="text-[32px] leading-[40px] font-bold text-surface-dim mb-2">Sign in to your account</h2>
          <p className="text-[16px] leading-[24px] text-outline">Enter your credentials to access the command center</p>
        </div>

        {/* Info Box */}
        <div className="w-full bg-primary-container/10 border border-primary-container/20 rounded-lg p-[16px] mb-[32px] flex gap-3">
          <span className="material-symbols-outlined text-primary-container text-[20px]">info</span>
          <p className="text-[12px] leading-[16px] font-medium text-primary-container">
            Your session is secured with JWT tokens. Tokens expire after 24 hours for security.
          </p>
        </div>

        {/* Form */}
        <form className="w-full space-y-[16px]" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-surface-dim mb-2" htmlFor="login-email">Email address</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
              <input
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-[16px] leading-[24px] text-surface-dim transition-all"
                id="login-email"
                name="email"
                placeholder="officer@trafficflow.gov"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-surface-dim mb-2" htmlFor="login-password">Password</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
              <input
                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-[16px] leading-[24px] text-surface-dim transition-all"
                id="login-password"
                name="password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-surface-dim" type="button" onClick={() => setShowPassword(!showPassword)}>
                <span className="material-symbols-outlined text-[20px]">{showPassword ? "visibility_off" : "visibility"}</span>
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between py-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <span className="text-[12px] leading-[16px] font-medium text-outline">Remember me</span>
            </label>
            <a className="text-[12px] leading-[16px] font-medium text-primary-container hover:underline" href="#">Forgot password?</a>
          </div>

          {/* Submit */}
          <button className="w-full bg-primary-container text-white text-[14px] leading-[20px] tracking-[0.05em] font-semibold py-3.5 rounded-lg shadow-lg shadow-primary-container/20 hover:bg-inverse-primary transition-all active:scale-[0.98]" type="submit">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center gap-[16px] my-[32px]">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-[12px] leading-[16px] font-medium text-outline uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Google OAuth */}
        <button className="w-full flex items-center justify-center gap-3 border-2 border-slate-100 py-3 rounded-lg text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-surface-dim hover:bg-slate-50 transition-all">
          <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPM8SEorDjVAJ-uiaGN8KvprjNw3wBq8JtdoVVSWcFHjKCirTKjqXDnijxB9Pi-c3wmug32bbugGOknJB1Sj5SVkhIux3m75dUKWr-fTBE4FL66a2ng7gv6tFV6HpUWFDDccxU99AKNVld9x2gK-E1ZeG-yHI6xHEpn9pVTnXA0hV-uq3OyExfwDxukveAzYH69-21-8x32MXwXBm5B5CtshUBMElUY5NSljlESlTlyEOQA8gqGGL5o_pdm1gMth9e28xsTMBzePo" />
          Sign in with Google
        </button>

        {/* Footer Links */}
        <div className="mt-[32px] text-center">
          <p className="text-[16px] leading-[24px] text-outline">
            Don't have an account?{" "}
            <a className="text-primary-container font-semibold hover:underline" href="/register">Register here</a>
          </p>
          <div className="mt-[32px] flex items-center justify-center gap-2 opacity-50">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span className="text-[12px] leading-[16px] font-medium text-outline uppercase tracking-tight">Protected by JWT Authentication</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════
   Page Footer
   ══════════════════════════════════════════ */
const LoginFooter = () => (
  <footer className="bg-surface-container-lowest border-t border-outline-muted flex flex-col md:flex-row justify-between items-center w-full px-[20px] md:px-[64px] py-[32px] gap-[16px]">
    <div className="text-[14px] leading-[20px] tracking-[0.05em] font-bold text-on-surface">TrafficFlow Ultra</div>
    <div className="flex flex-wrap justify-center gap-[16px]">
      {["Security Policy", "Privacy", "System Status", "API Documentation"].map((link) => (
        <a key={link} className="text-[12px] leading-[16px] font-medium text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">{link}</a>
      ))}
    </div>
    <div className="text-[16px] leading-[24px] text-on-surface-variant">© 2024 TrafficFlow Ultra. Enterprise Smart City Infrastructure.</div>
  </footer>
);

/* ══════════════════════════════════════════
   Main Login Page
   ══════════════════════════════════════════ */
const Login = () => (
  <div className="bg-surface-dim text-on-surface selection:bg-primary selection:text-on-primary">
    <main className="min-h-screen flex flex-col md:flex-row">
      <BrandingPanel />
      <LoginForm />
    </main>
    <LoginFooter />
  </div>
);

export default Login;
