import multer from "multer";

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const UploadImage = multer({
  storage: storageImage,
});

export default UploadImage;
