import cloudinary from "../config/cloudinary.js";
import { Product } from "../models/productModel.js";

export async function createProduct(req, res) {
  try {
    const { productName, price, description, image, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    console.log(req.file);

    const imageUrl = await cloudinary.uploader.upload(req.file.path, {
      folder: "Testing",
    });

    const result = imageUrl.secure_url;

    const newProduct = new Product({
      productName: productName,
      price: price,
      description: description,
      image: result,
    });

    await newProduct.save();
    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
}

export async function getAllProduct(req, res) {
  try {
    const products = await Product.find({});
    return res
      .status(200)
      .json({ message: "Products retrieved successfully", products: products });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get products", error: error.message });
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.find({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product retrieved successfully", product: product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get product", error: error.message });
  }
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { productName, price, description, image, stock, totalSold } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (productName !== undefined) product.productName = productName;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (image !== undefined) product.image = image;
    if (stock !== undefined) product.stock = stock;
    if (totalSold !== undefined) product.totalSold = totalSold;

    await product.save();
    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
}
