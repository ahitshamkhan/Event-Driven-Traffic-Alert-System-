// ============================================================
// EventBus.js — Task 1 + Task 2 (15 marks)
// SDA Concept: Publish-Subscribe Pattern + Singleton Pattern
//              + Open/Closed Principle
//
// Task 1 (5 marks)  → subscribe(eventType, subscriber)
// Task 2 (10 marks) → publish(envelope)
//                     ├─ Persist event to MongoDB
//                     ├─ Broadcast to all Socket.io clients
//                     └─ Notify all registered subscribers
//
// WHY Singleton?
//   The entire application shares ONE EventBus. If multiple
//   instances existed, subscribers registered on one instance
//   would never hear events published on another. A single
//   shared instance is the only correct architecture here.
//
// WHY Pub-Sub?
//   Camera controllers (publishers) and services like
//   AlertService (subscribers) are COMPLETELY DECOUPLED.
//   The camera does NOT know AlertService exists. AlertService
//   does NOT know which camera fired the event. They communicate
//   ONLY through the EventBus. This is loose coupling.
// ============================================================

const Event = require('../models/Event.model');
const { getIO } = require('../config/socket');

class EventBus {
  constructor() {
    /**
     * Registry: Map<eventType, IEventSubscriber[]>
     * e.g. {
     *   'SPEED_VIOLATION' → [AlertService, LoggingService],
     *   'VEHICLE_DETECTED' → [LoggingService, DashboardService]
     * }
     */
    this.subscribers = new Map();
  }

  // ──────────────────────────────────────────────────────
  // TASK 1 — subscribe(eventType, subscriber)     [5 marks]
  // Registers a subscriber to be notified when a specific
  // event type is published.
  // ──────────────────────────────────────────────────────

  /**
   * Register a subscriber for a given event type.
   * @param {string}           eventType  - e.g. 'SPEED_VIOLATION'
   * @param {IEventSubscriber} subscriber - must have handle() method
   */
  subscribe(eventType, subscriber) {
    // Enforce the IEventSubscriber contract
    if (typeof subscriber.handle !== 'function') {
      throw new Error(
        `[EventBus] Subscriber "${subscriber.constructor.name}" must implement handle(event)`
      );
    }

    // Initialize array for this event type if first subscriber
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, []);
    }

    this.subscribers.get(eventType).push(subscriber);

    console.log(
      `📌 [EventBus] "${subscriber.constructor.name}" subscribed to → "${eventType}"`
    );
  }

  // ──────────────────────────────────────────────────────
  // TASK 2 — publish(envelope)                   [10 marks]
  // Dispatches an EventEnvelope to:
  //   1. MongoDB (persistence)
  //   2. Socket.io (real-time broadcast)
  //   3. All registered subscribers (notification)
  // ──────────────────────────────────────────────────────

  /**
   * Publish an EventEnvelope to the system.
   * @param {EventEnvelope} envelope - the standardized event
   */
  async publish(envelope) {
    console.log(`\n📢 [EventBus] Publishing: "${envelope.eventType}"`);
    console.log(`   EventID : ${envelope.eventId}`);
    console.log(`   Source  : ${envelope.source}`);
    console.log(`   Time    : ${envelope.timestamp}`);

    // ── Step 1: Persist to MongoDB ──────────────────────
    try {
      await Event.create({
        eventId:       envelope.eventId,
        eventType:     envelope.eventType,
        payload:       envelope.payload,
        source:        envelope.source,
        timestamp:     envelope.timestamp,
        version:       envelope.version,
        correlationId: envelope.correlationId,
      });
      console.log(`   💾 Persisted to MongoDB`);
    } catch (err) {
      // Duplicate key error (11000) = event already stored, not a crash
      if (err.code === 11000) {
        console.warn(`   ⚠️  Event already in DB — skipping persist`);
      } else {
        console.error(`   ❌ DB Persist Error: ${err.message}`);
      }
    }

    // ── Step 2: Broadcast via Socket.io ─────────────────
    try {
      const io = getIO();
      io.emit(envelope.eventType, envelope); // All connected clients receive this
      console.log(`   📡 Broadcasted via Socket.io → "${envelope.eventType}"`);
    } catch (err) {
      // Socket may not be initialized during unit tests — that is OK
      console.warn(`   ⚠️  Socket broadcast skipped: ${err.message}`);
    }

    // ── Step 3: Notify all registered subscribers ────────
    const subs = this.subscribers.get(envelope.eventType) || [];
    console.log(`   👥 Notifying ${subs.length} subscriber(s)...`);

    for (const subscriber of subs) {
      try {
        await subscriber.handle(envelope);
      } catch (err) {
        // One subscriber failing must NOT stop others from running
        console.error(
          `   ❌ Subscriber "${subscriber.constructor.name}" threw: ${err.message}`
        );
      }
    }
  }
}

// ── Singleton Export ─────────────────────────────────────
// module.exports exports a single INSTANCE, not the class.
// Every file that does require('./EventBus') gets the SAME object.
module.exports = new EventBus();
