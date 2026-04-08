import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDb from "./config/db.js";
import TourRouter from "./Routers/TourRouter.js";
import BookigRouter from "./Routers/BookingTour.js";
import AuthRouter from "./Routers/AuthRouter.js";
import { seedInitialSuperAdmin } from "./Controller/AuthController.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

connectDb().then(seedInitialSuperAdmin).catch((error) => {
  console.error("Failed to seed super admin:", error);
});

app.use("/api", TourRouter);
app.use("/api", BookigRouter);
app.use("/api", AuthRouter);
app.use("/images", express.static("images"));

app.get("/test-route", (req, res) => {
  res.send("If you see this, the server is working!");
});

const PORT = process.env.PORT || 9005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
