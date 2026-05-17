// ============================================================
// Alert.model.js — Penalty Alert Schema
// SDA Concept: Data Modeling + State Machine Pattern
//              The `status` field follows a strict state machine:
//              PENDING → VERIFIED  (Police/Admin confirms)
//              PENDING → DISMISSED (Police/Admin dismisses)
//              Once VERIFIED or DISMISSED, no further transitions.
// ============================================================

const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    // Vehicle that committed the violation
    vehicleNumber: {
      type:     String,
      required: [true, 'vehicleNumber is required'],
      uppercase: true,
      trim:      true,
    },

    // Links back to the source Event (for traceability)
    eventId: {
      type:     String,
      required: [true, 'eventId is required'],
      index:    true,
    },

    // Type of violation that triggered this alert
    violationType: {
      type:     String,
      required: [true, 'violationType is required'],
      enum:     ['SPEED_VIOLATION', 'CONGESTION_ALERT'],
    },

    // Calculated fine in PKR
    fineAmount: {
      type:     Number,
      required: [true, 'fineAmount is required'],
      min:      [0, 'Fine amount cannot be negative'],
    },

    // Where the violation occurred
    location: {
      type:    String,
      default: 'Unknown Location',
    },

    // ── State Machine: Alert Status ───────────────────────
    // PENDING   → Default. Awaiting Police/Admin review.
    // VERIFIED  → Confirmed. Fine will be collected.
    // DISMISSED → Rejected. False positive or error.
    status: {
      type:    String,
      enum:    ['PENDING', 'VERIFIED', 'DISMISSED'],
      default: 'PENDING',
      index:   true,
    },

    // When the fine was generated
    issuedAt: {
      type:    Date,
      default: Date.now,
    },

    // Which user (Police/Admin) verified or dismissed this alert
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User', // reference to User model
      default: null,
    },

    // When the alert was acted upon
    verifiedAt: {
      type:    Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// ── Compound index for efficient dashboard queries ────────
alertSchema.index({ status: 1, issuedAt: -1 });
alertSchema.index({ vehicleNumber: 1 });

module.exports = mongoose.model('Alert', alertSchema);
