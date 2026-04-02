import express from "express";
import "dotenv/config";
import cors from "cors";
import passport from "passport";
import connectDb from "./config/db.js";
import TourRouter from "./Routers/TourRouter.js";
import AuthRouter from "./Routers/AuthRouter.js";
import AuthGoogle from "./Routers/AuthGoogle.js";
import BookigRouter from "./Routers/BookingTour.js";
import "./config/passport.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Connect Database
connectDb();

// Routes
app.use("/api", TourRouter);
app.use("/api", AuthRouter);
app.use("/api/auth", AuthGoogle);
app.use("/api", BookigRouter); // This makes the path: /api/readBooking
app.use("/images", express.static("images"));

// Test Route
app.get("/test-route", (req, res) => {
  res.send("If you see this, the server is working!");
});

// Start Server
const PORT = process.env.PORT || 9005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
