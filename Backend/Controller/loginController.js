// backend/controllers/UnifiedAuthController.js
import AdminModel from "../Models/AdminModel.js";
import AuthModel from "../Models/AuthModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const unifiedLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check Admin Collection first
    let account = await AdminModel.findOne({ email });
    let role = "user"; // Default role

    if (account) {
      role = account.role; // e.g., "SuperAdmin" or "Admin"
    } else {
      // 2. Check User Collection if not an admin
      account = await AuthModel.findOne({ email });
      if (!account) {
        return res.status(401).json({ success: false, message: "Email ama Password khaldan!" });
      }
    }

    // 3. Verify Password
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Email ama Password khaldan!" });
    }

    // 4. Create Token with Role
    const token = jwt.sign(
      { id: account._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 5. Send Response with Role
    res.status(200).json({
      success: true,
      token,
      role: role, // Send role back to frontend
      user: {
        id: account._id,
        email: account.email,
        name: account.name || "Admin",
        role: role
      },
      message: "Si guul leh ayaad u gashay"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};