import express from "express";
import { register, login, logout } from "../Controller/AdminController.js"; // Hubi magaca faylka

const router = express.Router();

// Register Admin cusub
router.post("/admin-register", register);

// Login Admin
router.post("/admin-login", login);

// Logout Admin
router.post("/admin-logout", logout);

export default router;
