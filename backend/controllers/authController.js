const {User} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { sendWelcomeEmail, sendPasswordResetEmail } = require('../utils/emailService');

dotenv.config();

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body; // Include role in destructuring
  const hashedPassword = await bcrypt.hash(password, 10); 
  try {
     // Validate role (only allow "admin" or "user")
     const validRoles = ["admin", "user"];
     const assignedRole = validRoles.includes(role) ? role : "user"; // Default to "user" if invalid
 
    const user = await User.create({ name, email, password:hashedPassword, role:assignedRole }); // Include role in user creation
    sendWelcomeEmail(email, name);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Attempt:", { email, password });
  try {
    const user = await User.findOne({ where: { email } });
    console.log("User Found:", user); 
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `http://yourfrontend.com/reset-password?token=${resetToken}`;
    sendPasswordResetEmail(email, resetLink);
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};