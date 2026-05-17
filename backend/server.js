// ============================================================
// server.js — Application Entry Point (Composition Root)
// SDA Concept: Composition Root
//              This is the ONLY place where everything is
//              wired together. No business logic here — only
//              bootstrap: load config → connect DB → start server.
// ============================================================

require('dotenv').config(); // Must be FIRST — loads .env before anything else

const http               = require('http');
const app                = require('./src/app');
const connectDB          = require('./src/config/db');
const { initSocket }     = require('./src/config/socket');

// ── Import EventBus + All Services ────────────────────────
const EventBus         = require('./src/patterns/EventBus');
const LoggingService   = require('./src/services/LoggingService');
const AlertService     = require('./src/services/AlertService');
const DashboardService = require('./src/services/DashboardService');
const ReportingService = require('./src/services/ReportingService');

/**
 * Wire all services to the EventBus.
 * SDA Concept: Composition Root — this is the ONE place
 * where all pub-sub relationships are declared.
 */
const subscribeServices = () => {
  const ALL = ['VEHICLE_DETECTED', 'SPEED_VIOLATION', 'CONGESTION_ALERT', 'TRAFFIC_CLEARED'];

  // All 4 services listen to every event type for logging/dashboard/reporting
  ALL.forEach((type) => {
    EventBus.subscribe(type, LoggingService);
    EventBus.subscribe(type, DashboardService);
    EventBus.subscribe(type, ReportingService);
  });

  // AlertService only listens to SPEED_VIOLATION to generate fines
  EventBus.subscribe('SPEED_VIOLATION', AlertService);

  console.log('✅ All services subscribed to EventBus');
};

const PORT = process.env.PORT || 5000;

// ── Bootstrap Sequence ─────────────────────────────────────
const startServer = async () => {
  // 1. Connect to MongoDB
  await connectDB();

  // 2. Wire all services to the EventBus (Composition Root)
  subscribeServices();

  // 3. Create raw HTTP server from Express app
  const httpServer = http.createServer(app);

  // 4. Attach Socket.io to the HTTP server (Singleton init)
  initSocket(httpServer);

  // 5. Start listening
  httpServer.listen(PORT, () => {
    console.log('');
    console.log('🚦 ===================================');
    console.log(`🚀  Server running on port ${PORT}`);
    console.log(`🌍  Environment: ${process.env.NODE_ENV}`);
    console.log(`📡  Socket.io: active`);
    console.log('🚦 ===================================');
    console.log('');
  });
};

startServer();
