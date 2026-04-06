import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthModel from "../Models/AuthModel.js";
import AdminModel from "../Models/AdminModel.js";

const normalizeEmail = (email) =>
  typeof email === "string" ? email.toLowerCase().trim() : "";

const generateToken = (userId, role) =>
  jwt.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: "2d" });

const buildUserResponse = (user, role) => ({
  id: user._id,
  email: user.email,
  name: user.name || (role === "SuperAdmin" ? "Admin" : "User"),
  role,
});

export const AuthRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!name || !normalizedEmail || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await AuthModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await AuthModel.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id, "user");
    return res.status(201).json({
      success: true,
      token,
      role: "user",
      user: buildUserResponse(newUser, "user"),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const AuthLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await AuthModel.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, "user");
    return res.json({
      success: true,
      token,
      role: "user",
      user: buildUserResponse(user, "user"),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const ReadAuth = async (req, res) => {
  try {
    const users = await AuthModel.find({}, "-password -__v");
    return res.json({ success: true, data: users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const AuthLogout = async (req, res) => {
  try {
    return res.json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await AuthModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ success: true, message: "User removed" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const AdminRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingAdmin = await AdminModel.findOne({ email: normalizedEmail });
    if (existingAdmin) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const newAdmin = await AdminModel.create({
      email: normalizedEmail,
      password,
    });

    const token = generateToken(newAdmin._id, "SuperAdmin");
    return res.status(201).json({
      success: true,
      token,
      role: "SuperAdmin",
      user: buildUserResponse(newAdmin, "SuperAdmin"),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const AdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const admin = await AdminModel.findOne({ email: normalizedEmail });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password || "");
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(admin._id, "SuperAdmin");
    return res.json({
      success: true,
      token,
      role: "SuperAdmin",
      user: buildUserResponse(admin, "SuperAdmin"),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const AdminLogout = async (req, res) => {
  try {
    return res.json({ success: true, message: "Admin logged out successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};
