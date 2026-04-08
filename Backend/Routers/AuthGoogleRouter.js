import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = express.Router();

// Start Google login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Redirect to frontend
    res.redirect(`http://localhost:5174/login-success?token=${token}`);
  }
);

export default router;