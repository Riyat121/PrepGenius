import dotenv from "dotenv";
import express from "express";
const app = express();
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import interviewRoutes from "./src/routes/interviewRoutes.js";
 // load env variables
import cors from "cors";
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));

app.use(express.json());

// connect to database
connectDB();
console.log("Connected to MongoDB");

app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);
// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(typeof pdfParse);
  
});