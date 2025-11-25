const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Parking = require('../models/Parking');
const Spot = require('../models/Spot');

router.post('/seed', async (req, res) => {
  try{
    // Create admin
    const adminEmail = 'admin@parkin.local';
    let admin = await User.findOne({ email: adminEmail });
    if(!admin){
      admin = new User({ name: 'Admin', email: adminEmail, password: 'admin123', role: 'admin' });
      await admin.save();
    }

    // Create sample user
    const userEmail = 'user@parkin.local';
    let user = await User.findOne({ email: userEmail });
    if(!user){
      user = new User({ name: 'Usuario', email: userEmail, password: 'user123', role: 'resident' });
      await user.save();
    }

    // Create sample parking
    let p = await Parking.findOne({ name: 'Conjunto A' });
    if(!p){
      p = new Parking({ name: 'Conjunto A', address: 'Calle Falsa 123', description: 'Parqueadero principal' });
      await p.save();
    }

    // Create spots
    const existing = await Spot.find({ parking: p._id });
    if(existing.length === 0){
      const spots = [];
      for(let i=1;i<=8;i++) spots.push({ parking: p._id, identifier: `P-${i}`, type: 'car' });
      for(let i=1;i<=4;i++) spots.push({ parking: p._id, identifier: `M-${i}`, type: 'motorcycle' });
      await Spot.insertMany(spots);
    }

    res.json({ 
      msg: 'Seed completed',
      admin: { email: adminEmail, password: 'admin123' },
      user: { email: userEmail, password: 'user123' }
    });
  }catch(err){
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
