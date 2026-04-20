import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Product name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  stock: {
    type: Number,
    default: 1,
  },
  totalSold: {
    type: Number,
    default: 0,
  },
});

export const Product = mongoose.model("Product", productSchema);
