import BookingModel from "../Models/BookingModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await BookingModel.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const isAllowed = status === "allowed";
    
    const mailOptions = {
      from: `"Hariye Tour Agency" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: isAllowed ? "Booking Confirmed! ✅" : "Booking Update ❌",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: ${isAllowed ? "#10b981" : "#ef4444"}">
            Hello, ${booking.full_name}!
          </h2>
          <p>Your tour booking status has been updated to: <strong>${status.toUpperCase()}</strong>.</p>
          <p>${isAllowed ? "We are excited to welcome you on the tour!" : "We regret to inform you that your request was not accepted at this time."}</p>
          <br/>
          <p>Best regards,<br/><strong>Hariye Tour Team</strong></p>
        </div>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      success: true, 
      message: `Booking has been ${status === "allowed" ? "confirmed" : "rejected"}.` 
    });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, error: "Failed to send email notification." });
  }
};
