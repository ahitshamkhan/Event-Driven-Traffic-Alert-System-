'use strict';
// ============================================================
// EventEnvelope.js — Task 3 (5 marks)
// SDA Concept: Value Object Pattern
//              An immutable, self-validating data container that
//              standardizes EVERY event published in the system.
//              No raw event can be published without being wrapped
//              in this envelope first.
//
// The 7 Mandatory Fields:
//   1. eventId       → Unique UUID (for idempotency)
//   2. eventType     → What happened (SPEED_VIOLATION, etc.)
//   3. payload       → The actual event data
//   4. source        → Who generated it (CAMERA_01, etc.)
//   5. timestamp     → When it happened
//   6. version       → Schema version for future migrations
//   7. correlationId → Trace ID to link related events
// ============================================================

const { v4: uuidv4 } = require('uuid');

class EventEnvelope {
  /**
   * @param {object} params
   * @param {string} params.eventType     - e.g. 'SPEED_VIOLATION'
   * @param {object} params.payload       - event-specific data
   * @param {string} params.source        - camera or system that fired event
   * @param {string} [params.correlationId] - optional trace ID
   * @param {number} [params.version]     - defaults to 1
   */
  constructor({ eventType, payload, source, correlationId = null, version = 1 }) {
    // ── Self-Validation ──────────────────────────────────
    // Value Objects validate themselves — no controller needed
    if (!eventType) throw new Error('[EventEnvelope] eventType is required');
    if (!payload)   throw new Error('[EventEnvelope] payload is required');
    if (!source)    throw new Error('[EventEnvelope] source is required');

    // ── The 7 Fields ──────────────────────────────────────
    this.eventId       = uuidv4();    // Field 1 — auto-generated unique ID
    this.eventType     = eventType;   // Field 2
    this.payload       = payload;     // Field 3
    this.source        = source;      // Field 4
    this.timestamp     = new Date();  // Field 5 — exact creation time
    this.version       = version;     // Field 6
    this.correlationId = correlationId; // Field 7

    // ── Immutability ─────────────────────────────────────
    // Value Objects must NOT change after creation.
    // Object.freeze() prevents any property modifications.
    Object.freeze(this);
  }
}

module.exports = EventEnvelope;
