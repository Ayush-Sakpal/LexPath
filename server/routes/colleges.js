import express from "express";
import { getColleges, getCollegeById, createCollege, updateCollege, deleteCollege } from "../controllers/collegesController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getColleges);
router.get("/:id", getCollegeById);
router.post("/", protect, adminOnly, createCollege);
router.put("/:id", protect, adminOnly, updateCollege);
router.delete("/:id", protect, adminOnly, deleteCollege);

export default router;