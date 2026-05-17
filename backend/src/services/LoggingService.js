// ============================================================
// LoggingService.js — Concrete Observer #1
// SDA Concept: Observer Pattern (implements IEventSubscriber)
//              Single Responsibility Principle — ONE job:
//              log every event that passes through the system.
//
// Subscribes to: ALL event types (wildcard via multiple calls)
// Purpose: Creates an audit trail of every event in the system.
//          Critical for debugging, compliance, and post-incident review.
// ============================================================

const IEventSubscriber = require('../patterns/IEventSubscriber');

class LoggingService extends IEventSubscriber {
  /**
   * Called by EventBus whenever a subscribed event is published.
   * @param {EventEnvelope} event
   */
  handle(event) {
    const line = '─'.repeat(55);
    console.log(`\n📝 [LoggingService] ${line}`);
    console.log(`   Event Type  : ${event.eventType}`);
    console.log(`   Event ID    : ${event.eventId}`);
    console.log(`   Source      : ${event.source}`);
    console.log(`   Timestamp   : ${event.timestamp}`);
    console.log(`   Version     : ${event.version}`);
    console.log(`   Correlation : ${event.correlationId || 'N/A'}`);
    console.log(`   Payload     :`, JSON.stringify(event.payload, null, 2));
    console.log(`📝 [LoggingService] ${line}\n`);
  }
}

// Export as singleton instance
module.exports = new LoggingService();
