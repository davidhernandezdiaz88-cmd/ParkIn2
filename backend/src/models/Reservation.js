const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  spot: { type: mongoose.Schema.Types.ObjectId, ref: 'Spot', required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  status: { type: String, enum: ['active','completed','cancelled'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);
