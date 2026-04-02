import BookingModel from "../Models/BookingModel.js";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// import dotenv from "dotenv";
// dotenv.config();

const OAuth2 = google.auth.OAuth2;

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; 
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await BookingModel.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" },
    );
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking ma jiro" });

    const { token } = await oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "GELI_GMAIL_KAAGA_HADDADA@gmail.com", // <--- Qor Gmail-kaaga rasmiga ah
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: token,
      },
    });

    const isAllowed = status === "allowed";
    const mailOptions = {
      from: `EastAfricaTour <GELI_GMAIL_KAAGA_HADDADA@gmail.com>`,
      to: booking.email,
      subject: isAllowed ? "Booking Confirmed! ✅" : "Booking Update ❌",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: ${isAllowed ? "#10b981" : "#ef4444"}">Halaaba, ${booking.full_name}!</h2>
          <p>Codsigaaga dalxiiska waxaa laga dhigay: <strong>${status.toUpperCase()}</strong>.</p>
          <p>${isAllowed ? "Waan ku faraxsanahay inaan kugu soo dhoweyno!" : "Waan ka xunnahay, lama aqbalin markan."}</p>
          <br/><p>Mahadsanid,<br/><strong>EastAfricaTour Team</strong></p>
        </div>`,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: `Booking-ka waa la ${status}.` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
