import express from "express";
import pool from "../config/db.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all saved colleges for the logged-in user
router.get("/saved-colleges", protect, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT c.* 
       FROM user_saved_colleges uc
       JOIN colleges c ON uc.college_id = c.id
       WHERE uc.user_id = $1
       ORDER BY c.id DESC`,
      [userId]
    );

    res.json(result.rows); 
  } catch (err) {
    console.error("Error fetching saved colleges:", err);
    res.status(500).json({ error: "Error fetching saved colleges" });
  }
});

// GET recommended jobs for logged-in user
router.get("/recommended-jobs", protect, async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `SELECT j.* 
       FROM user_recommended_jobs uj
       JOIN jobs j ON uj.job_id = j.id
       WHERE uj.user_id = $1
       ORDER BY j.id DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching recommended jobs:", err);
    res.status(500).json({ error: "Error fetching recommended jobs" });
  }
});

// DELETE a saved college for logged-in user
router.delete("/remove-college", protect, async (req, res) => {
  const userId = req.user.id;
  const { collegeId } = req.body;

  if (!collegeId) {
    return res.status(400).json({ error: "collegeId is required" });
  }

  try {
    await pool.query(
      `DELETE FROM user_saved_colleges
       WHERE user_id = $1 AND college_id = $2`,
      [userId, collegeId]
    );

    res.status(200).json({ message: "College removed successfully" });
  } catch (err) {
    console.error("Error removing college:", err);
    res.status(500).json({ error: "Error removing college" });
  }
});

// POST save a college for logged-in user
router.post("/save-college", protect, async (req, res) => {
  const userId = req.user.id;
  const { collegeId } = req.body;

  if (!collegeId) {
    return res.status(400).json({ error: "collegeId is required" });
  }

  try {
    await pool.query(
      `INSERT INTO user_saved_colleges (user_id, college_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, college_id) DO NOTHING`,
      [userId, collegeId]
    );

    res.status(201).json({ message: "College saved successfully" });
  } catch (err) {
    console.error("Error saving college:", err);
    res.status(500).json({ error: "Error saving college" });
  }
});

export default router;
