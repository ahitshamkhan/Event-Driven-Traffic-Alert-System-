import React, { useState } from "react";

/* ── Sub-components ── */
const Navbar = () => (
  <header className="fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300">
    <nav className="flex justify-between items-center px-[64px] py-[16px] max-w-[1280px] mx-auto">
      <div className="flex items-center gap-2 font-extrabold text-[32px] leading-[40px] text-on-surface">
        <span className="material-symbols-outlined text-primary text-4xl">traffic</span>
        <span>TrafficFlow</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a className="text-primary font-bold border-b-2 border-primary pb-1 text-[14px] tracking-[0.05em]" href="#home">Home</a>
        <a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-[14px] tracking-[0.05em]" href="#features">Features</a>
        <a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-[14px] tracking-[0.05em]" href="#about">About</a>
        <a className="text-on-surface-variant font-medium hover:text-primary transition-colors text-[14px] tracking-[0.05em]" href="#contact">Contact</a>
      </div>
      <div className="flex items-center gap-4">
        <a className="px-6 py-2 border-2 border-primary text-primary rounded-lg text-[14px] tracking-[0.05em] font-semibold hover:bg-primary/10 transition-colors" href="/login">Login</a>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none" aria-label="Toggle theme">
          <span className="material-symbols-outlined text-2xl">light_mode</span>
        </button>
        <a className="px-6 py-2 bg-primary-container text-on-primary-container rounded-lg text-[14px] tracking-[0.05em] font-semibold hover:brightness-110 active:scale-95 transition-all" href="/register">Get Started</a>
      </div>
    </nav>
  </header>
);

const HeroSection = () => (
  <section className="relative min-h-screen pt-32 pb-16 hero-gradient overflow-hidden flex flex-col items-center" id="home">
    <div className="max-w-[1280px] px-[64px] text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant mb-[32px]">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 pulse-green"></span>
        <span className="text-[12px] leading-[16px] font-medium text-on-surface-variant">Live System Active</span>
      </div>
      <h1 className="text-[72px] leading-[80px] tracking-[-0.02em] font-extrabold text-on-surface mb-[16px] max-w-4xl mx-auto">
        Smart Traffic Monitoring for Modern Cities
      </h1>
      <p className="text-[18px] leading-[28px] text-on-surface-variant mb-12 max-w-2xl mx-auto">
        Real-time event-driven alerts, predictive analytics, and automated incident response powered by distributed observer architecture.
      </p>
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        <a className="px-8 py-4 bg-primary text-on-primary rounded-xl text-[14px] tracking-[0.05em] font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform" href="/dashboard">View Live Dashboard</a>
        <a className="px-8 py-4 border-2 border-outline text-on-surface rounded-xl text-[14px] tracking-[0.05em] font-bold hover:bg-white/5 transition-colors" href="#about">Learn How It Works</a>
      </div>
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-24 opacity-70">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">account_tree</span>
          <span className="text-[12px] leading-[16px] font-medium">Observer Pattern Architecture</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">sync_saved_locally</span>
          <span className="text-[12px] leading-[16px] font-medium">Idempotent Event Processing</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">bolt</span>
          <span className="text-[12px] leading-[16px] font-medium">Real-time Socket.io Updates</span>
        </div>
      </div>
      <div className="relative w-full max-w-5xl mx-auto mt-12 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group">
        <img alt="TrafficFlow Dashboard Interface" className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC24tw6Fti-iuJ7vSrTF0q9-LeSPg9gmxdUFYEFri7oijDbArTA5gnQVDeWarhZhQDts8pSQLT2Q_bKUo-6cfbvFIgsdJHza5o2fDQms_c1CV8EahEudjWfw1V6eE0YEIySINe5uNenkWBsasx5Uvlz_qTYiFVLqqHW3JTqQPFVJ_fH8gs5JhIBVvVWCEIhPiH5nwZq223mrdfQr10L3RRtwR_hgqIqmoabTm_fWsEpvM3L-ZLtQO2HYZdGTr9j_L_XxZ9xF9VUV2c" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
      </div>
    </div>
  </section>
);

const StatsBar = () => (
  <section className="bg-surface-container-low py-12 border-y border-outline-variant/30">
    <div className="max-w-[1280px] mx-auto px-[64px] grid grid-cols-2 md:grid-cols-4 gap-[24px] text-center">
      {[
        { value: "12", label: "Active Cameras", color: "text-primary" },
        { value: "1,247", label: "Daily Events", color: "text-secondary" },
        { value: "89", label: "Violations Flagged", color: "text-error" },
        { value: "14", label: "Duplicates Filtered", color: "text-tertiary" },
      ].map((s) => (
        <div key={s.label} className="flex flex-col gap-1">
          <span className={`text-4xl ${s.color} font-extrabold`}>{s.value}</span>
          <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase">{s.label}</span>
        </div>
      ))}
    </div>
  </section>
);

const FEATURES = [
  { icon: "hub", title: "Event Bus", desc: "Centralized message broker handles thousands of concurrent data points from municipal sensors without dropping packets.", iconBg: "bg-secondary-container/10", iconText: "text-on-secondary-fixed-variant", hoverBg: "group-hover:bg-secondary-container" },
  { icon: "visibility", title: "Observer Pattern", desc: "Dynamic subscription model allows services to react to specific events like speed violations or gridlock in real-time.", iconBg: "bg-primary-container/10", iconText: "text-on-primary-fixed-variant", hoverBg: "group-hover:bg-primary-container" },
  { icon: "verified", title: "Idempotent Processing", desc: "Advanced deduplication logic ensures that every traffic event is processed exactly once, maintaining database accuracy.", iconBg: "bg-green-100", iconText: "text-green-700", hoverBg: "group-hover:bg-green-600" },
  { icon: "mail", title: "Event Envelope", desc: "Standardized metadata for every packet including timestamps, source IDs, and encrypted payload signatures.", iconBg: "bg-orange-100", iconText: "text-orange-700", hoverBg: "group-hover:bg-orange-600" },
  { icon: "dashboard", title: "Real-time Dashboard", desc: "Ultra-low latency visual reporting for emergency services and city planners via persistent web socket connections.", iconBg: "bg-blue-100", iconText: "text-blue-700", hoverBg: "group-hover:bg-blue-600" },
  { icon: "schema", title: "Schema Versioning", desc: "Future-proof event definitions allowing seamless system upgrades without downtime or data loss.", iconBg: "bg-purple-100", iconText: "text-purple-700", hoverBg: "group-hover:bg-purple-600" },
];

const FeaturesSection = () => (
  <section className="bg-white py-[120px]" id="features">
    <div className="max-w-[1280px] mx-auto px-[64px]">
      <div className="text-center mb-20">
        <h2 className="text-[48px] leading-[56px] tracking-[-0.01em] font-bold text-slate-900 mb-[16px]">Everything You Need to Monitor City Traffic</h2>
        <p className="text-[18px] leading-[28px] text-slate-600 max-w-2xl mx-auto">Built on enterprise-grade architecture to ensure 100% data integrity and millisecond latency for urban safety.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
        {FEATURES.map((f) => (
          <div key={f.title} className="p-8 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className={`w-12 h-12 rounded-lg ${f.iconBg} ${f.iconText} flex items-center justify-center mb-6 ${f.hoverBg} group-hover:text-white transition-colors`}>
              <span className="material-symbols-outlined text-3xl">{f.icon}</span>
            </div>
            <h3 className="text-2xl text-slate-900 mb-3 font-bold">{f.title}</h3>
            <p className="text-[16px] leading-[24px] text-slate-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const STEPS = [
  { icon: "videocam", title: "Camera Detects", desc: "Edge devices capture raw traffic metadata in milliseconds.", bg: "bg-primary-container text-on-primary-container" },
  { icon: "publish", title: "Event Published", desc: "Metadata is wrapped in an event envelope and sent to the bus.", bg: "bg-secondary-container text-on-secondary-container" },
  { icon: "router", title: "Bus Delivers", desc: "The event bus routes data to all active observers and subscribers.", bg: "bg-tertiary-container text-on-tertiary-container" },
  { icon: "ads_click", title: "Services React", desc: "Dashboards update and automated notifications are triggered.", bg: "bg-green-600 text-white" },
];

const Arrow = () => (
  <div className="hidden lg:block w-12 h-1 bg-slate-200 relative top-[-30px]">
    <div className="absolute right-[-4px] top-[-6px] border-y-[8px] border-y-transparent border-l-[12px] border-l-slate-200"></div>
  </div>
);

const HowItWorks = () => (
  <section className="bg-slate-50 py-[120px]" id="about">
    <div className="max-w-[1280px] mx-auto px-[64px]">
      <div className="text-center mb-20">
        <h2 className="text-[48px] leading-[56px] tracking-[-0.01em] font-bold text-slate-900 mb-[16px]">How the System Works</h2>
        <p className="text-[18px] leading-[28px] text-slate-600 max-w-2xl mx-auto">A seamless lifecycle for every byte of traffic data from street to screen.</p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.title}>
            <div className="flex-1 text-center group">
              <div className={`w-20 h-20 ${s.bg} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl relative z-10`}>
                <span className="material-symbols-outlined text-4xl">{s.icon}</span>
              </div>
              <h4 className="text-lg text-slate-900 mb-2 font-semibold">{s.title}</h4>
              <p className="text-slate-500 text-sm">{s.desc}</p>
            </div>
            {i < STEPS.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-16 p-6 rounded-xl bg-white border border-slate-200 flex items-start gap-4 max-w-3xl mx-auto">
        <span className="material-symbols-outlined text-primary">info</span>
        <div>
          <p className="text-slate-700 font-medium">Idempotent Receiver Enforcement</p>
          <p className="text-slate-500 text-sm mt-1">Our architecture uses unique event IDs to prevent duplicate actions, ensuring system stability even during network retries or sensor glitches.</p>
        </div>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-[120px] bg-surface-container-lowest relative overflow-hidden" id="contact">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b5bdb_1px,transparent_1px)] [background-size:32px_32px]"></div>
    </div>
    <div className="max-w-[1280px] mx-auto px-[64px] text-center relative z-10">
      <h2 className="text-5xl text-on-surface mb-[16px] font-extrabold">Ready to Monitor Your City?</h2>
      <p className="text-[18px] leading-[28px] text-on-surface-variant mb-12 max-w-2xl mx-auto">Join the future of urban infrastructure management with TrafficFlow's event-driven insights.</p>
      <div className="flex justify-center">
        <a className="px-10 py-5 bg-primary text-on-primary rounded-xl text-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40" href="/dashboard">Access the Dashboard</a>
      </div>
    </div>
  </section>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  return (
    <footer className="bg-surface-dim border-t border-outline-variant py-[120px]">
      <div className="max-w-[1280px] mx-auto px-[64px] grid grid-cols-1 md:grid-cols-12 gap-[24px]">
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="text-[32px] leading-[40px] font-bold text-on-surface">TrafficFlow</div>
          <p className="text-[16px] leading-[24px] text-on-surface-variant pr-8">The leading platform for high-precision, real-time traffic event monitoring and urban logistics orchestration.</p>
          <div className="flex flex-wrap gap-3">
            {["React", "Node.js", "MongoDB", "Socket.io"].map((t) => (
              <span key={t} className="px-3 py-1 rounded bg-surface-container-highest text-[12px] leading-[16px] font-medium text-on-surface-variant">{t}</span>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col gap-4">
          <h5 className="text-on-surface font-bold text-[14px] tracking-[0.05em]">Company</h5>
          {[["Home","#home"],["Features","#features"],["About","#about"],["Contact","#contact"]].map(([l,h])=>(
            <a key={l} className="text-on-surface-variant text-[12px] font-medium hover:text-primary transition-colors" href={h}>{l}</a>
          ))}
        </div>
        <div className="md:col-span-2 flex flex-col gap-4">
          <h5 className="text-on-surface font-bold text-[14px] tracking-[0.05em]">Legal</h5>
          <a className="text-on-surface-variant text-[12px] font-medium hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant text-[12px] font-medium hover:text-primary transition-colors" href="#">Terms of Service</a>
        </div>
        <div className="md:col-span-4 flex flex-col gap-4">
          <h5 className="text-on-surface font-bold text-[14px] tracking-[0.05em]">Stay Updated</h5>
          <p className="text-on-surface-variant text-[12px] font-medium mb-2">Get the latest engineering updates from our traffic labs.</p>
          <div className="flex">
            <input className="bg-surface-container rounded-l-lg border-outline-variant text-on-surface w-full focus:ring-primary focus:border-primary" placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button className="bg-primary text-on-primary px-4 rounded-r-lg font-bold hover:brightness-110">Join</button>
          </div>
        </div>
        <div className="md:col-span-12 border-t border-outline-variant pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-[12px] font-medium">© 2024 TrafficFlow Engineering. All rights reserved.</p>
          <div className="flex gap-6">
            {["public","code","hub"].map((ic)=>(
              <a key={ic} className="text-on-surface-variant hover:text-primary" href="#"><span className="material-symbols-outlined">{ic}</span></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ── Main Home Page ── */
const Home = () => (
  <div className="bg-background text-on-background selection:bg-primary selection:text-on-primary">
    <Navbar />
    <main>
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Home;
