const express = require('express');
const router = express.Router();
const Parking = require('../models/Parking');
const Spot = require('../models/Spot');
const { auth, requireAdmin } = require('../middleware/auth');

// List parkings
router.get('/', async (req, res) => {
	try{
		const parkings = await Parking.find().lean();
		res.json(parkings);
	}catch(err){
		console.error(err);
		res.status(500).json({ msg: 'Server error' });
	}
});

// Create parking (admin)
router.post('/', auth, requireAdmin, async (req, res) => {
	try{
		const { name, address, description } = req.body;
		if(!name) return res.status(400).json({ msg: 'Name required' });
		const parking = new Parking({ name, address, description });
		await parking.save();
		res.json(parking);
	}catch(err){
		console.error(err);
		res.status(500).json({ msg: 'Server error' });
	}
});

// Get parking with spots
router.get('/:id', async (req, res) => {
	try{
		const parking = await Parking.findById(req.params.id).lean();
		if(!parking) return res.status(404).json({ msg: 'Not found' });
		const spots = await Spot.find({ parking: parking._id }).lean();
		res.json({ ...parking, spots });
	}catch(err){
		console.error(err);
		res.status(500).json({ msg: 'Server error' });
	}
});

module.exports = router;
