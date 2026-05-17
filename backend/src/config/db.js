// ============================================================
// db.js — MongoDB Connection
// SDA Concept: Single Responsibility Principle (SRP)
//              One file, one job: manage the DB connection.
// ============================================================

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ DB Connection Failed: ${error.message}`);
    process.exit(1); // Crash intentionally — app cannot run without DB
  }
};

module.exports = connectDB;
