// ============================================================
// User.model.js — User Schema (Admin / Police / NHA roles)
// SDA Concept: Data Modeling + Role-Based Access Control (RBAC)
//              The `role` field is the foundation of our
//              entire authorization system.
// ============================================================

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Name is required'],
      trim:     true,
    },

    email: {
      type:      String,
      required:  [true, 'Email is required'],
      unique:    true,
      lowercase: true,
      trim:      true,
      match:     [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },

    password: {
      type:      String,
      required:  [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },

    // ── RBAC Role Field ───────────────────────────────────
    // ADMIN  → full access (all routes)
    // POLICE → access to camera control + alerts
    // NHA    → read-only dashboard + alerts
    role: {
      type:    String,
      enum:    ['ADMIN', 'POLICE', 'NHA'],
      default: 'NHA',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// ── Pre-Save Hook: Hash password before storing ───────────
// SDA Concept: Encapsulation — hashing logic lives in the model,
// not in the controller. No controller ever hashes a password.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // skip if password unchanged
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ── Instance Method: Compare entered password with hash ───
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
