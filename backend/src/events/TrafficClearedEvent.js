// ============================================================
// TrafficClearedEvent.js — Factory for TRAFFIC_CLEARED events
// Signals that a previously congested area is now clear.
// ============================================================
const EventEnvelope = require('../patterns/EventEnvelope');

/**
 * @param {number} clearedLanes - number of lanes now clear
 * @param {string} source       - camera ID
 * @param {string} [correlationId] - link back to original CONGESTION_ALERT
 */
const TrafficClearedEvent = (clearedLanes, source, correlationId = null) => {
  return new EventEnvelope({
    eventType: 'TRAFFIC_CLEARED',
    payload:   { clearedLanes, message: `${clearedLanes} lane(s) now clear` },
    source,
    correlationId,
  });
};

module.exports = TrafficClearedEvent;
