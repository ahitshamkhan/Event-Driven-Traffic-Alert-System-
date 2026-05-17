// ============================================================
// CongestionAlertEvent.js — Factory for CONGESTION_ALERT events
// Creates a pre-configured EventEnvelope for traffic congestion.
// ============================================================
const EventEnvelope = require('../patterns/EventEnvelope');

/**
 * @param {number} congestionLevel - percentage 0-100
 * @param {string} affectedLane    - e.g. "Lane A", "All Lanes"
 * @param {string} source          - camera ID
 * @param {string} [correlationId]
 */
const CongestionAlertEvent = (congestionLevel, affectedLane, source, correlationId = null) => {
  return new EventEnvelope({
    eventType: 'CONGESTION_ALERT',
    payload:   { congestionLevel, affectedLane },
    source,
    correlationId,
  });
};

module.exports = CongestionAlertEvent;
