// ============================================================
// camera.routes.js — Camera / Event Publishing Routes
// POST /api/camera/publish  (ADMIN + POLICE only)
// ============================================================

const express = require('express');
const router  = express.Router();

const { publishEvent }  = require('../controllers/camera.controller');
const { protect }       = require('../middleware/auth.middleware');
const { authorize }     = require('../middleware/role.middleware');

// Only ADMIN and POLICE can publish events (cameras are operated by them)
router.post('/publish', protect, authorize('ADMIN', 'POLICE'), publishEvent);

module.exports = router;
