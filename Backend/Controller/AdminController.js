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
        message: "Email-kan horay ayaa loo diwaangeliyey",
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
        .json({ success: false, message: "Admin-kan lama helin" });
    }

    // 2. Hubi password-ka (Isbarbardhig kan hashed ah iyo kan lasoo qoray)
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password-ka waa khalad" });
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
      message: "Si guul leh ayaad u gashay",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- LOGOUT ---
export const logout = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Si guul leh ayaad u baxday" });
};
