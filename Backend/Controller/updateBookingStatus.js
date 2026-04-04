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
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: auto;">
      <h2 style="color: ${isAllowed ? "#10b981" : "#ef4444"}">
        Hello, ${booking.full_name}!
      </h2>
      <p>Your tour booking status has been updated to: <strong>${status.toUpperCase()}</strong>.</p>
      
      <p>
        ${isAllowed 
          ? "We are excited to welcome you on the tour! Your payment has been verified and your spot is reserved." 
          : "We regret to inform you that your request was not accepted at this time. This could be due to availability or payment issues."
        }
      </p>

      <div style="margin-top: 30px; margin-bottom: 30px;">
        <a href="${isAllowed 
            ? `http://localhost:5173/ticket/${booking._id}` 
            : `mailto:support@hariye.com?subject=Inquiry regarding Booking ${booking._id}`}" 
           style="
            background-color: ${isAllowed ? "#10b981" : "#ef4444"}; 
            color: #ffffff; 
            padding: 12px 25px; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: bold; 
            display: inline-block;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
           ">
          ${isAllowed ? "View Your Digital Ticket" : "Contact Support Team"}
        </a>
      </div>

      <p style="font-size: 13px; color: #666;">
        ${isAllowed 
          ? "Please have your digital ticket ready (either on your phone or printed) at the meeting point." 
          : "If you have already made a payment, please reply to this email with your transaction receipt."
        }
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 14px; line-height: 1.5;">
        Best regards,<br/>
        <strong>Hariye Tour Team</strong><br/>
        <span style="color: #888;">Mogadishu, Somalia</span>
      </p>
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
