import mongoose from "mongoose";

const TourSchema = mongoose.Schema({
  title: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  startDay: { type: Date, required: true },
  endDay: { type: Date, required: true },
  category: { type: String, enum: ["Nature", "isbac"], default: "Nature" },
  Duration: { type: Number, required: true },
  Highlights: { type: String, required: true },
  max_Gust: { type: Number, required: true },
  Available_Spots: { type: Number, required: true },
  status: { type: String, enum: ["Active", "InActive"], default: "Active" },
});

const TourModel = mongoose.model("Tour", TourSchema);
export default TourModel;
