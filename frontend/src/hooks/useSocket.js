import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL || "http://localhost:5000";

/**
 * useSocket — creates and manages a Socket.io connection.
 *
 * Usage:
 *   const { on, off, emit } = useSocket();
 *
 * @param {string|null} token - JWT token to authenticate the socket connection
 */
const useSocket = (token = null) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Create socket connection with optional auth token
    socketRef.current = io(SOCKET_URL, {
      auth: token ? { token } : {},
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    const socket = socketRef.current;

    socket.on("connect", () => {
      console.log("[Socket] Connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.warn("[Socket] Disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.error("[Socket] Connection error:", err.message);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      console.log("[Socket] Cleaned up");
    };
  }, [token]);

  /**
   * Subscribe to a socket event
   * @param {string} event
   * @param {Function} handler
   */
  const on = useCallback((event, handler) => {
    if (socketRef.current) {
      socketRef.current.on(event, handler);
    }
  }, []);

  /**
   * Unsubscribe from a socket event
   * @param {string} event
   * @param {Function} handler
   */
  const off = useCallback((event, handler) => {
    if (socketRef.current) {
      socketRef.current.off(event, handler);
    }
  }, []);

  /**
   * Emit an event to the server
   * @param {string} event
   * @param {*} data
   */
  const emit = useCallback((event, data) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  }, []);

  return { on, off, emit };
};

export default useSocket;
