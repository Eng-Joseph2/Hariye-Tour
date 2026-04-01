import express from "express";
import "dotenv/config";
import cors from "cors";
import passport from "passport";
import connectDb from "./config/db.js";
import TourRouter from "./Routers/TourRouter.js";
import AuthRouter from "./Routers/AuthRouter.js";
import AuthGoogle from "./Routers/AuthGoogle.js";
import "./config/passport.js";
const app = express();
app.use(express.json());
app.use(cors());
connectDb();
app.use(passport.initialize());
app.use("/api", TourRouter);
app.use("/api", AuthRouter);
app.use("/api/auth", AuthGoogle);
app.use("/images", express.static("images"));
app.listen(
  process.env.PORT,
  console.log(`server is runnig on port ${process.env.PORT}`),
);
