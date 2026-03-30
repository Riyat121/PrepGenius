import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import interviewRoutes from "./src/routes/interviewRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ SIMPLE CORS (WORKING)
app.use(cors({
  origin: "*"
}));

// ✅ JSON parser
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});