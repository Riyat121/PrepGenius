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
  origin: [
    "http://localhost:5173",
    "https://prep-genius-ashen.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ JSON parser
app.use(express.json());

// connect DB
connectDB();
app.options("*", cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});