const mysql = require('mysql2/promise'); // Using mysql2 library (supports Promises)

// Database configuration (loaded from .env in production, simplified here)
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'your_password',
  database: process.env.DB_NAME || 'charity_events_db',
  port: process.env.DB_PORT || 3306
};

// Create database connection pool (improves performance)
const pool = mysql.createPool(dbConfig);

// Test connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}

testConnection();

module.exports = pool; // Export pool for use in other modules
