import express from "express";
import pool from "../config/db.js"; // PostgreSQL connection
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Save a college (no need for :id in URL anymore)
router.post("/save-college", protect, async (req, res) => {
  const userId = req.user.id;   // 👈 extracted from JWT in protect middleware
  const { collegeId } = req.body;

  try {
    await pool.query(
      `INSERT INTO user_saved_colleges (user_id, college_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, college_id) DO NOTHING`,
      [userId, collegeId]
    );

    res.status(200).json({ message: "College saved successfully" });
  } catch (err) {
    console.error("Error saving college:", err);
    res.status(500).json({ error: "Error saving college" });
  }
});

export default router;
