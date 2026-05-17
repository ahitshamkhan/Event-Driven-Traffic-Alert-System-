// ============================================================
// VehicleDetectedEvent.js — Factory for VEHICLE_DETECTED events
// Creates a pre-configured EventEnvelope for vehicle detection.
// ============================================================
const EventEnvelope = require('../patterns/EventEnvelope');

/**
 * @param {string} vehicleNumber - e.g. "LHR-4456"
 * @param {number} speed         - detected speed in km/h
 * @param {string} source        - camera ID e.g. "CAMERA_01"
 * @param {string} [correlationId]
 */
const VehicleDetectedEvent = (vehicleNumber, speed, source, correlationId = null) => {
  return new EventEnvelope({
    eventType: 'VEHICLE_DETECTED',
    payload:   { vehicleNumber, speed },
    source,
    correlationId,
  });
};

module.exports = VehicleDetectedEvent;
