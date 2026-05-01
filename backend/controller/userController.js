import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const newUser = await User.create(userData);

    return res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserExist = await User.findOne({ email: email });
    if (!isUserExist) {
      return res.status(400).json({ message: "email is not registered" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password,
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await jwt.sign(
      { userId: isUserExist._id },
      process.env.jwt_secret,
      { expiresIn: process.env.jwt_expiration },
    );

    return res
      .status(200)
      .json({ message: "Login successful", token: token, user: isUserExist });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
