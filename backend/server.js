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
  origin: "https://prep-genius-ashen.vercel.app",
  credentials: true
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://prep-genius-ashen.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});