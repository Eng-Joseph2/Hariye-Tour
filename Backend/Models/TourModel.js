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
  category: {
    type: String,
    enum: ["Nature", "Beaches", "Forests", "Farms", "Historical", "Resturents"],
    default: "Nature",
  },
  Duration: { type: Number, required: true },
  Highlights: { type: String, required: true },
  max_Gust: { type: Number, required: true },
  Available_Spots: { type: Number, required: true },
  status: { type: String, enum: ["Active", "InActive"], default: "Active" },
});

// Middleware: Auto-update status based on numbers
TourSchema.pre("save", async function () {
  if (this.max_Gust < 0) this.max_Gust = 0;
  if (this.Available_Spots < 0) this.Available_Spots = 0;

  this.status =
    this.Available_Spots <= 0 || this.max_Gust <= 0 ? "InActive" : "Active";
});

const TourModel = mongoose.model("Tour", TourSchema);
export default TourModel;
