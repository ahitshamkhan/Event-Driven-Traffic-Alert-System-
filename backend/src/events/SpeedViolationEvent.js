// ============================================================
// SpeedViolationEvent.js — Factory for SPEED_VIOLATION events
// Creates a pre-configured EventEnvelope for speed violations.
// This is the event that triggers AlertService to generate a fine.
// ============================================================
const EventEnvelope = require('../patterns/EventEnvelope');

/**
 * @param {string} vehicleNumber - e.g. "LHR-4456"
 * @param {number} speed         - detected speed in km/h
 * @param {number} limit         - legal speed limit in km/h
 * @param {string} location      - human-readable location
 * @param {string} source        - camera ID
 * @param {string} [correlationId]
 */
const SpeedViolationEvent = (vehicleNumber, speed, limit, location, source, correlationId = null) => {
  return new EventEnvelope({
    eventType: 'SPEED_VIOLATION',
    payload:   { vehicleNumber, speed, limit, location },
    source,
    correlationId,
  });
};

module.exports = SpeedViolationEvent;
