import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./database/connectDB.js";
import { productRoutes } from "./routes/productRoutes.js";
import { v2 as cloudinary } from "cloudinary";
import dns from "dns";
import { authRoutes } from "./routes/authRoutes.js";
dns.setServers(["1.1.1.1"]);

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/tokoku-tugas-lab/auth", authRoutes);
app.use("/api/v1/tokoku-tugas-lab/product", productRoutes);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(3000, () => console.log("Server is running on port 3000"));
  } catch (error) {
    return console.log(error);
  }
};

startServer();
