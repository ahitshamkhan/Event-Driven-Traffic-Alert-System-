// ============================================================
// IEventSubscriber.js — Observer Interface (Abstract Base Class)
// SDA Concept: Observer Pattern + Dependency Inversion Principle
//              Defines the CONTRACT that every subscriber MUST follow.
//              The EventBus depends on this abstraction, NOT on
//              concrete services like AlertService or LoggingService.
//
// Viva Answer: "JavaScript has no native interfaces, so we simulate
// one using a class that throws an error if handle() is not
// overridden — enforcing the Observer contract at runtime."
// ============================================================

class IEventSubscriber {
  /**
   * Every concrete subscriber MUST override this method.
   * The EventBus calls this method when dispatching events.
   *
   * @param {EventEnvelope} event - The standardized event envelope
   * @throws {Error} if not implemented by subclass
   */
  handle(event) {
    throw new Error(
      `[IEventSubscriber] handle(event) must be implemented by ${this.constructor.name}`
    );
  }
}

module.exports = IEventSubscriber;
