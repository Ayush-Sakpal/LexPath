import express from "express";
import { signup, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Verify token
router.get("/verify", authMiddleware, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

export default router;