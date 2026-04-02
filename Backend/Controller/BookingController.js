import BookingModel from "../Models/BookingModel.js";

// A. Function-ka lagu abuurayo Booking cusub (Create)
export const createBooking = async (req, res) => {
  try {
    // Waxaan isla markiiba ka dhex abuureynaa database-ka xogta ka timaada req.body
    const newBooking = new BookingModel(req.body);
    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking-ka waa la diiwaangeliyey si guul ah. ✅",
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cillad ayaa dhacday markii la diiwaangelinayay.",
      error: error.message,
    });
  }
};

// B. Function-ka lagu soo akhrinayo dhamaan Bookings-ka (Read)
export const ReadBooking = async (req, res) => {
  try {
    // Waxaan soo helnaa dhamaan xogta ku jirta BookingModel
    const read = await BookingModel.find().sort({ createdAt: -1 }); // Wuxuu soo horaysiinayaa kuwa cusub

    if (!read || read.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Maba jiraan wax Bookings ah oo hadda diiwaangashan.",
      });
    }

    res.status(200).json({
      success: true,
      data: read,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Cillad ayaa dhacday soo akhrinta xogta.",
      error: error.message,
    });
  }
};
