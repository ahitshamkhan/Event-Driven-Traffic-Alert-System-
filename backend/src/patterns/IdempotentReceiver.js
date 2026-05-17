// ============================================================
// IdempotentReceiver.js — Task 4 (10 marks)
// SDA Concept: Idempotent Receiver Pattern + Decorator Pattern
//
// WHAT IS IDEMPOTENCY?
//   An operation is idempotent if running it MULTIPLE TIMES
//   produces the SAME result as running it ONCE.
//
// WHY DO WE NEED THIS?
//   In real traffic systems, the same camera signal can be
//   received multiple times due to:
//     - Network retries
//     - Camera hardware glitches
//     - Message queue redelivery
//   Without idempotency, one speeding car could get 3 fines
//   for the same violation. This class prevents that.
//
// HOW IT WORKS:
//   Before forwarding any event to the EventBus, IdempotentReceiver
//   checks if this eventId was already processed.
//   If YES → silently discard the duplicate.
//   If NO  → record it and forward to the EventBus.
//
// DECORATOR PATTERN:
//   IdempotentReceiver WRAPS the EventBus (does not modify it).
//   This follows the Open/Closed Principle — the EventBus is
//   closed for modification but open for extension via decoration.
// ============================================================

const eventBus = require('./EventBus');

class IdempotentReceiver {
  constructor() {
    /**
     * In-memory Set of processed eventIds.
     * Set provides O(1) lookup — extremely efficient.
     *
     * In production, this would be a Redis cache or DB query
     * to survive server restarts, but for this project the
     * in-memory Set is correct and testable.
     */
    this.processedIds = new Set();
  }

  /**
   * Receive an event, check for duplicates, and forward if new.
   *
   * @param {EventEnvelope} envelope - the event to process
   * @returns {Promise<boolean>} true if processed, false if duplicate
   */
  async receive(envelope) {
    // ── Duplicate Check ──────────────────────────────────
    if (this.processedIds.has(envelope.eventId)) {
      console.warn(
        `⚠️  [IdempotentReceiver] DUPLICATE detected — discarding: ${envelope.eventId}`
      );
      return false; // Signal: this was a duplicate, nothing was done
    }

    // ── Record and Forward ───────────────────────────────
    this.processedIds.add(envelope.eventId);
    console.log(
      `✅ [IdempotentReceiver] New event accepted → forwarding to EventBus: ${envelope.eventId}`
    );

    await eventBus.publish(envelope);
    return true; // Signal: this was processed successfully
  }

  /**
   * Check if a specific eventId has already been processed.
   * Used in tests to verify idempotency state.
   *
   * @param {string} eventId
   * @returns {boolean}
   */
  hasProcessed(eventId) {
    return this.processedIds.has(eventId);
  }

  /**
   * Clear all recorded IDs.
   * ONLY used in tests (beforeEach reset).
   * NEVER call this in production code.
   */
  reset() {
    this.processedIds.clear();
    console.log('[IdempotentReceiver] State reset (test mode)');
  }

  /**
   * Returns the count of unique events processed so far.
   * Useful for stats/reporting.
   */
  getProcessedCount() {
    return this.processedIds.size;
  }
}

// ── Singleton Export ─────────────────────────────────────
// Same instance shared everywhere. Ensures the processedIds
// Set is shared across the whole application lifecycle.
module.exports = new IdempotentReceiver();
