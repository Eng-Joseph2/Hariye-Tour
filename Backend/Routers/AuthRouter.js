import express from "express";
import {
  loginUser,
  registerUser,
  registerAdmin,
  readUsers,
  readCustomers,
  readAdmins,
  deleteUser,
  updateProfile,
} from "../Controller/AuthController.js";

const router = express.Router();

router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);
router.post("/auth/register-admin", registerAdmin);
router.get("/readAuth", readUsers); // keep for backward compatibility
router.get("/readUser", readCustomers);
router.get("/readAdmin", readAdmins);
router.put("/auth/update-profile", updateProfile);
router.delete("/deleteUser/:id", deleteUser);

export default router;
