import express from "express";
import { signup, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { findUserById } from "../models/userModel.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Verify token
router.get("/verify", protect, async (req, res) => {
  try {
    const user = await findUserById(req.user.id); // fetch full user
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      message: "Token is valid",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;