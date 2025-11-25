const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/parkin';

// MongoDB Connection with retry logic
const connectDB = async () => {
  const maxAttempts = 5;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      });
      console.log('✓ Connected to MongoDB');
      return;
    } catch (err) {
      attempts++;
      console.warn(`⚠ MongoDB connection attempt ${attempts}/${maxAttempts} failed:`, err.message);
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retry
      }
    }
  }
  
  console.error('✗ Failed to connect to MongoDB after', maxAttempts, 'attempts');
};

connectDB();

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Placeholder routes (to be implemented)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/parkings', require('./routes/parkings'));
app.use('/api/spots', require('./routes/spots'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/admin', require('./routes/admin'));

app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🚀 ParkIn Backend Server`);
  console.log(`📍 Running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Database: ${process.env.MONGODB_URI ? 'MongoDB Atlas' : 'Local MongoDB'}`);
  console.log(`${'='.repeat(50)}\n`);
});

module.exports = app;
