// ============================================================
// socket.js — Socket.io Server Setup
// SDA Concept: Singleton Pattern
//              Only ONE Socket.io instance exists for the entire app.
//              initSocket() creates it. getIO() retrieves it anywhere.
// ============================================================

const { Server } = require('socket.io');

let io; // The single instance

/**
 * Initializes the Socket.io server.
 * Called ONCE at startup in server.js.
 * @param {http.Server} httpServer - the raw Node http server
 * @returns {Server} the io instance
 */
const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`⚡ [Socket.io] Client connected   → ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`🔌 [Socket.io] Client disconnected → ${socket.id}`);
    });
  });

  return io;
};

/**
 * Returns the existing Socket.io instance.
 * Called in Services and EventBus to emit real-time events.
 * Throws if called before initSocket().
 */
const getIO = () => {
  if (!io) {
    throw new Error('[Socket.io] Not initialized. Call initSocket(httpServer) first.');
  }
  return io;
};

module.exports = { initSocket, getIO };
