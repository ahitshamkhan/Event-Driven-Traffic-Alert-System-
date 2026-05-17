// ============================================================
// idempotent.test.js — Task 4 Test Suite (10 marks)
// SDA Concept: Test-Driven Design (TDD)
//
// This file tests the IdempotentReceiver pattern in isolation.
// The EventBus.publish() is MOCKED so tests do NOT need:
//   - A running MongoDB instance
//   - A running Socket.io server
//
// 3 Core Test Cases:
//   1. New event       → processed  → returns true
//   2. Duplicate event → discarded  → returns false
//   3. Different event → processed  → returns true
// ============================================================

const EventEnvelope      = require('../patterns/EventEnvelope');
const IdempotentReceiver = require('../patterns/IdempotentReceiver');
const EventBus           = require('../patterns/EventBus');

// ── Mock EventBus.publish ─────────────────────────────────
// We replace the real publish() with a Jest mock function.
// This means: no DB calls, no Socket.io — pure unit test.
jest.spyOn(EventBus, 'publish').mockResolvedValue(undefined);

// ── Reset state before each test ─────────────────────────
// This ensures tests are completely independent of each other.
beforeEach(() => {
  IdempotentReceiver.reset();       // clear processedIds Set
  EventBus.publish.mockClear();     // clear mock call history
});

// ==========================================================
//  TEST SUITE
// ==========================================================

describe('IdempotentReceiver — Task 4 (10 marks)', () => {

  // --------------------------------------------------------
  // Test 1: New event should be processed (returns true)
  // --------------------------------------------------------
  test('✅ Test 1: processes a NEW event and returns true', async () => {
    const envelope = new EventEnvelope({
      eventType: 'SPEED_VIOLATION',
      payload:   { vehicleNumber: 'LHR-001', speed: 120, limit: 80 },
      source:    'CAMERA_01',
    });

    const result = await IdempotentReceiver.receive(envelope);

    // Should return true — event was processed
    expect(result).toBe(true);

    // EventBus.publish should have been called EXACTLY once
    expect(EventBus.publish).toHaveBeenCalledTimes(1);

    // EventBus was called with this exact envelope
    expect(EventBus.publish).toHaveBeenCalledWith(envelope);

    // The eventId should now be marked as processed
    expect(IdempotentReceiver.hasProcessed(envelope.eventId)).toBe(true);
  });

  // --------------------------------------------------------
  // Test 2: Same event published TWICE — second should be discarded
  // --------------------------------------------------------
  test('❌ Test 2: discards a DUPLICATE event and returns false', async () => {
    const envelope = new EventEnvelope({
      eventType: 'SPEED_VIOLATION',
      payload:   { vehicleNumber: 'LHR-001', speed: 120, limit: 80 },
      source:    'CAMERA_01',
    });

    // First publish — should succeed
    const firstResult = await IdempotentReceiver.receive(envelope);
    expect(firstResult).toBe(true);

    // Second publish — same envelope, same eventId — should be discarded
    const secondResult = await IdempotentReceiver.receive(envelope);
    expect(secondResult).toBe(false);

    // EventBus.publish should have been called ONLY ONCE (not twice)
    expect(EventBus.publish).toHaveBeenCalledTimes(1);
  });

  // --------------------------------------------------------
  // Test 3: Different event (new UUID) should always be processed
  // --------------------------------------------------------
  test('✅ Test 3: processes a DIFFERENT event (new eventId) after a duplicate', async () => {
    const envelope1 = new EventEnvelope({
      eventType: 'SPEED_VIOLATION',
      payload:   { vehicleNumber: 'LHR-001', speed: 120, limit: 80 },
      source:    'CAMERA_01',
    });

    const envelope2 = new EventEnvelope({
      eventType: 'CONGESTION_ALERT',
      payload:   { congestionLevel: 85, affectedLane: 'A' },
      source:    'CAMERA_02',
    });

    // Both are different envelopes with different UUIDs
    const result1 = await IdempotentReceiver.receive(envelope1);
    const result2 = await IdempotentReceiver.receive(envelope2);

    expect(result1).toBe(true);
    expect(result2).toBe(true);

    // EventBus.publish called TWICE — one for each unique event
    expect(EventBus.publish).toHaveBeenCalledTimes(2);
  });

  // --------------------------------------------------------
  // Test 4: Sending duplicate envelope1 after processing envelope2
  // --------------------------------------------------------
  test('❌ Test 4: rejects duplicate even after other events processed', async () => {
    const envelope1 = new EventEnvelope({
      eventType: 'VEHICLE_DETECTED',
      payload:   { vehicleNumber: 'KHI-007', speed: 60 },
      source:    'CAMERA_03',
    });

    const envelope2 = new EventEnvelope({
      eventType: 'TRAFFIC_CLEARED',
      payload:   { lanes: 3 },
      source:    'CAMERA_04',
    });

    await IdempotentReceiver.receive(envelope1); // process
    await IdempotentReceiver.receive(envelope2); // process different
    const dupResult = await IdempotentReceiver.receive(envelope1); // duplicate of first

    expect(dupResult).toBe(false);
    // Only 2 calls to publish — the duplicate did not trigger a 3rd
    expect(EventBus.publish).toHaveBeenCalledTimes(2);
  });

  // --------------------------------------------------------
  // Test 5: Counter tracking (getProcessedCount)
  // --------------------------------------------------------
  test('📊 Test 5: correctly tracks the count of processed events', async () => {
    expect(IdempotentReceiver.getProcessedCount()).toBe(0); // starts at 0

    const env1 = new EventEnvelope({ eventType: 'SPEED_VIOLATION', payload: {}, source: 'CAM_01' });
    const env2 = new EventEnvelope({ eventType: 'VEHICLE_DETECTED', payload: {}, source: 'CAM_02' });
    const env3 = new EventEnvelope({ eventType: 'CONGESTION_ALERT', payload: {}, source: 'CAM_03' });

    await IdempotentReceiver.receive(env1);
    await IdempotentReceiver.receive(env2);
    await IdempotentReceiver.receive(env1); // duplicate — should NOT increment

    expect(IdempotentReceiver.getProcessedCount()).toBe(2); // only 2 unique

    await IdempotentReceiver.receive(env3);
    expect(IdempotentReceiver.getProcessedCount()).toBe(3);
  });

  // --------------------------------------------------------
  // Test 6: EventEnvelope immutability (Value Object guarantee)
  // --------------------------------------------------------
  test('🔒 Test 6: EventEnvelope is immutable after creation', () => {
    const envelope = new EventEnvelope({
      eventType: 'SPEED_VIOLATION',
      payload:   { vehicleNumber: 'ISB-999' },
      source:    'CAMERA_MAIN',
    });

    // Attempting to mutate a frozen object in strict mode throws TypeError
    expect(() => {
      'use strict';
      envelope.eventType = 'HACKED';
    }).toThrow(TypeError);

    // Original value is unchanged
    expect(envelope.eventType).toBe('SPEED_VIOLATION');
  });

  // --------------------------------------------------------
  // Test 7: EventEnvelope validation — missing required fields
  // --------------------------------------------------------
  test('🚫 Test 7: EventEnvelope throws on missing required fields', () => {
    expect(() => new EventEnvelope({ payload: {}, source: 'CAM' }))
      .toThrow('[EventEnvelope] eventType is required');

    expect(() => new EventEnvelope({ eventType: 'SPEED_VIOLATION', source: 'CAM' }))
      .toThrow('[EventEnvelope] payload is required');

    expect(() => new EventEnvelope({ eventType: 'SPEED_VIOLATION', payload: {} }))
      .toThrow('[EventEnvelope] source is required');
  });

});
