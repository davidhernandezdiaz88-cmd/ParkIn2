const mongoose = require('mongoose');

const ParkingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Parking', ParkingSchema);
