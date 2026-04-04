import express from "express";
import { updateBookingStatus } from "../Controller/updateBookingStatus.js";
import {
  createBooking,
  deleteBooking,
  getSingleBooking,
  readBooking,
  verifyAndUseTicket,
} from "../Controller/BookingController.js";

const router = express.Router();
router.post("/bookingRegister", createBooking);
router.get("/readBooking", readBooking);
router.put("/updateBookingStatus/:id", updateBookingStatus);
router.delete("/deleteBooking/:id", deleteBooking);
// Add this line to your existing routes
router.get("/readBooking/:id", getSingleBooking);
router.put("/verify-ticket/:id", verifyAndUseTicket);

export default router;
