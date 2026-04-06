import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../Models/AuthModel.js";
import AdminModel from "../Models/AdminModel.js";

const normalizeEmail = (email) => email.toLowerCase().trim();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // 🔍 Check Admin first
    let user = await AdminModel.findOne({ email: normalizedEmail });
    let role = "SuperAdmin";

    // 🔍 If not admin → check user
    if (!user) {
      user = await AuthModel.findOne({ email: normalizedEmail });
      role = "user";
    }

    // ❌ No account found
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🎟️ Token
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    return res.json({
      success: true,
      token,
      role,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || "Admin",
        role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};