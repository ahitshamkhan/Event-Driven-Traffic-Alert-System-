// ============================================================
// Event.model.js — Traffic Event Schema (All 7 Envelope Fields)
// SDA Concept: Data Modeling + Value Object persistence
//              This schema is the database mirror of the
//              EventEnvelope class we will build in Phase 3.
//              Every field here maps 1:1 to the envelope fields.
// ============================================================

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    // ── The 7 Mandatory EventEnvelope Fields ──────────────

    // Field 1: Unique identifier for this event (UUID from EventEnvelope)
    eventId: {
      type:     String,
      required: [true, 'eventId is required'],
      unique:   true, // critical for idempotency checks
      index:    true,
    },

    // Field 2: What type of event occurred
    eventType: {
      type:     String,
      required: [true, 'eventType is required'],
      enum: [
        'VEHICLE_DETECTED',
        'SPEED_VIOLATION',
        'CONGESTION_ALERT',
        'TRAFFIC_CLEARED',
      ],
    },

    // Field 3: The actual data payload (flexible structure per event type)
    payload: {
      type:     mongoose.Schema.Types.Mixed,
      required: [true, 'payload is required'],
    },

    // Field 4: The source that generated this event (camera ID)
    source: {
      type:     String,
      required: [true, 'source is required'],
      // e.g. "CAMERA_01", "CAMERA_07_LAHORE_MAIN_BLVD"
    },

    // Field 5: Exact time the event occurred
    timestamp: {
      type:    Date,
      default: Date.now,
    },

    // Field 6: Schema version (useful for future migrations)
    version: {
      type:    Number,
      default: 1,
    },

    // Field 7: Correlation ID — links related events together
    // e.g. vehicle detected → speed violation share same correlationId
    correlationId: {
      type:    String,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// ── Index for fast querying by eventType and timestamp ────
eventSchema.index({ eventType: 1, timestamp: -1 });

module.exports = mongoose.model('Event', eventSchema);
