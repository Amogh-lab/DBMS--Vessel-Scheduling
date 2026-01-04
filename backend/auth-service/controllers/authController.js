import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByUsername, createUser } from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { user_id, username, password, role, vessel_id, plant_id } = req.body;

    const exists = await findUserByUsername(username);
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser({
      user_id,
      username,
      password: hashedPassword,
      role,
      vessel_id,
      plant_id
    });

    res.status(201).json({ message: "User registered", user });
  } catch {
    res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role,
        vessel_id: user.vessel_id,
        plant_id: user.plant_id
      },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res.json({ token });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
};

export const logout = async (req, res) => {
  res.json({ message: "Logout successful" });
};

export const getMe = async (req, res) => {
  res.json({
    user_id: req.user.user_id,
    role: req.user.role,
    vessel_id: req.user.vessel_id || null,
    plant_id: req.user.plant_id || null
  });
};
