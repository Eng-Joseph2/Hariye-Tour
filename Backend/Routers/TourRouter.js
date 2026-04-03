import exporess from "express";
import UploadImage from "../middleware/uplodImage.js";
import {
  BookTourSpot,
  DeleteTour,
  ReadAllTour,
  ReadSingleTour,
  TourRegsiter,
  UpdateTour,
} from "../Controller/TourController.js";

const router = exporess.Router();
router.post("/tourRegister", UploadImage.single("image"), TourRegsiter);
router.get("/readAllTour", ReadAllTour);
router.get("/readSingleTour/:id", ReadSingleTour);
router.put("/updateTour/:id", UploadImage.single("image"), UpdateTour);
router.delete("/deleteTour/:id", DeleteTour);
router.put("/bookTourSpot/:id", BookTourSpot);
export default router;
