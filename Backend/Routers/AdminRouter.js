import express from "express";
import {
  getDefaultAdmin,
  logoutAdmin,
  loginAdmin,
} from "../Controller/AdminController.js";

const router = express.Router();

router.get("/default-admin", getDefaultAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

export default router;
