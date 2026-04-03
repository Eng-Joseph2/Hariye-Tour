import nodemailer from "nodemailer";

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await BookingModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
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

// 1. Create a new Booking
export const createBooking = async (req, res) => {
  try {
    const { full_name, email, gender, tourId } = req.body;

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

    res.status(201).json({
      success: true,
      message: "Booking created successfully!",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      error: error.message,
    });
  }
};

// 2. Read all Bookings (The one we fixed earlier)
export const readBooking = async (req, res) => {
  try {
    const bookings = await BookingModel.find().populate("tourId");
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add this if it's missing
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await BookingModel.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
