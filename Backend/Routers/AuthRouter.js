import express from "express";
import {
  Login,
  AuthLogout,
  AuthRegister,
  deleteUser,
  ReadAuth,
} from "../Controller/AuthController.js";

const router = express.Router();
router.post("/register", AuthRegister);
router.post("/login", Login);
router.get("/readAuth", ReadAuth);
router.post("/logout", AuthLogout);
router.delete("/delete/:id", deleteUser);
export default router;
