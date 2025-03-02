const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err);
      return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
    console.log('Token verified, user:', user);
    req.user = user;
    next();
  });
};


exports.checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    console.log(`🔍 Checking Role - User Role: ${req.user.role}, Allowed Roles: ${allowedRoles}`);

    if (!req.user || !req.user.role) {
      console.log("⛔ No role found in request");
      return res.status(403).json({ message: "Access denied: No user role found" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.log(`⛔ Access denied: User role is ${req.user.role}, required roles are ${allowedRoles}`);
      return res.status(403).json({ message: `Access denied: Requires ${allowedRoles.join(" or ")}` });
    }

    console.log("✅ Role authorized");
    next();
  };
};
