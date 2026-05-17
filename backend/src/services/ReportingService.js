// ============================================================
// ReportingService.js — Concrete Observer #4
// SDA Concept: Observer Pattern (implements IEventSubscriber)
//              Aggregator Pattern — collects and summarizes
//              raw events into statistical reports.
//
// Subscribes to: ALL event types
// Purpose: Maintains in-memory counters for each event type.
//          The /api/events/stats route reads from this service
//          to power the Dashboard charts without hitting MongoDB.
// ============================================================

const IEventSubscriber = require('../patterns/IEventSubscriber');

class ReportingService extends IEventSubscriber {
  constructor() {
    super();

    // ── In-Memory Aggregation Store ───────────────────
    // Structure: { eventType: count }
    // e.g. { SPEED_VIOLATION: 45, VEHICLE_DETECTED: 200 }
    this.stats = {
      VEHICLE_DETECTED: 0,
      SPEED_VIOLATION:  0,
      CONGESTION_ALERT: 0,
      TRAFFIC_CLEARED:  0,
    };

    // Total events processed since server start
    this.totalProcessed = 0;
  }

  /**
   * Called by EventBus for every event.
   * Increments the counter for this event type.
   * @param {EventEnvelope} event
   */
  handle(event) {
    const type = event.eventType;

    // Increment specific counter
    if (this.stats.hasOwnProperty(type)) {
      this.stats[type]++;
    } else {
      this.stats[type] = 1; // Handle any unexpected event types
    }

    this.totalProcessed++;

    console.log(
      `📈 [ReportingService] Stats updated | ${type}: ${this.stats[type]} | Total: ${this.totalProcessed}`
    );
  }

  /**
   * Returns current aggregated stats.
   * Called by the /api/events/stats controller.
   * @returns {object}
   */
  getStats() {
    return {
      ...this.stats,
      totalProcessed: this.totalProcessed,
    };
  }

  /**
   * Reset stats — only for testing purposes.
   */
  resetStats() {
    Object.keys(this.stats).forEach((key) => (this.stats[key] = 0));
    this.totalProcessed = 0;
  }
}

module.exports = new ReportingService();
