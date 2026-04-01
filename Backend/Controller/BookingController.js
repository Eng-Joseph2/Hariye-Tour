exports.createBooking = async (req, res) => {
  try {
    // req.body waxaa ku jira (fullName, email, gender, title, price, iwm)
    const newBooking = new Booking(req.body);
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
