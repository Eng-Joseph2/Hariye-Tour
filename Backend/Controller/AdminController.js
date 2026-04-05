import AdminModel from "../Models/AdminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "This email has already been registered.",
      });
    }

    const newAdmin = await AdminModel.create({ email, password, role });
    res.status(201).json({ success: true, message: newAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- LOGIN ADMIN ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Raadi admin-ka
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found." });
    }

    // 2. Verify the password (compare the hashed value with the input)
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password is incorrect." });
    }

    // 3. Samee Token (JWT)
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      success: true,
      token,
      admin: { id: admin._id, email: admin.email, role: admin.role },
      message: "Login successful.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- LOGOUT ---
export const logout = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Logout successful." });
};
