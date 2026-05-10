import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import fs from "fs";
import path from "path";

const app = express();
app.set("trust proxy", 1);

const allowOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allow by Cors"));
      }
    },
    credentials: true,
  }),
);
//
const uploadPath = path.join(process.cwd(), "uploads", "users");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("Uploads/users folder created successfully!");
} else {
  console.log("Uploads folder already exists.");
}
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
