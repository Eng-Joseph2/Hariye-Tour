import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../Models/AuthModel.js";
import AdminModel from "../Models/AdminModel.js";

const normalizeEmail = (email) => email?.toLowerCase().trim();
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const AuthRegister = async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!name || !normalizedEmail || !password || !confirm) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (password !== confirm) {
      return res.json({ success: false, message: "Passwords do not match" });
    }

    const existEMail = await AuthModel.findOne({ email: normalizedEmail });
    if (existEMail) {
      return res.json({ success: false, message: "This email is already in use" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const AuthUser = new AuthModel({ name, email: normalizedEmail, password: hashPassword });
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
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return res.json({ success: false, message: "Email and password are required" });
    }

    // Check admin accounts first so admins can login through the same endpoint.
    const adminEmailPattern = new RegExp(`^${escapeRegExp(normalizedEmail)}$`, "i");
    let account = await AdminModel.findOne({ email: { $regex: adminEmailPattern } });
    let role = "user";

    if (account) {
      role = account.role || "Admin";
      if (!account.password) {
        return res.json({ success: false, message: "This account does not have a password. Please sign in with the appropriate provider." });
      }
    } else {
      account = await AuthModel.findOne({ email: normalizedEmail });
      if (!account) {
        return res.json({ success: false, message: "Invalid email or password" });
      }
      if (!account.password) {
        return res.json({ success: false, message: "This account was created with Google login. Please sign in with Google." });
      }
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: account._id, role }, process.env.JWT_SECRET, { expiresIn: "2d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Login successful", role, user: { id: account._id, name: account.name, email: account.email, role } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const AdminRegister = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const emailPattern = new RegExp(`^${escapeRegExp(normalizedEmail)}$`, "i");
    const existingAdmin = await AdminModel.findOne({ email: { $regex: emailPattern } });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "This email has already been registered." });
    }

    const newAdmin = await AdminModel.create({ email: normalizedEmail, password, role });
    res.status(201).json({ success: true, message: newAdmin });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const normalizedEmail = normalizeEmail(email);
    const emailPattern = new RegExp(`^${escapeRegExp(normalizedEmail)}$`, "i");
    const admin = await AdminModel.findOne({ email: { $regex: emailPattern } });

    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    let isMatch = await bcrypt.compare(password, admin.password);
    const plainTextPasswordDetected = admin.password && !/^\$2[aby]\$\d{2}\$.{53}$/.test(admin.password);

    if (!isMatch && plainTextPasswordDetected && password === admin.password) {
      admin.password = password;
      await admin.save();
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ success: true, token, user: { id: admin._id, email: admin.email, role: admin.role }, message: "Login successful." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const AdminLogout = (req, res) => {
  res.status(200).json({ success: true, message: "Logout successful." });
};

export const ReadAuth = async (req, res) => {
  const read = await AuthModel.find();
  if (!read) {
    return res.status(400).json({ success: false, message: "sorry we dont reas" });
  }

  return res.status(200).json({ success: true, data: read });
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
    const { id } = req.params;
    const deletedUser = await AuthModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
