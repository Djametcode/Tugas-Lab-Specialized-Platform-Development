import express from "express";
import {
  getAllProduct,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductById,
} from "../controller/productController.js";
import upload from "../utils/multer.js";

const route = express.Router();

route.get("/get-all-products", getAllProduct);
route.post("/create-product", upload.single("image"), createProduct);
route.get("/get-product/:id", getProductById);
route.put("/update-product/:id", upload.single("image"), updateProduct);
route.delete("/delete-product/:id", deleteProduct);

export const productRoutes = route;
