import API from "./api";

/**
 * Fetch all events (paginated)
 * @param {Object} params - { page, limit, type, severity }
 */
export const getEvents = async (params = {}) => {
  const response = await API.get("/events", { params });
  return response.data;
};

/**
 * Fetch a single event by ID
 * @param {string} id
 */
export const getEventById = async (id) => {
  const response = await API.get(`/events/${id}`);
  return response.data;
};

/**
 * Publish a new event from a camera
 * @param {Object} eventData - { cameraId, type, licensePlate, speed, severity, vehicleCount, location }
 */
export const publishEvent = async (eventData) => {
  const response = await API.post("/events", eventData);
  return response.data;
};

/**
 * Fetch all alerts (paginated)
 * @param {Object} params - { page, limit, status }
 */
export const getAlerts = async (params = {}) => {
  const response = await API.get("/alerts", { params });
  return response.data;
};

/**
 * Fetch a single alert by ID
 * @param {string} id
 */
export const getAlertById = async (id) => {
  const response = await API.get(`/alerts/${id}`);
  return response.data;
};

/**
 * Update alert status (e.g. mark as resolved)
 * @param {string} id
 * @param {string} status - "Issued" | "Pending" | "Resolved"
 */
export const updateAlertStatus = async (id, status) => {
  const response = await API.patch(`/alerts/${id}`, { status });
  return response.data;
};

/**
 * Fetch dashboard summary stats
 */
export const getDashboardStats = async () => {
  const response = await API.get("/dashboard/stats");
  return response.data;
};

/**
 * Fetch all cameras and their status
 */
export const getCameras = async () => {
  const response = await API.get("/cameras");
  return response.data;
};
