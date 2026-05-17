// ============================================================
// alerts.controller.js — Manage Penalty Alerts
// SDA Concept: State Machine transition enforcement
//              Only ADMIN and POLICE can change alert status.
//              Status transitions are validated here before
//              any DB write — preventing illegal state changes.
// ============================================================

const Alert = require('../models/Alert.model');

// ── GET /api/alerts ───────────────────────────────────────
// Returns paginated list of all alerts, optionally filtered by status
const getAllAlerts = async (req, res) => {
  try {
    const page   = parseInt(req.query.page)   || 1;
    const limit  = parseInt(req.query.limit)  || 20;
    const skip   = (page - 1) * limit;

    const filter = {};
    if (req.query.status)  filter.status        = req.query.status;
    if (req.query.vehicle) filter.vehicleNumber  = req.query.vehicle.toUpperCase();

    const [alerts, total] = await Promise.all([
      Alert.find(filter)
        .sort({ issuedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('verifiedBy', 'name email role'),
      Alert.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: alerts,
      pagination: { total, page, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/alerts/:id ───────────────────────────────────
const getAlertById = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id).populate('verifiedBy', 'name role');
    if (!alert) {
      return res.status(404).json({ success: false, message: 'Alert not found' });
    }
    return res.status(200).json({ success: true, data: alert });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ── PATCH /api/alerts/:id/status ─────────────────────────
// State Machine: PENDING → VERIFIED | PENDING → DISMISSED only
const updateAlertStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate new status value
    if (!['VERIFIED', 'DISMISSED'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'status must be VERIFIED or DISMISSED',
      });
    }

    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ success: false, message: 'Alert not found' });
    }

    // Enforce State Machine: only PENDING alerts can be actioned
    if (alert.status !== 'PENDING') {
      return res.status(409).json({
        success: false,
        message: `Cannot update — alert is already "${alert.status}"`,
      });
    }

    alert.status     = status;
    alert.verifiedBy = req.user._id;
    alert.verifiedAt = new Date();
    await alert.save();

    return res.status(200).json({
      success: true,
      message: `Alert ${status.toLowerCase()} successfully`,
      data: alert,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllAlerts, getAlertById, updateAlertStatus };
