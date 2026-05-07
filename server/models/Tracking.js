const mongoose = require("mongoose");

const TrackingSchema = new mongoose.Schema({
  userId: String,
  domain: String,
  duration: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Tracking", TrackingSchema);