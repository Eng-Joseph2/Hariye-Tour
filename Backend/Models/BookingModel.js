const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // User Info (Laga soo qaadayo Form-ka ama Login-ka)
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    // Tour Info (Laga soo minguuriyay Tour-ka la doortay)
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour" },
    title: String,
    price: Number,
    image: String,
    location: String,

    // Booking Details
    bookingDate: { type: String, default: new Date().toLocaleDateString() },
    status: {
      type: String,
      enum: ["Upcoming", "Completed", "Cancelled"],
      default: "Upcoming",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
