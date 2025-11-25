const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Parking = require('./models/Parking');
const Spot = require('./models/Spot');

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/parkin';

async function run(){
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to', MONGODB_URI);

  // Create admin
  const adminEmail = 'admin@parkin.local';
  let admin = await User.findOne({ email: adminEmail });
  if(!admin){
    admin = new User({ name: 'Admin', email: adminEmail, password: 'admin123', role: 'admin' });
    await admin.save();
    console.log('Created admin:', adminEmail);
  }

  // Create sample parking
  let p = await Parking.findOne({ name: 'Conjunto A' });
  if(!p){
    p = new Parking({ name: 'Conjunto A', address: 'Calle Falsa 123', description: 'Parqueadero principal' });
    await p.save();
    console.log('Created parking:', p.name);
  }

  // Create spots
  const existing = await Spot.find({ parking: p._id });
  if(existing.length === 0){
    const spots = [];
    for(let i=1;i<=8;i++) spots.push({ parking: p._id, identifier: `P-${i}`, type: 'car' });
    for(let i=1;i<=4;i++) spots.push({ parking: p._id, identifier: `M-${i}`, type: 'motorcycle' });
    await Spot.insertMany(spots);
    console.log('Created spots for', p.name);
  }

  console.log('Seed finished.');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
