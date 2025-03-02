const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    console.log('No token provided');
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.sendStatus(403); // Forbidden
    }
    console.log('Token verified, user:', user);
    req.user = user;
    next();
  });
};

exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      console.log(`Access denied: user role is ${req.user.role}, required role is ${role}`);
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};