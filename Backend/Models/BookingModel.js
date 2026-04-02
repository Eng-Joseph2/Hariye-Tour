import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
});

const BookingModel = mongoose.model("Booking", BookingSchema);

export default BookingModel;
