import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthModel from "../Models/AuthModel.js";

export const AuthRegister = async (req, res) => {
  try {
    const { name, email, password, confirm } = req.body;
    if (!name || !email || !password || !confirm) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (password !== confirm) {
      return res.json({ success: false, message: "Passwords do not match" });
    }
    const existEMail = await AuthModel.findOne({ email });
    if (existEMail) {
      return res.json({
        success: false,
        message: "This email is already in use",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const AuthUser = new AuthModel({
      name,
      email,
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
    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }
    const user = await AuthModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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
      user: { id: user._id, name: user.name, email: user.email },
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
