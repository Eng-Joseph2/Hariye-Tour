import mongoose from "mongoose";

const TourSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
  country: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  desc: { type: String, required: true, minlength: 10 },
  image: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
    max: [100000, 'Price cannot exceed $100,000']
  },
  startDay: { type: Date, required: true },
  endDay: { type: Date, required: true },
  category: {
    type: String,
    enum: {
      values: ["Nature", "Beaches", "Forests", "Farms", "Historical", "Resturents"],
      message: 'Category must be one of: Nature, Beaches, Forests, Farms, Historical, Resturents'
    },
    default: "Nature",
  },
  Duration: {
    type: Number,
    required: true,
    min: [1, 'Duration must be at least 1 day'],
    max: [365, 'Duration cannot exceed 365 days']
  },
  Highlights: { type: String, required: true, minlength: 10 },
  max_Gust: {
    type: Number,
    required: true,
    min: [1, 'Maximum guests must be at least 1'],
    max: [1000, 'Maximum guests cannot exceed 1000']
  },
  Available_Spots: {
    type: Number,
    required: true,
    min: [0, 'Available spots cannot be negative'],
    max: [1000, 'Available spots cannot exceed 1000']
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed", "cancelled"],
    default: "upcoming"
  },
  level: {
    type: String,
    enum: {
      values: ["premier", "new", "standard"],
      message: 'Level must be one of: premier, new, standard'
    },
    default: "standard"
  },
});

// Pre-save middleware for validation
TourSchema.pre('save', async function(next) {
  // Validate max_Gust >= Available_Spots
  if (this.max_Gust < this.Available_Spots) {
    const error = new Error('Maximum guests cannot be less than available spots');
    return error;
  }

  // Validate dates
  if (this.startDay >= this.endDay) {
    const error = new Error('End date must be after start date');
    return error;
  }

  // Validate duration matches date difference
  const durationDays = Math.ceil((this.endDay - this.startDay) / (1000 * 60 * 60 * 24));
  if (this.Duration !== durationDays) {
    // Auto-correct duration if it doesn't match
    this.Duration = durationDays;
  }

  // next();
});

// Pre-update middleware for validation
TourSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();

  // If updating capacity fields, validate them
  if (update.max_Gust !== undefined || update.Available_Spots !== undefined) {
    const doc = await this.model.findOne(this.getQuery());

    const newMaxGust = update.max_Gust !== undefined ? update.max_Gust : doc.max_Gust;
    const newAvailableSpots = update.Available_Spots !== undefined ? update.Available_Spots : doc.Available_Spots;

    if (newMaxGust < newAvailableSpots) {
      const error = new Error('Maximum guests cannot be less than available spots');
      return error;
    }
  }

  // Validate dates if both are being updated
  if (update.startDay && update.endDay) {
    const startDate = new Date(update.startDay);
    const endDate = new Date(update.endDay);

    if (startDate >= endDate) {
      const error = new Error('End date must be after start date');
      return error;
    }
  }

  // next();
});

// Middleware: Auto-update status based on dates
TourSchema.pre("save", async function () {
  const now = new Date();
  if (this.status !== "cancelled") { // Don't override cancelled
    if (this.startDay > now) {
      this.status = "upcoming";
    } else if (this.startDay <= now && now <= this.endDay) {
      this.status = "ongoing";
    } else if (this.endDay < now) {
      this.status = "completed";
    }
  }
});

const TourModel = mongoose.model("Tour", TourSchema);
export default TourModel;
