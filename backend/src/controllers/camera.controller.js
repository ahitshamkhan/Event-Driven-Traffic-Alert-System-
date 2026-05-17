// ============================================================
// camera.controller.js — Publish Events to the EventBus
// SDA Concept: Command Pattern
//              The HTTP request is treated as a "Command" that
//              triggers an event to be published into the system.
//              The controller validates the command then hands it
//              to IdempotentReceiver → EventBus → Subscribers.
// ============================================================

const EventEnvelope      = require('../patterns/EventEnvelope');
const IdempotentReceiver = require('../patterns/IdempotentReceiver');

const VALID_TYPES = [
  'VEHICLE_DETECTED',
  'SPEED_VIOLATION',
  'CONGESTION_ALERT',
  'TRAFFIC_CLEARED',
];

// ── POST /api/camera/publish ──────────────────────────────
const publishEvent = async (req, res) => {
  try {
    const { eventType, payload, source, correlationId } = req.body;

    // Validate required fields
    if (!eventType || !payload || !source) {
      return res.status(400).json({
        success: false,
        message: 'eventType, payload, and source are required',
      });
    }

    if (!VALID_TYPES.includes(eventType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid eventType. Must be one of: ${VALID_TYPES.join(', ')}`,
      });
    }

    // Wrap in EventEnvelope (Task 3 — 5 marks)
    const envelope = new EventEnvelope({ eventType, payload, source, correlationId });

    // Send through IdempotentReceiver (Task 4 — 10 marks)
    const processed = await IdempotentReceiver.receive(envelope);

    if (!processed) {
      return res.status(200).json({
        success: true,
        message: 'Duplicate event — discarded (idempotent)',
        eventId: envelope.eventId,
      });
    }

    return res.status(201).json({
      success: true,
      message: `Event "${eventType}" published successfully`,
      data: {
        eventId:   envelope.eventId,
        eventType: envelope.eventType,
        source:    envelope.source,
        timestamp: envelope.timestamp,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { publishEvent };
