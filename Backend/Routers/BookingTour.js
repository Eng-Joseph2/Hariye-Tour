import express from "express";
import { updateBookingStatus } from "../Controller/updateBookingStatus.js";
import {
  createBooking,
  deleteBooking,
  readBooking,
} from "../Controller/BookingController.js";

const router = express.Router();
router.post("/bookingRegister", createBooking);
router.get("/readBooking", readBooking);
router.put("/updateBookingStatus/:id", updateBookingStatus);
router.delete("/deleteBooking/:id", deleteBooking);

export default router;
