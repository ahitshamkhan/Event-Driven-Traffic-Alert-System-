// ============================================================
// events.controller.js — Fetch Historical Events + Stats
// SDA Concept: Repository Pattern (via Mongoose)
//              Controllers don't write raw queries — they use
//              the model as a repository to access data.
// ============================================================

const Event            = require('../models/Event.model');
const ReportingService = require('../services/ReportingService');

// ── GET /api/events ───────────────────────────────────────
// Returns paginated list of all traffic events from MongoDB
const getAllEvents = async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip  = (page - 1) * limit;

    // Optional filter by eventType
    const filter = {};
    if (req.query.type) filter.eventType = req.query.type;

    const [events, total] = await Promise.all([
      Event.find(filter).sort({ timestamp: -1 }).skip(skip).limit(limit),
      Event.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: events,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/events/:id ───────────────────────────────────
const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({ eventId: req.params.id });
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    return res.status(200).json({ success: true, data: event });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/events/stats ─────────────────────────────────
// Returns aggregated stats from ReportingService (in-memory — no DB hit)
const getStats = async (req, res) => {
  try {
    const stats = ReportingService.getStats();
    return res.status(200).json({ success: true, data: stats });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllEvents, getEventById, getStats };
