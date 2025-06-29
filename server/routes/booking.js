const express = require('express');
const jwt = require('jsonwebtoken');
const Booking = require('../models/Booking.js');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'stayfinder_secret';

// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Book a stay
router.post('/book', auth, async (req, res) => {
  const { listingTitle, details } = req.body;
  try {
    const booking = new Booking({
      user: req.user.userId,
      listingTitle,
      details
    });
    await booking.save();
    res.status(201).json({ message: 'Booking successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 