import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import collegeRoutes from "./routes/colleges.js";
import jobRoutes from "./routes/jobs.js";
import examRoutes from "./routes/exams.js";
import careerRoutes from "./routes/careers.js";
import userRoutes from './routes/userRoutes.js';
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();
const app = express();

// ✅ Global CORS middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.use(express.json());


app.use("/api/auth/verify", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

// Routes
app.use("/api/search", searchRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/exams", examRoutes);

app.get("/", (req, res) => res.send("API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
