const express = require('express');
const router = express.Router();
const Spot = require('../models/Spot');
const { auth, requireAdmin } = require('../middleware/auth');

// List spots for a parking
router.get('/parking/:parkingId', async (req, res) => {
  try{
    const spots = await Spot.find({ parking: req.params.parkingId }).lean();
    res.json(spots);
  }catch(err){
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create spot (admin)
router.post('/', auth, requireAdmin, async (req, res) => {
  try{
    const { parking, identifier, type } = req.body;
    if(!parking || !identifier) return res.status(400).json({ msg: 'Missing fields' });
    const spot = new Spot({ parking, identifier, type });
    await spot.save();
    res.json(spot);
  }catch(err){
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
