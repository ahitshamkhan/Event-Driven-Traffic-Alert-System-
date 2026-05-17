// ============================================================
// role.middleware.js — Role-Based Access Control (RBAC)
// SDA Concept: Strategy Pattern
//              The roles array IS the strategy — it defines
//              which roles are permitted for a specific route.
//              Swapping roles requires zero code changes here.
//
// Usage: router.delete('/route', protect, authorize('ADMIN'), fn)
//        router.post('/route', protect, authorize('ADMIN','POLICE'), fn)
// ============================================================

/**
 * authorize — factory function that returns a middleware.
 * @param {...string} roles - allowed roles e.g. 'ADMIN', 'POLICE'
 * @returns {function} Express middleware
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    // req.user is set by the protect middleware (must run AFTER protect)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied — role "${req.user.role}" is not permitted. Required: [${roles.join(', ')}]`,
      });
    }

    next(); // ✅ Role is authorized — continue
  };
};

module.exports = { authorize };
