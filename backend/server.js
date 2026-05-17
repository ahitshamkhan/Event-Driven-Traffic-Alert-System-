// ============================================================
// server.js — Application Entry Point (Composition Root)
// SDA Concept: Composition Root
//              This is the ONLY place where everything is
//              wired together. No business logic here — only
//              bootstrap: load config → connect DB → start server.
// ============================================================

require('dotenv').config(); // Must be FIRST — loads .env before anything else

const http        = require('http');
const app         = require('./src/app');
const connectDB   = require('./src/config/db');
const { initSocket } = require('./src/config/socket');

const PORT = process.env.PORT || 5000;

// ── Bootstrap Sequence ─────────────────────────────────────
const startServer = async () => {
  // 1. Connect to MongoDB
  await connectDB();

  // 2. Create raw HTTP server from Express app
  const httpServer = http.createServer(app);

  // 3. Attach Socket.io to the HTTP server (Singleton init)
  initSocket(httpServer);

  // 4. Start listening
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
