import nodemailer from "nodemailer";

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await BookingModel.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: 'after' },
    ).populate("tourId");

    if (status === "allowed") {
      // 1. Setup Email Transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "your-email@gmail.com", pass: "your-app-password" },
      });

      // 2. Email Content
      const mailOptions = {
        from: '"Hariye Tour Agency" <your-email@gmail.com>',
        to: booking.email,
        subject: "Booking Confirmed - View Your Ticket",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #059669;">Booking Confirmed!</h2>
            <p>Hi ${booking.full_name},</p>
            <p>We have received your payment. Your booking for <strong>${booking.tourId.title}</strong> is now officially confirmed.</p>
            <div style="margin: 30px 0;">
              <a href="http://localhost:5173/ticket/${booking.tourId._id}" 
                 style="background: #059669; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                 View My Digital Ticket
              </a>
            </div>
            <p style="font-size: 12px; color: #666;">If the button doesn't work, login to your dashboard on our website.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    }

    res
      .status(200)
      .json({ success: true, message: "Status updated and email sent" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

import BookingModel from "../Models/BookingModel.js";
import TourModel from "../Models/TourModel.js";

// 1. Create a new Booking
export const createBooking = async (req, res) => {
  try {
    const { full_name, email, gender, tourId } = req.body;

    // Input validation
    if (!full_name || !email || !gender || !tourId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: full_name, email, gender, tourId",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate gender
    if (!["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({
        success: false,
        message: "Gender must be Male, Female, or Other",
      });
    }

    // Validate tour exists and is bookable
    const tour = await TourModel.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // Validate tour status
    if (tour.status !== "upcoming") {
      return res.status(400).json({
        success: false,
        message: `Cannot book this tour. Tour status is ${tour.status}`,
      });
    }

    // Validate tour capacity logic
    if (tour.max_Gust < tour.Available_Spots) {
      return res.status(400).json({
        success: false,
        message: "Invalid tour configuration: Max guests cannot be less than available spots",
      });
    }

    // Check if tour is fully booked
    if (tour.Available_Spots <= 0) {
      return res.status(400).json({
        success: false,
        message: "This tour is fully booked. No available spots remaining.",
      });
    }

    // Check if user already has a booking for this tour
    const existingBooking = await BookingModel.findOne({
      email: email,
      tourId: tourId,
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "You have already booked this tour. Multiple bookings are not allowed.",
      });
    }

    // Create new instance
    const newBooking = new BookingModel({
      full_name,
      email,
      gender,
      tourId,
      status: "pending", // Default status
    });

    // Save to MongoDB
    const savedBooking = await newBooking.save();

    // Update available spots (decrement by 1)
    await TourModel.findByIdAndUpdate(tourId, {
      $inc: { Available_Spots: -1 }
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully!",
      data: savedBooking,
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// 2. Read Bookings
export const readBooking = async (req, res) => {
  try {
    const { email } = req.query;
    const filter = email ? { email } : {};
    const bookings = await BookingModel.find(filter).populate("tourId");
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add this if it's missing
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // First, find the booking to get the tourId
    const booking = await BookingModel.findById(id);
    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    // Only allow deletion of pending bookings (not confirmed ones)
    if (booking.status === 'allowed') {
      return res.status(400).json({
        success: false,
        message: "Cannot delete a confirmed booking. Please contact support."
      });
    }

    // Delete the booking
    const deletedBooking = await BookingModel.findByIdAndDelete(id);

    // Increment available spots back
    await TourModel.findByIdAndUpdate(booking.tourId, {
      $inc: { Available_Spots: 1 }
    });

    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



export const getSingleBooking = async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Use findById (NOT findByIdAndUpdate)
    // 2. Use .populate("tourId")
    const booking = await BookingModel.findById(id).populate("tourId");
    
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error("Single Booking Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const verifyAndUseTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await BookingModel.findById(id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Ticket not found." });
    }

    // SECURITY CHECK: Only "allowed" tickets can be used
    if (booking.status === "used") {
      return res.status(400).json({ success: false, message: "CRITICAL: This ticket has already been used!" });
    }

    if (booking.status !== "allowed") {
      return res.status(400).json({ success: false, message: "This ticket is not yet approved for use." });
    }

    // Update status to 'used'
    booking.status = "used";
    await booking.save();

    res.status(200).json({ 
      success: true, 
      message: "Check-in Successful! Ticket is now marked as USED.",
      data: booking 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};