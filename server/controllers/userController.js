// controllers/userController.js
import User from "../models/userModel.js";

export const saveCollege = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { collegeId } = req.body;

    if (!collegeId) {
      return res.status(400).json({ message: "collegeId required" });
    }

    const user = await User.findById(userId);

    // Prevent duplicates
    const alreadySaved = user.savedColleges.some(
      (c) => c.collegeId === collegeId
    );
    if (alreadySaved) {
      return res.status(400).json({ message: "College already saved" });
    }

    user.savedColleges.push({ collegeId });
    await user.save();

    res.json({ message: "College saved", savedColleges: user.savedColleges });
  } catch (error) {
    console.error("Save college error:", error);
    res.status(500).json({ message: "Server error" });
  }
};