import TourModel from "../Models/TourModel.js";

// REGISTER
export const TourRegsiter = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image" });

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
    const updated = await TourModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );
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
