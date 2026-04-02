import express from "express";
import { createBooking, ReadBooking } from "../Controller/BookingController.js";
import { updateBookingStatus } from "../Controller/updateBookingStatus.js";

const router = express.Router();

// Si macaamiisha u diiwaangashadaan
router.post("/bookingRegister", createBooking);

// Si Admin-ka u arko liiska
router.get("/readBooking", ReadBooking);

// Si loo aqbalo ama loo diido (Email-ka halkan ayuu ku jiraa)
router.put("/updateBookingStatus/:id", updateBookingStatus);

export default router;
