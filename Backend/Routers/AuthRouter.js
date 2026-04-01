import express from "express";
import {
  AuthLogin,
  AuthRegister,
  ReadAuth,
} from "../Controller/AuthController.js";

const router = express.Router();
router.post("/register", AuthRegister);
router.post("/login", AuthLogin);
router.get("/readAuth", ReadAuth);
export default router;
