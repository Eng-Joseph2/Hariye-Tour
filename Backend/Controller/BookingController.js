import BookingModel from "../Models/BookingModel.js";

export const createBooking = async (req, res) => {
  try {
    const newBooking = new BookingModel(req.body);
    await newBooking.save();
    res.status(201).json({
      success: true,
      message: "Booking-ka waa la diiwaangeliyey",
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const ReadBooking = async (req, res) => {
  try {
    const read = await BookingModel.find();
    if (!read || read.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found",
      });
    }
    res.status(200).json({
      success: true,
      data: read,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
