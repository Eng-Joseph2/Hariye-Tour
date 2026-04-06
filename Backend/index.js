import express from "express";
import "dotenv/config";
import cors from "cors";
import passport from "passport";
import connectDb from "./config/db.js";
import TourRouter from "./Routers/TourRouter.js";
import AuthRouter from "./Routers/AuthRouter.js";
import AuthGoogle from "./Routers/AuthGoogle.js";
import BookigRouter from "./Routers/BookingTour.js";
import AdminRouter from "./Routers/AdminRouter.js";
import "./config/passport.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://hariye-tour-agency.vercel.app"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(passport.initialize());
connectDb();

app.use("/api", TourRouter);
app.use("/api", AuthRouter);
app.use("/api/auth", AuthGoogle);
app.use("/api", BookigRouter);
app.use("/api", AdminRouter);
app.use("/images", express.static("images"));

app.get("/test-route", (req, res) => {
  res.send("If you see this, the server is working!");
});

const PORT = process.env.PORT || 9005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
