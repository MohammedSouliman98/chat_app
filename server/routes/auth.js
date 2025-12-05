import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();
import User from "../models/Users.js";

function createAccessToken(user) {
  return jwt.sign(
    { name: user.name, email: user.email, id: user.id },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "900s",
    }
  );
}

// ,

router.use(express.json());

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "enter email " });
  }
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    console.log("password : ", hashpassword);
    const user = await User.create({ name, email, password: hashpassword });
    const token = createAccessToken(user);

    res.status(201).json({
      message: "created success",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "enter email " });
  }
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials 1" });
    }
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    // console.log(isValidPassword);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid credentials 2" });
    }

    const token = createAccessToken(existingUser);

    res.status(201).json({
      message: "Login success",
      token: token,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
