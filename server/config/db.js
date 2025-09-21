import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const testConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Database connected at:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
};

testConnection();

export default pool;