// ============================================================
// AlertService.js — Concrete Observer #2
// SDA Concept: Observer Pattern (implements IEventSubscriber)
//              Strategy Pattern — fine calculation logic is
//              isolated and can be swapped without touching
//              the rest of the system.
//
// Subscribes to: 'SPEED_VIOLATION' only
// Purpose: When a speed violation occurs, generate a penalty
//          Alert document in MongoDB and broadcast it to the
//          frontend via Socket.io so it appears instantly.
// ============================================================

const IEventSubscriber = require('../patterns/IEventSubscriber');
const Alert            = require('../models/Alert.model');
const { getIO }        = require('../config/socket');

class AlertService extends IEventSubscriber {
  /**
   * Called by EventBus on every SPEED_VIOLATION event.
   * @param {EventEnvelope} event
   */
  async handle(event) {
    // Guard: Only process SPEED_VIOLATION events
    if (event.eventType !== 'SPEED_VIOLATION') return;

    const { vehicleNumber, speed, limit, location } = event.payload;

    // ── Fine Calculation Strategy ─────────────────────
    // Fine = (excess speed) × PKR 50 per km/h over limit
    const excessSpeed = speed - limit;
    const fineAmount  = excessSpeed * 50;

    console.log(`\n🚨 [AlertService] SPEED VIOLATION detected!`);
    console.log(`   Vehicle : ${vehicleNumber}`);
    console.log(`   Speed   : ${speed} km/h (limit: ${limit} km/h)`);
    console.log(`   Excess  : ${excessSpeed} km/h → Fine: PKR ${fineAmount}`);

    // ── Create Penalty Alert in MongoDB ───────────────
    let alert;
    try {
      alert = await Alert.create({
        vehicleNumber,
        eventId:       event.eventId,
        violationType: 'SPEED_VIOLATION',
        fineAmount,
        location:      location || 'Unknown Location',
        status:        'PENDING',
      });
      console.log(`   ✅ Alert saved to DB | ID: ${alert._id}`);
    } catch (err) {
      console.error(`   ❌ Alert DB error: ${err.message}`);
      return;
    }

    // ── Broadcast new alert to frontend via Socket.io ─
    try {
      getIO().emit('NEW_ALERT', {
        id:            alert._id,
        vehicleNumber: alert.vehicleNumber,
        fineAmount:    alert.fineAmount,
        location:      alert.location,
        status:        alert.status,
        issuedAt:      alert.issuedAt,
      });
      console.log(`   📡 Alert broadcasted to frontend`);
    } catch (err) {
      console.warn(`   ⚠️  Socket broadcast skipped: ${err.message}`);
    }
  }
}

module.exports = new AlertService();
