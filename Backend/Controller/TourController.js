import TourModel from "../Models/TourModel.js";
import BookingModel from "../Models/BookingModel.js";
import User from "../Models/UserModel.js";

// REGISTER
export const TourRegsiter = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image" });

    const {
      title,
      country,
      city,
      desc,
      price,
      startDay,
      endDay,
      category,
      Duration,
      Highlights,
      max_Gust,
      Available_Spots,
      level
    } = req.body;

    // Input validation
    if (!title || !country || !city || !desc || !price || !startDay || !endDay || !Duration || !Highlights || !max_Gust || !Available_Spots) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    // Validate numeric fields
    const numericFields = { price, Duration, max_Gust, Available_Spots };
    for (const [field, value] of Object.entries(numericFields)) {
      if (isNaN(value) || value < 0) {
        return res.status(400).json({
          success: false,
          message: `${field} must be a positive number`
        });
      }
    }

    // Validate max_Gust >= Available_Spots
    if (parseInt(max_Gust) < parseInt(Available_Spots)) {
      return res.status(400).json({
        success: false,
        message: "Maximum guests cannot be less than available spots"
      });
    }

    // Validate dates
    const startDate = new Date(startDay);
    const endDate = new Date(endDay);
    if (startDate >= endDate) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date"
      });
    }

    // Validate category
    const validCategories = ["Nature", "Beaches", "Forests", "Farms", "Historical", "Resturents"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Must be one of: " + validCategories.join(", ")
      });
    }

    // Validate level
    const validLevels = ["premier", "new", "standard"];
    if (!validLevels.includes(level)) {
      return res.status(400).json({
        success: false,
        message: "Invalid level. Must be one of: " + validLevels.join(", ")
      });
    }

    const NewTour = new TourModel({
      ...req.body,
      image: req.file.filename,
    });

    const SaveTour = await NewTour.save();
    res
      .status(201)
      .json({ success: true, message: "Tour created!", data: SaveTour });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// READ ALL
export const ReadAllTour = async (req, res) => {
  try {
    const data = await TourModel.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ SINGLE
export const ReadSingleTour = async (req, res) => {
  try {
    const tour = await TourModel.findById(req.params.id);
    if (!tour)
      return res.status(404).json({ success: false, message: "Not found" });
    res.status(200).json({ success: true, data: tour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// BOOK SPOT (DECREMENT)
export const BookTourSpot = async (req, res) => {
  const tour = await Tour.findById(req.params.id);

  if (!tour) return res.status(404).json({ message: "Not found" });

  if (tour.Available_Spots <= 0) {
    return res.status(400).json({ message: "No spots left" });
  }

  // 🔥 HOOS U DHIG
  tour.Available_Spots -= 1;

  // 🔥 HADDII UU NOQDO 0
  if (tour.Available_Spots <= 0) {
    tour.status = "InActive";
  }

  await tour.save();

  res.json({ data: tour });
};

// UPDATE
export const UpdateTour = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) updateData.image = req.file.filename;

    // If updating capacity-related fields, validate them
    if (updateData.max_Gust !== undefined || updateData.Available_Spots !== undefined) {
      const tour = await TourModel.findById(req.params.id);
      if (!tour) {
        return res.status(404).json({ success: false, message: "Tour not found" });
      }

      const newMaxGust = updateData.max_Gust !== undefined ? parseInt(updateData.max_Gust) : tour.max_Gust;
      const newAvailableSpots = updateData.Available_Spots !== undefined ? parseInt(updateData.Available_Spots) : tour.Available_Spots;

      // Validate numeric fields
      if (updateData.max_Gust !== undefined && (isNaN(updateData.max_Gust) || updateData.max_Gust < 0)) {
        return res.status(400).json({
          success: false,
          message: "max_Gust must be a positive number"
        });
      }

      if (updateData.Available_Spots !== undefined && (isNaN(updateData.Available_Spots) || updateData.Available_Spots < 0)) {
        return res.status(400).json({
          success: false,
          message: "Available_Spots must be a positive number"
        });
      }

      // Validate max_Gust >= Available_Spots
      if (newMaxGust < newAvailableSpots) {
        return res.status(400).json({
          success: false,
          message: "Maximum guests cannot be less than available spots"
        });
      }

      // Check if trying to reduce available spots below current bookings
      if (updateData.Available_Spots !== undefined) {
        const currentBookings = await BookingModel.countDocuments({
          tourId: req.params.id,
          status: { $in: ['pending', 'allowed'] }
        });

        const newCapacity = newAvailableSpots;
        if (newCapacity < currentBookings) {
          return res.status(400).json({
            success: false,
            message: `Cannot reduce available spots below current bookings (${currentBookings})`
          });
        }
      }
    }

    // Validate dates if provided
    if (updateData.startDay && updateData.endDay) {
      const startDate = new Date(updateData.startDay);
      const endDate = new Date(updateData.endDay);
      if (startDate >= endDate) {
        return res.status(400).json({
          success: false,
          message: "End date must be after start date"
        });
      }
    }

    // Validate category if provided
    if (updateData.category) {
      const validCategories = ["Nature", "Beaches", "Forests", "Farms", "Historical", "Resturents"];
      if (!validCategories.includes(updateData.category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category. Must be one of: " + validCategories.join(", ")
        });
      }
    }

    // Validate level if provided
    if (updateData.level) {
      const validLevels = ["premier", "new", "standard"];
      if (!validLevels.includes(updateData.level)) {
        return res.status(400).json({
          success: false,
          message: "Invalid level. Must be one of: " + validLevels.join(", ")
        });
      }
    }

    const updated = await TourModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: 'after' },
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Tour not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE
export const DeleteTour = async (req, res) => {
  try {
    await TourModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET STATS
export const getStats = async (req, res) => {
  try {
    const totalTours = await TourModel.countDocuments();
    const totalBookings = await BookingModel.countDocuments();
    const totalCustomers = await User.countDocuments({ role: "user" });
    const acceptedTours = await BookingModel.countDocuments({ status: "allowed" });

    res.status(200).json({
      success: true,
      data: {
        totalTours,
        totalBookings,
        totalCustomers,
        acceptedTours,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
