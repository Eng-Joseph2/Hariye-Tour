import bcrypt from "bcryptjs";
import AdminModel from "../Models/AdminModel.js";
import jwt from "jsonwebtoken";
export const getDefaultAdmin = async (req, res) => {
  try {
    const existingAdmin = await AdminModel.findOne({
      email: "Admin@gmail.com",
    });
    if (existingAdmin) {
      return res.status(200).json({
        success: true,
        admin: existingAdmin,
      });
    }

    const hashedPassword = await bcrypt.hash("123456", 10);
    const newAdmin = new AdminModel({
      username: "Maxamed Axmed",
      email: "Admin@gmail.com",
      password: hashedPassword,
      role: "Admin",
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      admin: newAdmin,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Si guul ah ayaad uga baxday (Logged out).",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Logout-ka wuu fashilmay!", error: error.message });
  }
};

// Hubi inaad install gareysay: npm install jsonwebtoken

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Ma jiraa admin email-kan leh?
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin-kan lama helin!" });
    }

    // 2. Password-ka ma sax yahay?
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password-ka waa khaldan yahay!" });
    }

    // 3. Samee Token (JWT)
    const token = jwt.sign({ id: admin._id }, "SIR_WA_LO_YAHAY", {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ... (Koodkaagii hore ee getDefaultAdmin iyo logoutAdmin halkooda ha joogaan)
