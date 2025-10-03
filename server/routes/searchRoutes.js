// routes/searchRoutes.js
import express from "express";
import pool from "../config/db.js"; // your PostgreSQL connection

const router = express.Router();

router.get("/", async (req, res) => {
  const { q } = req.query;
  if (!q || q.trim() === "") {
    return res.json({ colleges: [], exams: [], careers: [] });
  }

  try {
    const searchTerm = `%${q}%`;

    const [colleges, exams, careers] = await Promise.all([
      pool.query(
        "SELECT id, name, city, state, country FROM colleges WHERE name ILIKE $1 OR city ILIKE $1 OR state ILIKE $1 LIMIT 10",
        [searchTerm]
      ),
      pool.query(
        "SELECT id, name, conducting_body, level FROM exams WHERE name ILIKE $1 OR conducting_body ILIKE $1 LIMIT 10",
        [searchTerm]
      ),
      pool.query(
        "SELECT id, title, field, specialization FROM careers WHERE title ILIKE $1 OR field ILIKE $1 OR specialization ILIKE $1 LIMIT 10",
        [searchTerm]
      ),
    ]);

    res.json({
      colleges: colleges.rows,
      exams: exams.rows,
      careers: careers.rows,
    });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;