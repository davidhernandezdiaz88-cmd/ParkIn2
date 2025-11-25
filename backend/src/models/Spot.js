const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
  parking: { type: mongoose.Schema.Types.ObjectId, ref: 'Parking', required: true },
  identifier: { type: String, required: true },
  type: { type: String, enum: ['car','motorcycle'], default: 'car' },
  status: { type: String, enum: ['available','occupied','reserved'], default: 'available' }
}, { timestamps: true });

module.exports = mongoose.model('Spot', SpotSchema);
