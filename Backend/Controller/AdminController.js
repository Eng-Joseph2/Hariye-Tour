import AdminModel from "../Models/AdminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    let { email, password, role } = req.body;
    email = email.toLowerCase().trim();

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
    let { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    email = email.toLowerCase().trim();

    // 1. Raadi admin-ka
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // 2. Verify the password (compare the hashed value with the input)
    let isMatch = await bcrypt.compare(password, admin.password);

    // Support legacy records where the password was saved in plain text
    const plainTextPasswordDetected =
      admin.password && !/^\$2[aby]\$\d{2}\$.{53}$/.test(admin.password);

    if (!isMatch && plainTextPasswordDetected) {
      if (password === admin.password) {
        // Rehash the stored plain password for security and update the record.
        admin.password = password;
        await admin.save();
        isMatch = true;
      }
    }

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
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
      user: { id: admin._id, email: admin.email, role: admin.role },
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
