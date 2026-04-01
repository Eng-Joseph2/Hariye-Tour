import express from "express";
import { createBooking } from "../Controller/BookingController.js";
const router = express();
router.post("/bookingRegister", createBooking);
export default router;
