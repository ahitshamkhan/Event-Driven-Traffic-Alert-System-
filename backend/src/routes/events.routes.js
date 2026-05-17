// ============================================================
// events.routes.js — Traffic Events Routes
// GET /api/events         (all authenticated users)
// GET /api/events/stats   (all authenticated users)
// GET /api/events/:id     (all authenticated users)
// ============================================================

const express = require('express');
const router  = express.Router();

const { getAllEvents, getEventById, getStats } = require('../controllers/events.controller');
const { protect }                              = require('../middleware/auth.middleware');

// IMPORTANT: /stats must be defined BEFORE /:id
// Otherwise Express will match "stats" as an :id parameter
router.get('/stats', protect, getStats);
router.get('/',      protect, getAllEvents);
router.get('/:id',   protect, getEventById);

module.exports = router;
