const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Spot = require('../models/Spot');
const { auth } = require('../middleware/auth');

// Create reservation
router.post('/', auth, async (req, res) => {
  try{
    const { spot: spotId, from, to } = req.body;
    if(!spotId || !from || !to) return res.status(400).json({ msg: 'Missing fields' });
    const spot = await Spot.findById(spotId);
    if(!spot) return res.status(404).json({ msg: 'Spot not found' });
    if(spot.status === 'occupied') return res.status(400).json({ msg: 'Spot occupied' });
    // Basic: create reservation and mark spot reserved
    const reservation = new Reservation({ user: req.user._id, spot: spotId, from: new Date(from), to: new Date(to) });
    await reservation.save();
    spot.status = 'reserved';
    await spot.save();
    res.json(reservation);
  }catch(err){
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get my reservations
router.get('/my', auth, async (req, res) => {
  try{
    const reservations = await Reservation.find({ user: req.user._id }).populate('spot').populate('user','name email').lean();
    res.json(reservations);
  }catch(err){
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
