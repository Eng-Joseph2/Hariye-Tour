import express from "express";
import { AdminRegister, AdminLogin, AdminLogout } from "../Controller/AuthController.js";

const router = express.Router();

// Register Admin cusub
router.post("/admin-register", AdminRegister);

// Login Admin
router.post("/admin-login", AdminLogin);

// Logout Admin
router.post("/admin-logout", AdminLogout);

export default router;
