import express from "express";
import {
  getExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
} from "../controllers/examsController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getExams);
router.get("/:id", getExamById);
router.post("/", protect, adminOnly, createExam);
router.put("/:id", protect, adminOnly, updateExam);
router.delete("/:id", protect, adminOnly, deleteExam);

export default router;