const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/parkin';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✓ Connected to MongoDB'))
  .catch(err => console.warn('⚠ MongoDB not available yet:', err.message));

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Placeholder routes (to be implemented)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/parkings', require('./routes/parkings'));
app.use('/api/spots', require('./routes/spots'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/admin', require('./routes/admin'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
