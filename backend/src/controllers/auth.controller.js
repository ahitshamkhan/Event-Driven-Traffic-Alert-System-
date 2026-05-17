// ============================================================
// auth.controller.js — Register & Login
// SDA Concept: Controller Layer (MVC Pattern)
//              Controllers orchestrate — they validate input,
//              call models, and return responses.
//              They contain NO business logic themselves.
// ============================================================

const jwt  = require('jsonwebtoken');
const User = require('../models/User.model');

/**
 * Generate a signed JWT for a user.
 * @param {string} id - MongoDB user _id
 * @returns {string} signed JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ── POST /api/auth/register ───────────────────────────────
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'name, email, and password are required' });
    }

    // Check duplicate email
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // Create user — password is hashed automatically by the pre-save hook
    const user = await User.create({ name, email, password, role });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ── POST /api/auth/login ──────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Compare password using the model's method
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        role:  user.role,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET /api/auth/me ──────────────────────────────────────
const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      id:    req.user._id,
      name:  req.user.name,
      email: req.user.email,
      role:  req.user.role,
    },
  });
};

module.exports = { register, login, getMe };
