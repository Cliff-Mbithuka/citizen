const { Client } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables from the .env file in the backend directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

const executeProcedures = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const sqlFilePath = path.join(__dirname, '../sql/create_tables.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    await client.query(sql);
    console.log('Stored procedures created successfully');

    const procedures = [
      'CALL create_users_table();',
      'CALL create_incidents_table();',
      'CALL create_polls_table();',
      'CALL create_poll_options_table();',
      'CALL create_poll_votes_table();',
    ];

    for (const procedure of procedures) {
      await client.query(procedure);
      console.log(`Executed: ${procedure}`);
    }

    console.log('All procedures executed successfully');
  } catch (err) {
    console.error('Error executing procedures:', err);
  } finally {
    await client.end();
    console.log('Disconnected from PostgreSQL');
  }
};

executeProcedures();