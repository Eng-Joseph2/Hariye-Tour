import crypto from "crypto";
import User from "../Models/UserModel.js";

const HASH_ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

const createPasswordHash = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, HASH_ITERATIONS, KEY_LENGTH, DIGEST)
    .toString("hex");
  return `${salt}:${hash}`;
};

const verifyPassword = (password, storedHash) => {
  if (!storedHash) return false;

  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;

  const verify = crypto
    .pbkdf2Sync(password, salt, HASH_ITERATIONS, KEY_LENGTH, DIGEST)
    .toString("hex");

  return verify === hash;
};

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide full name, email, and password.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const passwordHash = createPasswordHash(password);
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: "user",
    });

    return res.status(201).json({
      message: "Registration successful.",
      data: sanitizeUser(newUser),
    });
  } catch (error) {
    console.error("Register user error:", error);
    return res.status(500).json({ message: "Unable to register user." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    return res.status(200).json({
      message: "Login successful.",
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Login user error:", error);
    return res.status(500).json({ message: "Unable to log in." });
  }
};

export const readUsers = async (req, res) => {
  try {
    const users = await User.find({}, "name email role").lean();
    return res.status(200).json({ message: "Users fetched.", data: users });
  } catch (error) {
    console.error("Read users error:", error);
    return res.status(500).json({ message: "Unable to fetch users." });
  }
};

export const readCustomers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }, "name email role").sort({ createdAt: -1 }).lean();
    return res.status(200).json({ message: "Customers fetched.", data: users });
  } catch (error) {
    console.error("Read customers error:", error);
    return res.status(500).json({ message: "Unable to fetch customers." });
  }
};

export const readAdmins = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["admin", "superadmin"] } }, "name email role").sort({ createdAt: -1 }).lean();
    return res.status(200).json({ message: "Admins fetched.", data: users });
  } catch (error) {
    console.error("Read admins error:", error);
    return res.status(500).json({ message: "Unable to fetch admins." });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id, name, email, currentPassword, newPassword } = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({ message: "ID, name, and email are required." });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword || !verifyPassword(currentPassword, user.passwordHash)) {
        return res.status(401).json({ message: "Current password is incorrect." });
      }
      user.passwordHash = createPasswordHash(newPassword);
    }

    user.name = name.trim();
    user.email = email.toLowerCase().trim();
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Unable to update profile." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).json({ message: "Unable to delete user." });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role = "admin" } = req.body;
    const requestedBySuperAdmin = req.headers["x-super-admin"] === "true";

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, password, and role are required.",
      });
    }

    const normalizedRole = role.toLowerCase().replace(" ", "");
    const targetRole = normalizedRole === "superadmin" ? "superadmin" : "admin";
    const adminCount = await User.countDocuments({
      role: { $in: ["admin", "superadmin"] },
    });

    if (adminCount > 0 && !requestedBySuperAdmin) {
      return res.status(403).json({
        message: "Only a super admin can create additional admin accounts.",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const passwordHash = createPasswordHash(password);
    const newAdmin = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role: targetRole,
    });

    return res.status(201).json({
      message: "Admin account created successfully.",
      data: sanitizeUser(newAdmin),
    });
  } catch (error) {
    console.error("Register admin error:", error);
    return res.status(500).json({ message: "Unable to create admin account." });
  }
};

export const seedInitialSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await User.findOne({ role: "superadmin" });
    if (existingSuperAdmin) {
      return;
    }

    const email =
      process.env.SUPER_ADMIN_EMAIL?.trim().toLowerCase() ||
      "superadmin@hariye.com";
    const password = process.env.SUPER_ADMIN_PASSWORD || "SuperAdmin123!";

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return;
    }

    const passwordHash = createPasswordHash(password);
    await User.create({
      name: "Super Admin",
      email,
      passwordHash,
      role: "superadmin",
    });

    console.log(
      `Super admin seeded: ${email} / ${password} (change via env vars)`,
    );
  } catch (error) {
    console.error("Super admin seed error:", error);
  }
};
