import express from "express";
import {
  getCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} from "../controllers/careersController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getCareers);
router.get("/:id", getCareerById);
router.post("/", protect, adminOnly, createCareer);
router.put("/:id", protect, adminOnly, updateCareer);
router.delete("/:id", protect, adminOnly, deleteCareer);

export default router;
