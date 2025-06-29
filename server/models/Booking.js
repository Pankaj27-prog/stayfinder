const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listingTitle: { type: String, required: true },
  details: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema); 