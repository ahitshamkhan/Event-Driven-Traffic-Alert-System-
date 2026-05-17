// ============================================================
// alerts.routes.js — Penalty Alert Routes
// GET   /api/alerts           (all authenticated users)
// GET   /api/alerts/:id       (all authenticated users)
// PATCH /api/alerts/:id/status (ADMIN + POLICE only)
// ============================================================

const express = require('express');
const router  = express.Router();

const { getAllAlerts, getAlertById, updateAlertStatus } = require('../controllers/alerts.controller');
const { protect }   = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.get('/',                protect,                                  getAllAlerts);
router.get('/:id',             protect,                                  getAlertById);
router.patch('/:id/status',    protect, authorize('ADMIN', 'POLICE'),   updateAlertStatus);

module.exports = router;
