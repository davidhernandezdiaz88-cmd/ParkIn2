const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const header = req.headers.authorization;
  if(!header || !header.startsWith('Bearer ')) return res.status(401).json({ msg: 'No token' });
  const token = header.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change_this_secret');
    const user = await User.findById(payload.id).select('-password');
    if(!user) return res.status(401).json({ msg: 'User not found' });
    req.user = user;
    next();
  }catch(err){
    return res.status(401).json({ msg: 'Invalid token' });
  }
}

const requireAdmin = (req, res, next) => {
  if(!req.user) return res.status(401).json({ msg: 'Not authenticated' });
  if(req.user.role !== 'admin') return res.status(403).json({ msg: 'Requires admin' });
  next();
}

module.exports = { auth, requireAdmin };
