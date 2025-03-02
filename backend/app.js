const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const pollRoutes = require('./routes/pollRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require("cors");


const app = express();

// ✅] Allow requests from frontend
// app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(cors());

//  Allow all methods (GET, POST, etc.)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;