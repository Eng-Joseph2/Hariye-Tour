import express from "express";
import { createBooking, ReadBooking } from "../Controller/BookingController.js";

const router = express.Router();
router.post("/bookingRegister", createBooking);
router.get("/readBooking", ReadBooking);

export default router;
