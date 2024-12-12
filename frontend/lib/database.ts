import mysql from 'mysql2/promise';

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'ThirteenF',
  port: parseInt(process.env.DB_PORT || '3306', 10),
});

export const db = {
  query: async (sql: string, params?: unknown[]) => {
    const [results] = await pool.query(sql, params);
    return results;
  },
};