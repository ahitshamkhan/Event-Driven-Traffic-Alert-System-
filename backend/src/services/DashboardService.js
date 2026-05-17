// ============================================================
// DashboardService.js — Concrete Observer #3
// SDA Concept: Observer Pattern (implements IEventSubscriber)
//
// Subscribes to: ALL event types
// Purpose: Pushes real-time activity updates to the frontend
//          Dashboard via Socket.io so the live map and activity
//          feed update instantly without polling.
// ============================================================

const IEventSubscriber = require('../patterns/IEventSubscriber');
const { getIO }        = require('../config/socket');

class DashboardService extends IEventSubscriber {
  /**
   * Called by EventBus for every event.
   * Emits a lightweight update to the dashboard (not the full payload).
   * @param {EventEnvelope} event
   */
  async handle(event) {
    console.log(`\n📊 [DashboardService] Pushing update for: ${event.eventType}`);

    try {
      getIO().emit('DASHBOARD_UPDATE', {
        eventType:  event.eventType,
        source:     event.source,
        timestamp:  event.timestamp,
        // Send minimal data to dashboard — frontend decides how to display
        summary: _buildSummary(event),
      });
      console.log(`   📡 Dashboard update sent`);
    } catch (err) {
      console.warn(`   ⚠️  Dashboard broadcast skipped: ${err.message}`);
    }
  }
}

/**
 * Helper: Build a human-readable summary string for each event type.
 * @param {EventEnvelope} event
 * @returns {string}
 */
function _buildSummary(event) {
  const { payload } = event;
  switch (event.eventType) {
    case 'VEHICLE_DETECTED':
      return `Vehicle ${payload.vehicleNumber} detected at ${event.source}`;
    case 'SPEED_VIOLATION':
      return `${payload.vehicleNumber} exceeded speed limit (${payload.speed}/${payload.limit} km/h)`;
    case 'CONGESTION_ALERT':
      return `Congestion level ${payload.congestionLevel}% at ${event.source}`;
    case 'TRAFFIC_CLEARED':
      return `Traffic cleared at ${event.source}`;
    default:
      return `Event: ${event.eventType} from ${event.source}`;
  }
}

module.exports = new DashboardService();
