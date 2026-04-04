import express from "express";
import {
  AuthLogin,
  AuthLogout,
  AuthRegister,
  deleteUser,
  ReadAuth,
} from "../Controller/AuthController.js";

const router = express.Router();
router.post("/register", AuthRegister);
router.post("/login", AuthLogin);
router.get("/readAuth", ReadAuth);
router.post("/logout", AuthLogout);
router.delete("/delete/:id", deleteUser);
export default router;
