// ============================================================
// auth.middleware.js — JWT Authentication Guard
// SDA Concept: Chain of Responsibility Pattern
//              Each middleware is a "link" in the chain.
//              If the token is valid → call next() (pass to next link).
//              If invalid → break the chain → return 401 immediately.
// ============================================================

const jwt  = require('jsonwebtoken');
const User = require('../models/User.model');

/**
 * protect — verifies the JWT token in the Authorization header.
 * Attaches the decoded user object to req.user for downstream use.
 *
 * Usage: router.get('/route', protect, controllerFn)
 */
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Step 1: Check if Bearer token exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized — no token provided',
    });
  }

  try {
    // Step 2: Extract and verify the token
    const token   = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 3: Attach user to request (without password)
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized — user no longer exists',
      });
    }

    next(); // ✅ Chain continues
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized — token invalid or expired',
    });
  }
};

module.exports = { protect };
