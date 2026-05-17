// ============================================================
// app.js — Express Application Factory
// SDA Concept: Separation of Concerns
//              Keeps Express config separate from server bootstrap.
//              This allows app to be imported in tests without
//              starting an actual HTTP server.
// ============================================================

const express = require('express');
const cors    = require('cors');

const app = express();

// ── Global Middleware ──────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());           // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ── Health Check Route ─────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '🚦 Traffic Alert System API is running',
    version: '1.0.0',
  });
});

// ── API Routes (will be added in Phase 5) ─────────────────
// app.use('/api/auth',    require('./routes/auth.routes'));
// app.use('/api/camera',  require('./routes/camera.routes'));
// app.use('/api/events',  require('./routes/events.routes'));
// app.use('/api/alerts',  require('./routes/alerts.routes'));

// ── Global Error Handler ───────────────────────────────────
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
