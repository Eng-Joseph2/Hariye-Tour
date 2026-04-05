import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthModel from "../Models/AuthModel.js";
import AdminModel from "../Models/AdminModel.js";

export const AuthRegister = async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();

    if (!name || !normalizedEmail || !password || !confirm) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (password !== confirm) {
      return res.json({ success: false, message: "Passwords do not match" });
    }
    const existEMail = await AuthModel.findOne({ email: normalizedEmail });
    if (existEMail) {
      return res.json({
        success: false,
        message: "This email is already in use",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const AuthUser = new AuthModel({
      name,
      email: normalizedEmail,
      password: hashPassword,
    });

    await AuthUser.save();
    const token = jwt.sign({ id: AuthUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Registered Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const AuthLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();

    if (!normalizedEmail || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    // First check admin accounts so admins can login through the unified login endpoint.
    let account = await AdminModel.findOne({ email: normalizedEmail });
    let role = "user";

    if (account) {
      role = account.role || "Admin";
      if (!account.password) {
        return res.json({
          success: false,
          message: "This account does not have a password. Please sign in with the appropriate provider.",
        });
      }
    } else {
      account = await AuthModel.findOne({ email: normalizedEmail });
      if (!account) {
        return res.json({ success: false, message: "Invalid email or password" });
      }
      if (!account.password) {
        return res.json({
          success: false,
          message: "This account was created with Google login. Please sign in with Google.",
        });
      }
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: account._id, role }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      success: true,
      message: "Login successful",
      role,
      user: {
        id: account._id,
        name: account.name,
        email: account.email,
        role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const ReadAuth = async (req, res) => {
  const read = await AuthModel.find();
  if (!read) {
    return res
      .status(400)
      .json({ success: false, message: "sorry we dont reas" });
  }

  return res.status(500).json({ success: true, data: read });
};

export const AuthLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Assumes you're passing /delete/:id in your routes

    const deletedUser = await AuthModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
