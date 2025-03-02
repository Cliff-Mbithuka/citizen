const { sequelize } = require('./models'); // Adjust path if necessary

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  } finally {
    await sequelize.close(); // Close connection after test
  }
}

testConnection();
