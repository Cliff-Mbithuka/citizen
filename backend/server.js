const app = require('./app');
const dotenv = require('dotenv');
// const { sequelize } = require('./config/dbConfig');
// const { connectDB } = require('./config/dbConfig');
const db = require("./models");  // ✅ Correct import
// Import associations

dotenv.config();

// Connect to database
// connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    // Sync all models and connect to the database
    await db.sequelize.sync({ alter: true });
    console.log("✅ Database & tables synced successfully!");
  } catch (error) {
    console.error("❌ Database sync error:", error);
  }
});

// // Sync all models
// sequelize.sync({ alter: true }).then(() => {
//   console.log('Database & tables created!');
// });