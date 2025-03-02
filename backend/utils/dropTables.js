const { Client } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

const dropTables = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const sqlFilePath = path.join(__dirname, '../sql/drop_tables.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    await client.query(sql);
    console.log('Tables dropped successfully');
  } catch (err) {
    console.error('Error dropping tables:', err);
  } finally {
    await client.end();
    console.log('Disconnected from PostgreSQL');
  }
};

dropTables();